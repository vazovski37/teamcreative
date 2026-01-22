"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function ServicesList() {
    const { t } = useTranslation();

    return (
        <section className="py-12 bg-black border-t border-white/5">
            <Container className="flex flex-col items-center text-center gap-8">
                <p className="max-w-4xl text-sm font-medium text-gray-300 md:text-base tracking-wide uppercase leading-relaxed">
                    {t('servicesList.list')}
                </p>

                <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-gray-200 uppercase font-bold text-sm">
                    {t('servicesList.cta')}
                </Button>
            </Container>
        </section>
    );
}
