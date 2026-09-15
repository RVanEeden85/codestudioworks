import crypto from "crypto";
import { getDb } from "./mongodb";

const COLLECTION_NAME = "form_rate_limits";
let indexesReady = false;

function hashRequestKey(value) {
    const configuredSecret =
        process.env.FORM_SECURITY_SECRET || process.env.ADMIN_SESSION_SECRET;
    if (process.env.NODE_ENV === "production" && !configuredSecret) {
        throw new Error("FORM_SECURITY_SECRET is not configured");
    }
    const secret = configuredSecret || "codestudioworks-development-only";

    return crypto.createHmac("sha256", secret).update(String(value || "unknown")).digest("hex");
}

async function ensureIndexes(collection) {
    if (indexesReady) return;
    await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    indexesReady = true;
}

export async function consumeDurableRateLimit(scope, key, { limit, windowMs }) {
    const db = await getDb();
    const collection = db.collection(COLLECTION_NAME);
    await ensureIndexes(collection);

    const now = Date.now();
    const bucketStart = Math.floor(now / windowMs) * windowMs;
    const resetAt = bucketStart + windowMs;
    const id = `${scope}:${hashRequestKey(key)}:${bucketStart}`;
    const result = await collection.findOneAndUpdate(
        { _id: id },
        {
            $inc: { count: 1 },
            $setOnInsert: {
                scope,
                createdAt: new Date(now),
                expiresAt: new Date(resetAt + windowMs),
            },
        },
        { upsert: true, returnDocument: "after" }
    );
    const count = result?.count ?? 1;

    return {
        allowed: count <= limit,
        retryAfter: count <= limit ? 0 : Math.max(1, Math.ceil((resetAt - now) / 1000)),
    };
}
