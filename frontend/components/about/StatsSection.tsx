"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/Container";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function StatsSection() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const stats = [
        { value: 300, label: t('about.stats.completedProjects'), suffix: "+" },
        { value: 250, label: t('about.stats.completedProjects'), suffix: "+" }, // Note: HTML had two same labels, I'll keep as requested or fix if logic implies differ diff. HTML had duplicated "Completed Project". I'll keep it for now.
        { value: 6, label: t('about.stats.globalPartners'), suffix: "" },
        { value: 35, label: t('about.stats.activeProjects'), suffix: "+" },
    ];

    return (
        <section ref={ref} className="py-24">
            <Container className="flex flex-col items-center mb-20">
                <div className="flex items-center gap-6 md:gap-12">
                    <Image
                        src="/assets/star-icon.png"
                        alt="star"
                        width={30}
                        height={50}
                        className="w-6 h-10 md:w-8 md:h-14"
                    />
                    <h2 className="text-[20px] md:text-[28px] font-medium font-[family-name:var(--font-ms-block)] text-white uppercase tracking-[1.5px] leading-[1.4] md:leading-[71px] text-center">
                        {t('about.stats.title')}
                    </h2>
                    <Image
                        src="/assets/star-icon.png"
                        alt="star"
                        width={30}
                        height={50}
                        className="w-6 h-10 md:w-8 md:h-14 scale-x-[-1]"
                    />
                </div>
            </Container>

            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center text-center p-12 bg-[#060606] rounded-[30px] border border-white/5 hover:border-white/10 transition-all min-h-[250px] gap-6">
                            <span className="text-[32px] md:text-[40px] font-medium text-white font-[family-name:var(--font-ms-block)] tracking-widest">
                                {isInView ? <CountUp end={stat.value} duration={2.5} separator="," /> : 0}
                                {stat.suffix}
                            </span>
                            <span className="text-gray-300 text-[16px] md:text-[20px] font-medium uppercase tracking-wider font-[family-name:var(--font-firago)]">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
