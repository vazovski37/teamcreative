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
                        <div key={index} className="flex flex-col items-center justify-center text-center p-12 bg-gradient-to-br from-white/5 to-transparent rounded-[30px] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-500 min-h-[250px] gap-6 relative overflow-hidden group hover:-translate-y-2 backdrop-blur-sm shadow-xl hover:shadow-primary/10">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] -ml-20 -mb-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out delay-100"></div>

                            <span className="text-[40px] md:text-[56px] font-medium text-white font-[family-name:var(--font-ms-block)] tracking-widest relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                {isInView ? <CountUp end={stat.value} duration={2.5} separator="," /> : 0}
                                {stat.suffix}
                            </span>
                            <span className="text-gray-300 text-[14px] md:text-[16px] font-medium uppercase tracking-[0.2em] font-[family-name:var(--font-firago)] relative z-10 group-hover:text-white transition-colors duration-300">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
