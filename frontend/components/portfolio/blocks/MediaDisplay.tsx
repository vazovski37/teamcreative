'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useEffect } from "react";

interface MediaDisplayProps {
    src: string;
    type: 'video' | 'image';
    alt?: string;
    className?: string;
    loop?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
}

export function MediaDisplay({
    src,
    type,
    alt = "Portfolio media",
    className,
    loop = true,
    autoPlay = true,
    muted = true,
    controls = false
}: MediaDisplayProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (type === 'video' && videoRef.current && autoPlay) {
            videoRef.current.play().catch(e => console.log('Autoplay blocked', e));
        }
    }, [src, type, autoPlay]);

    if (type === 'video') {
        return (
            <div className={cn("relative overflow-hidden w-full h-full", className)}>
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

    return (
        <div className={cn("relative overflow-hidden w-full h-full", className)}>
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    );
}
