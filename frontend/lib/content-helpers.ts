
export type LocalizedText = {
    en: string;
    ge: string;
};

export function getLocalizedContent(content: string | LocalizedText | undefined, lang: 'en' | 'ge'): string {
    if (!content) return "";
    if (typeof content === 'string') return content;
    return content[lang] || content['en']; // Fallback to EN
}

const SCRIPT_TAG_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const STYLE_TAG_REGEX = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi;
const EVENT_HANDLER_ATTR_REGEX = /\son\w+=(["']).*?\1/gi;
const JS_PROTOCOL_REGEX = /javascript:/gi;
const HTML_TAG_REGEX = /<\/?[a-z][\s\S]*>/i;

export function sanitizeRichTextHtml(html: string | undefined): string {
    if (!html) return "";

    return html
        .replace(SCRIPT_TAG_REGEX, "")
        .replace(STYLE_TAG_REGEX, "")
        .replace(EVENT_HANDLER_ATTR_REGEX, "")
        .replace(JS_PROTOCOL_REGEX, "");
}

export function escapeHtml(text: string | undefined): string {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function toRichTextHtml(content: string | undefined): string {
    if (!content) return "";

    if (HTML_TAG_REGEX.test(content)) {
        return sanitizeRichTextHtml(content);
    }

    return escapeHtml(content).replace(/\n/g, "<br />");
}

export function stripHtmlTags(content: string | undefined): string {
    if (!content) return "";
    return sanitizeRichTextHtml(content)
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
