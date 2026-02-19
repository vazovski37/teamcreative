"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { useTranslation } from "react-i18next";

export function ContactForm() {
    const { t } = useTranslation();

    return (
        <form className="space-y-6 w-full relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                    <Input
                        placeholder={t('contact.form.name')}
                        className="bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white text-[15px] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-primary/50 focus-visible:bg-white/10 transition-all duration-300"
                    />
                </div>
                <div className="space-y-2 group">
                    <Input
                        placeholder={t('contact.form.surname')}
                        className="bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white text-[15px] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-primary/50 focus-visible:bg-white/10 transition-all duration-300"
                    />
                </div>
            </div>

            <div className="space-y-2 group">
                <Input
                    placeholder={t('contact.form.email')}
                    className="bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-white text-[15px] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-primary/50 focus-visible:bg-white/10 transition-all duration-300"
                />
            </div>

            <div className="space-y-2 group">
                <textarea
                    placeholder={t('contact.form.message')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-[15px] placeholder:text-gray-500 focus-visible:outline-none focus-visible:border-primary/50 focus-visible:bg-white/10 transition-all duration-300 min-h-[160px] resize-none"
                />
            </div>

            <div className="flex justify-center pt-4">
                <Button className="w-full md:w-auto bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 rounded-xl px-12 py-7 font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,75,0,0.4)]">
                    {t('contact.form.send')}
                </Button>
            </div>
        </form>
    );
}
