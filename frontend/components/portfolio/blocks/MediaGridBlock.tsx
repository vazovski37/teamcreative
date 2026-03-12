'use client';

import { cn } from "@/lib/utils";
import { MediaDisplay } from "./MediaDisplay";
import { FramedMediaShell } from "./FramedMediaShell";
import { motion } from "framer-motion";

interface MediaGridBlockProps {
    layout?: 'grid' | 'feature-right' | 'triptych' | 'banner';
    items: {
        media: string;
        mediaType: 'video' | 'image';
        size?: 'sq' | 'wide';
    }[];
}

export function MediaGridBlock({ items, layout = 'grid' }: MediaGridBlockProps) {
    const renderCard = (item: MediaGridBlockProps['items'][number], idx: number, className: string) => (
        <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.45 }}
            className={cn(
                "group relative",
                className
            )}
        >
            <FramedMediaShell>
                <MediaDisplay
                    src={item.media}
                    type={item.mediaType}
                    className="w-full h-full group-hover:scale-[1.02] transition-transform duration-700"
                />
            </FramedMediaShell>
        </motion.div>
    );

    const renderClassicGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) =>
                renderCard(item, idx, item.size === 'wide' ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]")
            )}
        </div>
    );

    const renderFeatureRight = () => {
        if (items.length < 3) return renderClassicGrid();

        const [first, second, third, ...rest] = items;

        return (
            <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    <div className="lg:col-span-4 grid grid-cols-1 gap-4">
                        {renderCard(first, 0, "aspect-[16/9] lg:aspect-auto lg:h-[188px]")}
                        {renderCard(second, 1, "aspect-[16/9] lg:aspect-auto lg:h-[188px]")}
                    </div>
                    <div className="lg:col-span-8">
                        {renderCard(third, 2, "aspect-[16/9] lg:aspect-auto lg:h-[392px]")}
                    </div>
                </div>

                {rest.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {rest.map((item, idx) => renderCard(item, idx + 3, "aspect-[4/3]"))}
                    </div>
                )}
            </div>
        );
    };

    const renderTriptych = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((item, idx) => renderCard(item, idx, "aspect-square"))}
        </div>
    );

    const renderBanner = () => (
        <div className="space-y-4">
            {items.map((item, idx) => renderCard(item, idx, "aspect-[21/7]"))}
        </div>
    );

    return (
        <section className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
            {layout === 'feature-right' && renderFeatureRight()}
            {layout === 'triptych' && renderTriptych()}
            {layout === 'banner' && renderBanner()}
            {layout === 'grid' && renderClassicGrid()}
        </section>
    );
}
