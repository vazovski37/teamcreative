'use client';

import { cn } from "@/lib/utils";
import { MediaDisplay } from "./MediaDisplay";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent } from "@/lib/content-helpers";
import { useLanguage } from "@/lib/language-context";

interface ReelGridBlockProps {
    mobileLayout?: 'swipe' | 'column'; // New optional prop
    items: {
        media: string;
        mediaType: 'video' | 'image';
        caption?: string | LocalizedText;
    }[];
}

export function ReelGridBlock({ items, mobileLayout = 'column' }: ReelGridBlockProps) {
    const { language } = useLanguage();

    return (
        <section className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
            <div className={cn(
                "gap-6 md:gap-10",
                mobileLayout === 'swipe'
                    ? "flex overflow-x-auto snap-x snap-mandatory pb-6 md:grid md:grid-cols-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
                    : "grid grid-cols-1 md:grid-cols-3"
            )}>
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        className={cn(
                            "relative aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-900 border-[8px] border-neutral-900 shadow-2xl",
                            mobileLayout === 'swipe' ? "min-w-[85vw] snap-center md:min-w-0" : ""
                        )}
                    >
                        {/* Phone-like Frame Border Effect (Optional) */}
                        <div className="absolute inset-0 pointer-events-none z-20 rounded-xl border border-white/10" />

                        <MediaDisplay
                            src={item.media}
                            type={item.mediaType}
                            className="w-full h-full scale-[1.01]" // Slight scale to avoid pixel gaps
                            caption={getLocalizedContent(item.caption, language)}
                            alt={getLocalizedContent(item.caption, language)}
                        />

                        {item.caption && (
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
                                <p className="text-white font-bold text-lg leading-tight uppercase font-heading">
                                    {getLocalizedContent(item.caption, language)}
                                </p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
