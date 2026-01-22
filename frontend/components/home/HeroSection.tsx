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

            <Container className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="flex flex-col items-center">
                        <h1 className="text-[28px] md:text-[45px] font-medium tracking-widest text-white uppercase font-[family-name:var(--font-ms-block)] leading-[1.4] md:leading-[71px]">
                            {t('hero.title')}
                        </h1>
                        <h1 className="text-[28px] md:text-[45px] font-medium tracking-widest text-white uppercase font-[family-name:var(--font-ms-block)] leading-[1.4] md:leading-[71px]">
                            {t('hero.subtitle')}
                        </h1>
                    </div>

                </motion.div>
            </Container>
        </section>
    );
}
