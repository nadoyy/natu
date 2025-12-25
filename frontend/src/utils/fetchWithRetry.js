/**
 * Generic fetch helper with retry & exponential backoff
 * - Domain agnostic
 * - Tidak tahu React / API spesifik
 * - Aman dipakai di semua service
 */

export async function fetchWithRetry(
    url,
    options = {},
    {
        retries = 3,
        retryDelay = 1000,
        retryOn = [408, 429, 500, 502, 503, 504],
    } = {}
) {
    try {
        const res = await fetch(url, options);

        if (!res.ok && retryOn.includes(res.status)) {
            throw new Error(`Retryable error: ${res.status}`);
        }

        return res;
    } catch (err) {
        if (retries <= 0) {
            throw err;
        }

        await delay(retryDelay);

        return fetchWithRetry(url, options, {
            retries: retries - 1,
            retryDelay: retryDelay * 2, // exponential backoff
            retryOn,
        });
    }
}

/**
 * Internal helper (still utils)
 */
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
