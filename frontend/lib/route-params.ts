export function decodeRouteParam(value: string) {
    if (!value) return value;

    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

export function buildRevalidateUrl(path: string) {
    return `/api/revalidate?${new URLSearchParams({ path }).toString()}`;
}

export function normalizeProjectSlug(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\p{L}\p{N}-]+/gu, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
