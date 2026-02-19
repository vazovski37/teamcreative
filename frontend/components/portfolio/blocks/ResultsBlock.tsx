'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LocalizedText, getLocalizedContent } from "@/lib/content-helpers";
import { useLanguage } from "@/lib/language-context";

interface ResultsBlockProps {
    title: string | LocalizedText;
    description: string | LocalizedText;
    stats: { label: string | LocalizedText; value: string | LocalizedText }[];
}

export function ResultsBlock({ title, description, stats }: ResultsBlockProps) {
    const { language } = useLanguage();
    const localizedTitle = getLocalizedContent(title, language);
    const localizedDesc = getLocalizedContent(description, language);

    return (
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h4 className="text-primary font-bold uppercase tracking-widest mb-4 text-sm">Impact & Numbers</h4>
                        <h3 className="text-4xl md:text-5xl font-bold mb-8 font-heading uppercase text-white">
                            {localizedTitle}
                        </h3>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            {localizedDesc}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-black/30 p-8 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors">
                                <div className="text-4xl lg:text-5xl font-black text-white mb-2">{getLocalizedContent(stat.value, language)}</div>
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{getLocalizedContent(stat.label, language)}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
