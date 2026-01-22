"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useTranslation, Trans } from "react-i18next";

const features = [
    "Premium Web Development",
    "Custom Design Systems",
    "SEO Optimization",
    "Brand Identity",
];

export function WhoWeAreSection() {
    const { t } = useTranslation();

    return (
        <section id="who-we-are" className="bg-black text-white">
            <div className="flex w-full flex-col lg:flex-row items-center justify-between px-4 max-w-7xl mx-auto gap-12 lg:gap-0">
                {/* Left side - Large Georgian text */}
                <div className="flex items-start gap-4">
                    <h2 className="text-white text-[60px] md:text-[60px] font-medium leading-tight md:leading-[80px] tracking-[2px] md:tracking-[3.6px] font-[family-name:var(--font-ms-block)] uppercase">
                        <Trans i18nKey="whoWeAre.title" components={{ br: <br /> }} />
                    </h2>

                    {/* Star icon - Hidden on mobile, visible on medium screens and up */}
                    <div className="hidden md:block mt-2">
                        <div className="relative w-25 h-25">
                            <Image
                                src="/assets/star-icon.png"
                                alt="Star icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Right side - Description paragraphs */}
                <div className="max-w-xl space-y-4 font-sans mt-8 lg:mt-0">
                    <p className="text-white text-[16px] font-medium leading-relaxed">
                        <Trans i18nKey="whoWeAre.description1" components={[<span key="0" className="font-bold">Team</span>]} />
                    </p>

                    <p className="text-white text-[16px] font-medium leading-relaxed">
                        {t('whoWeAre.description2')}
                    </p>
                </div>
            </div>
        </section>
    );
}
