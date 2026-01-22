"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { HardHat } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoGrid } from "@/components/contact/ContactInfoGrid";

export function ContactSection() {
    const { t } = useTranslation();

    return (
        <section id="contact" className="py-24 bg-black text-white relative overflow-hidden">
            <Container className="flex flex-col items-center">

                {/* Top Section */}
                <div className="flex flex-col items-center text-center gap-6 mb-24">
                    <div className="relative w-24 h-24 mb-6">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                        <div className="relative z-10 w-full h-full flex items-center justify-center border border-white/20 rounded-full bg-black">
                            <Image
                                src="/assets/Asset-2-1.png"
                                alt="Icon"
                                width={200}
                                height={200}
                                className="w-40 h-40 object-contain"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 items-center">
                        <h2 className="text-[22px] md:text-[30px] font-medium leading-[1.5] md:leading-[80px] tracking-[3.6px] font-[family-name:var(--font-ms-block)] uppercase text-white pr-0 md:pr-72 text-center md:text-left">
                            {t('contact.topTitle')}
                        </h2>
                        <p className="text-[22px] md:text-[30px] font-medium leading-[1.5] md:leading-[80px] tracking-[3.6px] font-[family-name:var(--font-ms-block)] uppercase text-[#FFFFFF85] pl-0 md:pl-72 text-center md:text-left">
                            {t('contact.topSubtitle')}
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-6 md:mt-10 rounded-full border border-white/30 px-8 py-6 text-[10px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all bg-transparent text-gray-300"
                    >
                        {t('contact.scheduleBtn')}
                    </Button>
                </div>

                {/* Middle Title with Stars */}
                <div className="flex items-center justify-center gap-4 md:gap-16 mb-16 w-full">
                    <Image
                        src="/assets/star-icon.png"
                        alt="star"
                        width={40}
                        height={60}
                        className="w-6 h-10 md:w-10 md:h-16"
                    />
                    <h2 className="text-[20px] md:text-[28px] font-medium leading-[71px] tracking-[1.5px] font-[family-name:var(--font-ms-block)] uppercase whitespace-nowrap text-white">
                        {t('contact.mainTitle')}
                    </h2>
                    <Image
                        src="/assets/star-icon.png"
                        alt="star"
                        width={40}
                        height={60}
                        className="w-6 h-10 md:w-10 md:h-16 scale-x-[-1]"
                    />
                </div>

                {/* Main Content Card */}
                <div className="w-full max-w-6xl bg-[#111111] rounded-[30px] p-6 md:p-12 shadow-2xl border border-white/5">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">

                        {/* Form Side */}
                        <ContactForm />

                        {/* Info Grid Side */}
                        <ContactInfoGrid />
                    </div>
                </div>

            </Container>
        </section>
    );
}
