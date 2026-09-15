const rateLimitStore = globalThis.__cswRateLimitStore ?? new Map();

if (process.env.NODE_ENV !== "production") {
    globalThis.__cswRateLimitStore = rateLimitStore;
}

export function cleanText(value, maxLength = 500, { multiline = false } = {}) {
    const text = String(value ?? "")
        .replace(/\0/g, "")
        .replace(/\r\n/g, "\n")
        .trim()
        .slice(0, maxLength);

    return multiline ? text : text.replace(/[\r\n]+/g, " ");
}

export function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? ""));
}

export function getRequestIp(request) {
    const forwarded = request.headers.get("x-forwarded-for");
    return forwarded?.split(",")[0]?.trim() || "unknown";
}

export function isSameOriginRequest(request) {
    const origin = request.headers.get("origin");
    if (!origin) return true;

    try {
        const originUrl = new URL(origin);
        const requestUrl = new URL(request.url);
        const forwardedHost = request.headers.get("x-forwarded-host");
        const allowedHosts = new Set(
            [requestUrl.host, forwardedHost]
                .filter(Boolean)
                .map((host) => String(host).toLowerCase())
        );

        return allowedHosts.has(originUrl.host.toLowerCase());
    } catch {
        return false;
    }
}

export function consumeRateLimit(scope, key, { limit, windowMs }) {
    const now = Date.now();
    const storeKey = `${scope}:${key}`;
    const current = rateLimitStore.get(storeKey);

    if (!current || current.resetAt <= now) {
        rateLimitStore.set(storeKey, { count: 1, resetAt: now + windowMs });
        return { allowed: true, retryAfter: 0 };
    }

    current.count += 1;

    if (current.count > limit) {
        return {
            allowed: false,
            retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
        };
    }

    return { allowed: true, retryAfter: 0 };
}
