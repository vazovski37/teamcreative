"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export function JoinTeamCTA() {
    const { t } = useTranslation();

    return (
        <section className="bg-black text-white py-24 pb-32 text-center relative overflow-hidden">
            <Container className="flex flex-col items-center z-10 relative">
                {/* Helmet Icon */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8">
                    <Image
                        src="/assets/Asset-2-1.png"
                        alt="Team Helmet"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Title */}
                <h2
                    className="text-[24px] md:text-[40px] font-medium font-[family-name:var(--font-ms-block)] uppercase leading-[1.2] md:leading-[1.4] tracking-wider mb-10"
                    dangerouslySetInnerHTML={{ __html: t('contact.cta.title') }}
                />

                {/* Button */}
                <Button
                    className="bg-[#222] text-white hover:bg-[#333] border-none rounded-[4px] px-8 py-6 md:px-10 md:py-7 font-bold text-sm md:text-[16px] font-[family-name:var(--font-firago)]"
                >
                    {t('contact.cta.button')}
                </Button>
            </Container>
        </section>
    );
}
