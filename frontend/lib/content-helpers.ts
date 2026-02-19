
export type LocalizedText = {
    en: string;
    ge: string;
};

export function getLocalizedContent(content: string | LocalizedText | undefined, lang: 'en' | 'ge'): string {
    if (!content) return "";
    if (typeof content === 'string') return content;
    return content[lang] || content['en']; // Fallback to EN
}
