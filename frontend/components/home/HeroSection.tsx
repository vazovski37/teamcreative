"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Hero Background"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={100}
                    sizes="100vw"
                />
                {/* Overlay to ensure text readability if needed, though the image looks dark enough */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <Container className="relative z-10 flex items-center justify-center h-full">

                <div className="flex flex-col gap-2 z-10 w-full items-center">
                    <h2 className="text-[32px] md:text-[56px] font-medium font-[family-name:var(--font-ms-block)] text-white uppercase leading-tight md:leading-[1.1] tracking-tight">
                        {t('hero.title')}
                    </h2>
                    <h2 className="text-[32px] md:text-[56px] font-medium font-[family-name:var(--font-ms-block)] text-white uppercase leading-tight md:leading-[1.1] tracking-tight">
                        {t('hero.title2')}
                    </h2>
                    <h1 className="text-[64px] md:text-[120px] font-medium font-[family-name:var(--font-ms-block)] text-white uppercase leading-none md:leading-[0.9] tracking-tight mt-2 md:mt-4">
                        {t('hero.subtitle')}
                    </h1>
                </div>

            </Container>
        </section>
    );
}
