import test from "node:test";
import assert from "node:assert/strict";
import { notifyPersistedSubmission, readJsonBody, RequestBodyError } from "../src/app/_lib/requestHandling.js";

function requestFromChunks(chunks, headers = { "content-type": "application/json" }) {
    const stream = new ReadableStream({
        start(controller) { for (const chunk of chunks) controller.enqueue(chunk); controller.close(); },
    });
    return new Request("https://example.test/api/contact", { method: "POST", headers, body: stream, duplex: "half" });
}

async function bodyError(request) {
    try { await readJsonBody(request); assert.fail("expected request body error"); }
    catch (error) { assert.ok(error instanceof RequestBodyError); return error; }
}

test("reads valid JSON from streamed UTF-8 bytes, including multibyte content", async () => {
    const bytes = new TextEncoder().encode(JSON.stringify({ message: "Zażółć gęślą jaźń" }));
    assert.deepEqual(await readJsonBody(requestFromChunks([bytes.slice(0, 4), bytes.slice(4)])), { message: "Zażółć gęślą jaźń" });
});

test("enforces byte limit despite absent or lying content length", async () => {
    const oversized = new Uint8Array(32 * 1024 + 1);
    assert.equal((await bodyError(requestFromChunks([oversized]))).status, 413);
    assert.equal((await bodyError(requestFromChunks([oversized], { "content-type": "application/json", "content-length": "1" }))).status, 413);
});

test("rejects unsupported content type, malformed JSON, and non-object JSON", async () => {
    assert.equal((await bodyError(requestFromChunks([new TextEncoder().encode("{}")], { "content-type": "text/plain" }))).status, 415);
    assert.equal((await bodyError(requestFromChunks([new TextEncoder().encode("{")]))).status, 400);
    assert.equal((await bodyError(requestFromChunks([new TextEncoder().encode("[]")]))).status, 400);
    assert.equal((await bodyError(requestFromChunks([new TextEncoder().encode("null")]))).status, 400);
});

test("persisted notification failures stay retryable and do not throw", async () => {
    const errors = [];
    const oldError = console.error;
    console.error = (...args) => errors.push(args);
    try {
        const result = await notifyPersistedSubmission({ _id: "id" }, {
            sendEmails: async () => { throw new Error("postmark unavailable"); },
            updateEmailStatus: async () => { throw new Error("should not run"); },
        });
        assert.equal(result.status, "pending");
        assert.equal(errors.length, 1);
    } finally { console.error = oldError; }
});

test("email status update failure preserves delivery result", async () => {
    const result = await notifyPersistedSubmission({ _id: "id" }, {
        sendEmails: async () => ({ status: "sent", owner: { status: "sent" } }),
        updateEmailStatus: async () => { throw new Error("database unavailable"); },
    });
    assert.equal(result.status, "sent");
    assert.equal(result.delivery.owner.status, "sent");
});
