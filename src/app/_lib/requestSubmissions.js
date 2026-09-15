import { ObjectId } from "mongodb";
import { getDb, isMongoConfigured } from "./mongodb";

const COLLECTION_NAME = "request_submissions";

export function isRequestStorageConfigured() {
    return isMongoConfigured();
}

export async function createRequestSubmission(payload) {
    const db = await getDb();
    const now = new Date();
    const collection = db.collection(COLLECTION_NAME);

    await collection.createIndex(
        { submissionId: 1 },
        { unique: true, sparse: true }
    );

    const document = {
        ...payload,
        status: payload.status || "new",
        createdAt: now,
        updatedAt: now,
    };

    try {
        const result = await collection.insertOne(document);

        return {
            ...document,
            _id: result.insertedId,
            created: true,
        };
    } catch (error) {
        if (error?.code !== 11000 || !payload.submissionId) throw error;

        const existing = await collection.findOne({ submissionId: payload.submissionId });
        return { ...existing, created: false };
    }
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

export async function getRequestSubmissionById(id) {
    const db = await getDb();
    const objectId = id instanceof ObjectId ? id : new ObjectId(id);
    return db.collection(COLLECTION_NAME).findOne({ _id: objectId });
}

export async function updateRequestSubmissionEmailStatus(id, emailStatus, emailDelivery) {
    const db = await getDb();
    const objectId = id instanceof ObjectId ? id : new ObjectId(id);

    await db.collection(COLLECTION_NAME).updateOne(
        { _id: objectId },
        {
            $set: {
                emailStatus,
                ...(emailDelivery ? { emailDelivery } : {}),
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
        clientOrProject: submission.clientOrProject || "",
        urgency: submission.urgency || "",
        affectedUrl: submission.affectedUrl || "",
        emailStatus: submission.emailStatus || "not_sent",
        emailDelivery: submission.emailDelivery || null,
        createdAt: submission.createdAt?.toISOString?.() || "",
    };
}
