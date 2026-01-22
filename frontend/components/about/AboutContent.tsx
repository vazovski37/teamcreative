"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/Container";

export function AboutContent() {
    const { t } = useTranslation();

    return (
        <section className="py-12 md:py-24">
            <Container>
                <div className="max-w-5xl mx-auto px-4">
                    <p className="text-[16px] md:text-[20px] text-white leading-[34px] text-justify font-normal [word-spacing:4px] font-[family-name:var(--font-firago)]">
                        {t('about.description')}
                    </p>
                </div>
            </Container>
        </section>
    );
}
