'use client';

import { cn } from "@/lib/utils";
import { MediaDisplay } from "./MediaDisplay";
import { FramedMediaShell } from "./FramedMediaShell";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent, stripHtmlTags, toRichTextHtml } from "@/lib/content-helpers";
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
                "gap-4 md:gap-6",
                mobileLayout === 'swipe'
                    ? "flex overflow-x-auto snap-x snap-mandatory pb-6 md:grid md:grid-cols-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
                    : "grid grid-cols-1 md:grid-cols-3"
            )}>
                {items.map((item, idx) => {
                    const caption = getLocalizedContent(item.caption, language);

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className={cn(
                                "group relative aspect-[9/16]",
                                mobileLayout === 'swipe' ? "min-w-[85vw] snap-center md:min-w-0" : ""
                            )}
                        >
                            <FramedMediaShell>
                                <div className="relative h-full">
                                    <MediaDisplay
                                        src={item.media}
                                        type={item.mediaType}
                                        className="w-full h-full group-hover:scale-[1.02] transition-transform duration-700"
                                        caption={stripHtmlTags(caption)}
                                        alt={stripHtmlTags(caption)}
                                    />

                                    {item.caption && (
                                        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
                                            <p
                                                className="text-white font-bold text-base leading-tight uppercase font-heading"
                                                dangerouslySetInnerHTML={{ __html: toRichTextHtml(caption) }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </FramedMediaShell>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
