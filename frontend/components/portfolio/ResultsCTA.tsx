'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function ResultsCTA() {
    const { language } = useLanguage();

    const text = language === 'ge' ? 'შედეგები ციფრებში' : 'RESULTS IN NUMBERS';

    return (
        <section className="w-full py-12 md:py-24 flex justify-center bg-black">
            <Link href="/contact" className="group">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative bg-white text-black px-12 py-4 md:px-16 md:py-6 rounded-full border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-shadow duration-300"
                >
                    <span className="text-xl md:text-3xl font-black uppercase tracking-widest font-heading font-[family-name:var(--font-ms-block)]">
                        {text}
                    </span>
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-500/20 transition-colors" />
                </motion.div>
            </Link>
        </section>
    );
}
