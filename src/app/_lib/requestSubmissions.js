import { ObjectId } from "mongodb";
import { getDb, isMongoConfigured } from "./mongodb";

const COLLECTION_NAME = "request_submissions";

export function isRequestStorageConfigured() {
    return isMongoConfigured();
}

export async function createRequestSubmission(payload) {
    const db = await getDb();
    const now = new Date();

    const document = {
        ...payload,
        status: payload.status || "new",
        createdAt: now,
        updatedAt: now,
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(document);

    return {
        ...document,
        _id: result.insertedId,
    };
}

export async function listRequestSubmissions({ limit = 50 } = {}) {
    const db = await getDb();

    return db
        .collection(COLLECTION_NAME)
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();
}

export async function updateRequestSubmissionEmailStatus(id, emailStatus) {
    const db = await getDb();
    const objectId = id instanceof ObjectId ? id : new ObjectId(id);

    await db.collection(COLLECTION_NAME).updateOne(
        { _id: objectId },
        {
            $set: {
                emailStatus,
                updatedAt: new Date(),
            },
        }
    );
}

export function serializeRequestSubmission(submission) {
    return {
        id:
            submission._id instanceof ObjectId
                ? submission._id.toString()
                : String(submission._id),
        type: submission.type || "request",
        source: submission.source || "",
        status: submission.status || "new",
        name: submission.name || "",
        email: submission.email || "",
        phone: submission.phone || submission.tel || "",
        message: submission.message || "",
        projectType: submission.projectType || "",
        preferredDay: submission.preferredDay || "",
        preferredTime: submission.preferredTime || "",
        timeZone: submission.timeZone || "",
        estimate: submission.estimate || "",
        emailStatus: submission.emailStatus || "not_sent",
        createdAt: submission.createdAt?.toISOString?.() || "",
    };
}
