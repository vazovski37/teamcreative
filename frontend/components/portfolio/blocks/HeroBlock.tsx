'use client';

import { cn } from "@/lib/utils";
import { MediaDisplay } from "./MediaDisplay";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent } from "@/lib/content-helpers";
import { useLanguage } from "@/lib/language-context";

interface HeroBlockProps {
    media?: string;
    mediaType?: 'video' | 'image';
    title?: string | LocalizedText;
    subtitle?: string | LocalizedText;
    badge?: string | LocalizedText;
    align?: 'left' | 'center';
}

export function HeroBlock({ media, mediaType, title, subtitle, badge, align = 'center' }: HeroBlockProps) {
    const { language } = useLanguage();
    const localizedTitle = getLocalizedContent(title, language);
    const localizedSubtitle = getLocalizedContent(subtitle, language);
    const localizedBadge = getLocalizedContent(badge, language);

    return (
        <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-neutral-900/50">
            {/* Background Media */}
            {media && mediaType && (
                <div className="absolute inset-0 z-0 select-none">
                    <MediaDisplay
                        src={media}
                        type={mediaType}
                        className="opacity-70"
                        caption={localizedTitle}
                        alt={localizedTitle || "Hero Media"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className={cn(
                "relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col justify-center",
                align === 'center' ? "items-center text-center" : "items-start text-left"
            )}>
                {/* Badge (Pill) */}
                {localizedBadge && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <span className="inline-block px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-sm md:text-base font-bold uppercase tracking-widest shadow-lg">
                            {localizedBadge}
                        </span>
                    </motion.div>
                )}

                {localizedSubtitle && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-primary tracking-wider uppercase text-sm md:text-base font-bold mb-4"
                    >
                        {localizedSubtitle}
                    </motion.h2>
                )}
                {localizedTitle && (
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-8 drop-shadow-2xl font-heading text-white"
                    >
                        {localizedTitle}
                    </motion.h1>
                )}
            </div>
        </section>
    );
}
