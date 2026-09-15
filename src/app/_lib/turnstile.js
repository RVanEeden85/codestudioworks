const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const DEVELOPMENT_TEST_SECRET = "1x0000000000000000000000000000000AA";
const DEVELOPMENT_TEST_TOKEN = "XXXX.DUMMY.TOKEN.XXXX";

function allowedHostnames() {
    return new Set(
        (process.env.TURNSTILE_ALLOWED_HOSTNAMES ||
            "codestudioworks.com,www.codestudioworks.com")
            .split(",")
            .map((hostname) => hostname.trim().toLowerCase())
            .filter(Boolean)
    );
}

export async function verifyTurnstileToken({ token, remoteIp, expectedAction }) {
    if (
        process.env.NODE_ENV !== "production" &&
        !process.env.TURNSTILE_SECRET_KEY &&
        token === DEVELOPMENT_TEST_TOKEN
    ) {
        return { success: true };
    }

    const secret =
        process.env.TURNSTILE_SECRET_KEY ||
        (process.env.NODE_ENV !== "production" ? DEVELOPMENT_TEST_SECRET : "");

    if (!secret || !token) {
        return { success: false, errorCodes: [!secret ? "missing-secret" : "missing-token"] };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
        const formData = new FormData();
        formData.set("secret", secret);
        formData.set("response", String(token));
        if (remoteIp && remoteIp !== "unknown") formData.set("remoteip", remoteIp);

        const response = await fetch(VERIFY_URL, {
            method: "POST",
            body: formData,
            signal: controller.signal,
            cache: "no-store",
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
            return {
                success: false,
                errorCodes: result["error-codes"] || ["verification-failed"],
            };
        }

        if (process.env.NODE_ENV === "production") {
            if (expectedAction && result.action !== expectedAction) {
                return { success: false, errorCodes: ["action-mismatch"] };
            }

            if (!result.hostname || !allowedHostnames().has(result.hostname.toLowerCase())) {
                return { success: false, errorCodes: ["hostname-mismatch"] };
            }
        }

        return { success: true };
    } catch (error) {
        return {
            success: false,
            errorCodes: [error?.name === "AbortError" ? "verification-timeout" : "verification-error"],
        };
    } finally {
        clearTimeout(timeout);
    }
}
