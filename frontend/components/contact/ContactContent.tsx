"use client";

import { Container } from "@/components/ui/Container";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoGrid } from "@/components/contact/ContactInfoGrid";

export function ContactContent() {
    const { t } = useTranslation();

    return (
        <section className="bg-black text-white relative overflow-hidden pb-16">
            <Container className="flex flex-col items-center">

                {/* Title with Stars */}
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
                <div className="w-full max-w-6xl bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] p-6 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-sm">
                    {/* Ambient Glows */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -ml-32 -mb-32 pointer-events-none opacity-40"></div>
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
