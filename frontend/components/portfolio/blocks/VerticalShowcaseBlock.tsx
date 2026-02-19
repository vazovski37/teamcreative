'use client';

import { cn } from "@/lib/utils";
import { MediaDisplay } from "./MediaDisplay";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent } from "@/lib/content-helpers";
import { useLanguage } from "@/lib/language-context";

interface VerticalShowcaseBlockProps {
    media: string;
    mediaType: 'video' | 'image';
    overlayText?: string | LocalizedText;
    title?: string | LocalizedText;
}

export function VerticalShowcaseBlock({ media, mediaType, overlayText, title }: VerticalShowcaseBlockProps) {
    const { language } = useLanguage();
    const localizedOverlay = getLocalizedContent(overlayText, language);
    const localizedTitle = getLocalizedContent(title, language);

    return (
        <section className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
            <div className="flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-md md:max-w-lg aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <MediaDisplay
                        src={media}
                        type={mediaType}
                        className="w-full h-full"
                        caption={localizedTitle}
                        alt={localizedTitle || "Showcase Media"}
                    />

                    {/* Overlay Gradient & Text */}
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="absolute bottom-10 left-8 right-8 text-center">
                        {localizedTitle && (
                            <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4 font-heading drop-shadow-lg">
                                {localizedTitle}
                            </h3>
                        )}
                        {localizedOverlay && (
                            <p className="text-white/90 text-sm font-medium tracking-wide leading-relaxed">
                                {localizedOverlay}
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
