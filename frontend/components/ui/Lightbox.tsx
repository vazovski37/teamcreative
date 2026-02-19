"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useLightbox } from "@/lib/lightbox-context";
import { useEffect } from "react";

export function Lightbox() {
    const { isOpen, media, closeLightbox } = useLightbox();

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeLightbox]);

    return (
        <AnimatePresence>
            {isOpen && media && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-[110]"
                    >
                        <X size={40} strokeWidth={1.5} />
                    </button>

                    {/* Content Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent close on content click
                    >
                        {media.type === 'video' ? (
                            <video
                                src={media.src}
                                controls
                                autoPlay
                                playsInline
                                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                            />
                        ) : (
                            <div className="relative w-full h-[85vh]">
                                <Image
                                    src={media.src}
                                    alt={media.caption || "Lightbox image"}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                    priority
                                />
                            </div>
                        )}

                        {/* Caption */}
                        {media.caption && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-4 text-white/90 text-center font-medium text-lg md:text-xl max-w-2xl px-4"
                            >
                                {media.caption}
                            </motion.p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
