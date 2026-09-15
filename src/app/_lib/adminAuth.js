import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "csw_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export function isAdminAuthConfigured() {
    return Boolean(process.env.ADMIN_PASSWORD && getAdminSecret());
}

export function getAdminSecret() {
    return process.env.ADMIN_SESSION_SECRET;
}

export function createAdminSessionValue() {
    const secret = getAdminSecret();

    if (!secret) {
        return "";
    }

    const issuedAt = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomBytes(18).toString("base64url");
    const payload = `${issuedAt}.${nonce}`;
    const signature = crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("base64url");

    return `${payload}.${signature}`;
}

export function isValidAdminPassword(password) {
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword || typeof password !== "string") return false;

    const providedHash = crypto.createHash("sha256").update(password).digest();
    const expectedHash = crypto
        .createHash("sha256")
        .update(expectedPassword)
        .digest();

    return crypto.timingSafeEqual(providedHash, expectedHash);
}

export function isValidAdminSession(sessionValue) {
    const secret = getAdminSecret();
    const [issuedAtValue, nonce, signature] = String(sessionValue ?? "").split(".");
    const issuedAt = Number(issuedAtValue);

    if (!secret || !issuedAt || !nonce || !signature) {
        return false;
    }

    const now = Math.floor(Date.now() / 1000);
    if (issuedAt > now + 60 || now - issuedAt > ADMIN_SESSION_MAX_AGE_SECONDS) {
        return false;
    }

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${issuedAtValue}.${nonce}`)
        .digest("base64url");

    if (signature.length !== expectedSignature.length) return false;

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
}
