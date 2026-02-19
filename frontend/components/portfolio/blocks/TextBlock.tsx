'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent } from "@/lib/content-helpers";
import { useLanguage } from "@/lib/language-context";

interface TextBlockProps {
    text: string | LocalizedText;
    label?: string | LocalizedText;
    align?: 'left' | 'center';
}

export function TextBlock({ text, label, align = 'center' }: TextBlockProps) {
    const { language } = useLanguage();
    const localizedText = getLocalizedContent(text, language);
    const localizedLabel = getLocalizedContent(label, language);

    return (
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={cn(
                    "flex flex-col gap-6",
                    align === 'center' ? "text-center items-center" : "text-left items-start"
                )}
            >
                {localizedLabel && (
                    <div className="flex items-center gap-4 w-full justify-center">
                        <span className="h-px w-12 bg-white/20"></span>
                        <span className="text-sm font-bold uppercase tracking-widest text-primary/80">{localizedLabel}</span>
                        <span className="h-px w-12 bg-white/20"></span>
                    </div>
                )}

                <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light">
                    {localizedText}
                </p>
            </motion.div>
        </section>
    );
}
