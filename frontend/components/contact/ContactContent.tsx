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
