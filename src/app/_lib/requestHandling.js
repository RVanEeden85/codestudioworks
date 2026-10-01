const MAX_JSON_BYTES = 32 * 1024;

export class RequestBodyError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export async function readJsonBody(request, maxBytes = MAX_JSON_BYTES) {
    const contentType = request.headers.get("content-type") || "";
    if (!/^application\/json(?:\s*;|\s*$)/i.test(contentType)) {
        throw new RequestBodyError(415, "Content-Type must be application/json");
    }

    if (!request.body) throw new RequestBodyError(400, "Request body is required");
    const reader = request.body.getReader();
    const chunks = [];
    let total = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            total += value.byteLength;
            if (total > maxBytes) throw new RequestBodyError(413, "Request body is too large");
            chunks.push(value);
        }
    } finally {
        reader.releaseLock();
    }

    let text;
    try {
        text = new TextDecoder("utf-8", { fatal: true }).decode(
            (() => { const bytes = new Uint8Array(total); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; } return bytes; })()
        );
    } catch { throw new RequestBodyError(400, "Request body must be valid UTF-8 JSON"); }

    let body;
    try { body = JSON.parse(text); } catch { throw new RequestBodyError(400, "Request body must be valid JSON"); }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw new RequestBodyError(400, "Request body must be a JSON object");
    }
    return body;
}

export async function notifyPersistedSubmission(submission, { sendEmails, updateEmailStatus }) {
    let delivery;
    try {
        delivery = await sendEmails(submission);
    } catch (error) {
        console.error("Persisted enquiry email notification failed:", error?.message || error);
        return { status: "pending", delivery: undefined };
    }
    try {
        await updateEmailStatus(submission._id, delivery.status, delivery);
    } catch (error) {
        console.error("Persisted enquiry email status update failed:", error?.message || error);
    }
    return { status: delivery.status, delivery };
}
