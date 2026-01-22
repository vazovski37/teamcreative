"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

export function FreelancersBenefits() {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-black text-white">
            <Container>
                {/* Intro Text */}
                <div className="max-w-5xl mx-auto px-4 mb-24 ">
                    <p className="text-[16px] md:text-[20px] font-medium leading-[34px] font-[family-name:var(--font-firago)] text-white/90 text-justify">
                        {t('freelancers.intro')}
                    </p>
                </div>

                {/* Benefits Title */}
                <div className="flex justify-center mb-16">
                    <h2 className="text-[32px] md:text-[50px] font-medium font-[family-name:var(--font-ms-block)] text-white uppercase tracking-widest">
                        {t('freelancers.benefits.title')}
                    </h2>
                </div>

                {/* Benefits List */}
                <div className="flex flex-col gap-12 max-w-5xl mx-auto px-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex gap-6 items-start">
                            <div className="shrink-0 pt-2">
                                <Image
                                    src="/assets/star-icon.png"
                                    alt="star"
                                    width={40}
                                    height={40}
                                    className="w-8 h-8 md:w-12 md:h-12 object-contain"
                                />
                            </div>
                            <p className="text-[16px] md:text-[20px] leading-[30px] font-[family-name:var(--font-firago)] font-medium text-white/90 text-justify">
                                {t(`freelancers.benefits.item${item}`)}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
