"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function FreelancersHero() {
    const { t } = useTranslation();

    return (
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center relative pt-32 pb-16 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/about-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover object-center opacity-80"
                    quality={100}
                    priority
                />
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <Container className="relative z-10 flex items-center justify-center h-full">

                <div className="flex flex-col gap-2 z-10 w-full items-center">
                    <h1 className="text-[60px] md:text-[85px] font-medium font-[family-name:var(--font-ms-block)] text-white uppercase leading-[1.1] md:leading-[100px] tracking-normal">
                        {t('freelancers.hero.title1')}
                    </h1>
                    <h2 className="text-[20px] md:text-[40px] font-medium font-[family-name:var(--font-ms-block)] text-white uppercase leading-[1.2] md:leading-[100px]">
                        {t('freelancers.hero.title2')}
                    </h2>
                </div>

            </Container>

            {/* Helmet Icon - Absolute Right of Screen */}
            <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 pr-10">
                <div className="relative w-25 h-25 p-4">
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
                    <Image
                        src="/assets/Asset-2-1.png"
                        alt="Helmet"
                        fill
                        className="object-contain relative z-10"
                    />
                </div>
            </div>
        </section>
    );
}
