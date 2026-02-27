import { LocalizedText } from "@/lib/content-helpers";

export type ContentBlock =
    | { type: 'hero'; media?: string; mediaType?: 'video' | 'image'; title?: string | LocalizedText; subtitle?: string | LocalizedText; badge?: string | LocalizedText; align?: 'left' | 'center' }
    | { type: 'text-highlight'; text: string | LocalizedText; label?: string | LocalizedText; align?: 'left' | 'center' }
    | { type: 'info-card'; media: string; mediaType: 'video' | 'image'; title?: string | LocalizedText; details?: { label: string | LocalizedText; value: string | LocalizedText }[]; theme?: 'paper' | 'dark' | 'glass'; align?: 'left' | 'right' }
    | { type: 'reel-grid'; mobileLayout?: 'swipe' | 'column'; items: { media: string; mediaType: 'video' | 'image'; caption?: string | LocalizedText }[] }
    | { type: 'media-grid'; items: { media: string; mediaType: 'video' | 'image'; size?: 'sq' | 'wide' }[] }
    | { type: 'vertical-showcase'; media: string; mediaType: 'video' | 'image'; overlayText?: string | LocalizedText; title?: string | LocalizedText }
    | { type: 'results'; title: string | LocalizedText; description: string | LocalizedText; stats: { label: string | LocalizedText; value: string | LocalizedText }[] }
    | {
        type: 'legacy-columns';
        left: { title: string | LocalizedText; text: string | LocalizedText; label?: string | LocalizedText };
        right: { title: string | LocalizedText; text: string | LocalizedText; label?: string | LocalizedText };
    }
    | { type: 'bento-grid'; items: { media: string; mediaType: 'video' | 'image'; caption?: string | LocalizedText; span?: 'small' | 'large' }[] };

export interface Project {
    id: string;
    slug: string;
    category: string;
    categorySlug: string;
    client: string;
    title: string;
    description: string;
    strategy?: string; // Made optional
    execution?: string;
    results?: string; // Made optional
    resultNumbers?: Array<{ label: string; value: string }>;
    images?: string[];
    coverImage?: string;
    content?: ContentBlock[]; // New flexible content array
    meta?: {
        metaTitle?: string;
        metaDescription?: string;
        ogImage?: string;
        keywords?: string;
    };
}
