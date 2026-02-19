'use client';

import { cn } from "@/lib/utils";
import { MediaDisplay } from "./MediaDisplay";
import { motion } from "framer-motion";

interface MediaGridBlockProps {
    items: {
        media: string;
        mediaType: 'video' | 'image';
        size?: 'sq' | 'wide';
    }[];
}

export function MediaGridBlock({ items }: MediaGridBlockProps) {
    return (
        <section className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className={cn(
                            "relative rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-lg",
                            item.size === 'wide' ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                        )}
                    >
                        <MediaDisplay
                            src={item.media}
                            type={item.mediaType}
                            className="w-full h-full hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
