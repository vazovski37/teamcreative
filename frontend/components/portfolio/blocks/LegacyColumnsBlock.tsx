'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent } from "@/lib/content-helpers";
import { useLanguage } from "@/lib/language-context";

interface ColumnContent {
    title: string | LocalizedText;
    text: string | LocalizedText;
    label?: string | LocalizedText;
}

interface LegacyColumnsBlockProps {
    left: ColumnContent;
    right: ColumnContent;
}

export function LegacyColumnsBlock({ left, right }: LegacyColumnsBlockProps) {
    const { language } = useLanguage();

    const renderColumn = (content: ColumnContent, colorClass: string, delay: number) => {
        const localizedTitle = getLocalizedContent(content.title, language);
        const localizedText = getLocalizedContent(content.text, language);
        const localizedLabel = getLocalizedContent(content.label, language);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.6 }}
                className="space-y-6"
            >
                {localizedLabel && (
                    <div className="flex items-center gap-4 mb-8">
                        {/* For the right column, we might want the label on the left or mirrored, but legacy was consistent */}
                        <span className={cn("text-sm font-bold uppercase tracking-widest text-gray-400")}>
                            {localizedLabel}
                        </span>
                        <span className="h-px flex-1 bg-white/20"></span>
                    </div>
                )}

                <div className={cn("relative pl-8 border-l-2", colorClass)}>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        {localizedTitle}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">
                        {localizedText}
                    </p>
                </div>
            </motion.div>
        );
    };

    return (
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                {renderColumn(left, "border-blue-500/50", 0)}
                {renderColumn(right, "border-purple-500/50", 0.2)}
            </div>
        </section>
    );
}
