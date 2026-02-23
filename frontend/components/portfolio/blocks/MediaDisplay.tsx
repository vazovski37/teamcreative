'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useLightbox } from "@/lib/lightbox-context";

interface MediaDisplayProps {
    src: string;
    type: 'video' | 'image';
    alt?: string;
    caption?: string;
    className?: string;
    loop?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    enableLightbox?: boolean;
}

export function MediaDisplay({
    src,
    type,
    alt = "Portfolio media",
    caption,
    className,
    loop = true,
    autoPlay = true,
    muted = true,
    controls = false,
    enableLightbox = true
}: MediaDisplayProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { openLightbox } = useLightbox();

    useEffect(() => {
        if (type === 'video' && videoRef.current && autoPlay) {
            videoRef.current.play().catch(e => console.log('Autoplay blocked', e));
        }
    }, [src, type, autoPlay]);

    const handleClick = (e: React.MouseEvent) => {
        if (!enableLightbox) return;
        e.preventDefault();
        e.stopPropagation();
        openLightbox({ src, type, caption: caption || alt });
    };

    if (type === 'video') {
        return (
            <div
                className={cn("relative overflow-hidden w-full h-full", enableLightbox && "cursor-pointer", className)}
                onClick={handleClick}
            >
                <video
                    ref={videoRef}
                    src={src}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop={loop}
                    muted={muted}
                    autoPlay={autoPlay}
                    playsInline
                    controls={controls}
                />
            </div>
        );
    }

    // Use native img for blob/data URLs since next/image doesn't support them
    const isBlobOrData = src.startsWith('blob:') || src.startsWith('data:');

    return (
        <div
            className={cn("relative overflow-hidden w-full h-full", enableLightbox && "cursor-pointer", className)}
            onClick={handleClick}
        >
            {isBlobOrData ? (
                <img
                    src={src}
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}
        </div>
    );
}
