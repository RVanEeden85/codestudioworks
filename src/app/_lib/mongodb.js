import { MongoClient } from "mongodb";

export function isMongoConfigured() {
    return Boolean(process.env.MONGODB_URI);
}

export async function getDb() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI is not configured");
    }

    if (!globalThis.__cswMongoClientPromise) {
        const client = new MongoClient(uri);
        globalThis.__cswMongoClientPromise = client.connect().catch((error) => {
            globalThis.__cswMongoClientPromise = null;
            throw error;
        });
    }

    const clientPromise = globalThis.__cswMongoClientPromise;
    const connectedClient = await clientPromise;
    return connectedClient.db(process.env.MONGODB_DB || "codestudioworks");
}
