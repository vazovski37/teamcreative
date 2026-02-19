"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface MediaItem {
    src: string;
    type: 'video' | 'image';
    caption?: string;
}

interface LightboxContextType {
    isOpen: boolean;
    media: MediaItem | null;
    openLightbox: (media: MediaItem) => void;
    closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [media, setMedia] = useState<MediaItem | null>(null);

    const openLightbox = (media: MediaItem) => {
        setMedia(media);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
        setTimeout(() => setMedia(null), 300); // Clear media after animation
    };

    return (
        <LightboxContext.Provider value={{ isOpen, media, openLightbox, closeLightbox }}>
            {children}
        </LightboxContext.Provider>
    );
}

export function useLightbox() {
    const context = useContext(LightboxContext);
    if (context === undefined) {
        throw new Error("useLightbox must be used within a LightboxProvider");
    }
    return context;
}
