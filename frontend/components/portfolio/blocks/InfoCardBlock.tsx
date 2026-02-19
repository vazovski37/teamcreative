'use client';

import { cn } from "@/lib/utils";
import { MediaDisplay } from "./MediaDisplay";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent } from "@/lib/content-helpers";
import { useLanguage } from "@/lib/language-context";

interface InfoCardBlockProps {
    media: string;
    mediaType: 'video' | 'image';
    title?: string | LocalizedText;
    details?: { label: string | LocalizedText; value: string | LocalizedText }[];
    theme?: 'paper' | 'dark' | 'glass' | 'white';
    align?: 'left' | 'right';
}

export function InfoCardBlock({
    media,
    mediaType,
    title,
    details,
    theme = 'white', // Changed default to white (paper-like)
    align = 'right'
}: InfoCardBlockProps) {
    const { language } = useLanguage();
    const activeTheme = theme === 'paper' ? 'white' : theme;
    const localizedTitle = getLocalizedContent(title, language);

    return (
        <section className="relative w-full py-12 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 relative max-w-7xl">
                <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    <MediaDisplay src={media} type={mediaType} className="w-full h-full" />

                    {/* Overlay Card */}
                    <motion.div
                        initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={cn(
                            "absolute top-8 bottom-8 md:top-12 md:bottom-12 w-[90%] md:w-[400px] lg:w-[450px] p-8 md:p-10 shadow-xl flex flex-col justify-center",
                            align === 'right' ? "right-4 md:right-12" : "left-4 md:left-12",
                            activeTheme === 'white' && "bg-[#F5F2EA] text-neutral-900 rotate-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
                            activeTheme === 'dark' && "bg-neutral-900/90 text-white backdrop-blur-md border border-white/10",
                            activeTheme === 'glass' && "bg-white/10 text-white backdrop-blur-xl border border-white/20"
                        )}
                        style={{
                            borderRadius: activeTheme === 'white' ? '2px' : '24px',
                            // Add a subtle texture specifically for the "paper" theme
                            backgroundImage: activeTheme === 'white' ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")' : undefined
                        }}
                    >
                        {/* Decorative dashed border for paper theme */}
                        {activeTheme === 'white' && (
                            <div className="absolute inset-3 border-2 border-dashed border-neutral-300 pointer-events-none" />
                        )}

                        <div className="relative z-10">
                            {localizedTitle && (
                                <h3 className={cn(
                                    "text-3xl md:text-4xl font-black mb-8 uppercase leading-none font-heading",
                                    activeTheme === 'white' ? "text-red-600" : "text-primary"
                                )}>
                                    {localizedTitle}
                                </h3>
                            )}

                            {details && (
                                <ul className="space-y-4">
                                    {details.map((item, idx) => (
                                        <li key={idx} className="flex flex-col gap-1">
                                            <span className={cn(
                                                "text-xs font-bold uppercase tracking-widest",
                                                activeTheme === 'white' ? "text-neutral-500" : "text-white/60"
                                            )}>
                                                {getLocalizedContent(item.label, language)}
                                            </span>
                                            <span className={cn(
                                                "text-lg font-medium leading-tight",
                                                activeTheme === 'white' ? "text-neutral-900" : "text-white"
                                            )}>
                                                {getLocalizedContent(item.value, language)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
