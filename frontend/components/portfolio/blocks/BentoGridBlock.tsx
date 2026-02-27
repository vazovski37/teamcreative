'use client';

import { cn } from "@/lib/utils";
import { MediaDisplay } from "./MediaDisplay";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent } from "@/lib/content-helpers";
import { useLanguage } from "@/lib/language-context";

interface BentoGridBlockProps {
    items: {
        media: string;
        mediaType: 'video' | 'image';
        caption?: string | LocalizedText;
        span?: 'small' | 'large'; // 'large' spans 2 rows
    }[];
}

export function BentoGridBlock({ items }: BentoGridBlockProps) {
    const { language } = useLanguage();

    // Separate items: large ones take the right column, small ones stack on the left
    const largeItem = items.find(i => i.span === 'large');
    const smallItems = items.filter(i => i.span !== 'large');

    return (
        <section className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-auto"
                style={{ gridTemplateRows: 'auto' }}
            >
                {/* Left column: stacked small items */}
                <div className="flex flex-col gap-4 md:gap-6">
                    {smallItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl"
                        >
                            <MediaDisplay
                                src={item.media}
                                type={item.mediaType}
                                className="w-full h-full hover:scale-105 transition-transform duration-700"
                                caption={getLocalizedContent(item.caption, language)}
                                alt={getLocalizedContent(item.caption, language) || "Bento media"}
                            />
                            {item.caption && (
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10">
                                    <p className="text-white text-sm font-bold uppercase tracking-wide font-heading">
                                        {getLocalizedContent(item.caption, language)}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Right column: single large item spanning full height */}
                {largeItem && (
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl h-full min-h-[300px]"
                    >
                        <MediaDisplay
                            src={largeItem.media}
                            type={largeItem.mediaType}
                            className="w-full h-full hover:scale-105 transition-transform duration-700"
                            caption={getLocalizedContent(largeItem.caption, language)}
                            alt={getLocalizedContent(largeItem.caption, language) || "Bento feature media"}
                        />
                        {largeItem.caption && (
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent z-10">
                                <p className="text-white text-lg font-bold uppercase tracking-wide font-heading">
                                    {getLocalizedContent(largeItem.caption, language)}
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
