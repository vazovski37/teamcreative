'use client';

import { cn } from "@/lib/utils";
import { MediaDisplay } from "./MediaDisplay";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent } from "@/lib/content-helpers";
import { useLanguage } from "@/lib/language-context";

interface HeroBlockProps {
    media: string;
    mediaType: 'video' | 'image';
    title?: string | LocalizedText;
    subtitle?: string | LocalizedText;
    align?: 'left' | 'center';
}

export function HeroBlock({ media, mediaType, title, subtitle, align = 'center' }: HeroBlockProps) {
    const { language } = useLanguage();
    const localizedTitle = getLocalizedContent(title, language);
    const localizedSubtitle = getLocalizedContent(subtitle, language);

    return (
        <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Media */}
            <div className="absolute inset-0 z-0 select-none">
                <MediaDisplay
                    src={media}
                    type={mediaType}
                    className="opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className={cn(
                "relative z-10 max-w-7xl mx-auto px-6 w-full",
                align === 'center' ? "text-center" : "text-left"
            )}>
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
