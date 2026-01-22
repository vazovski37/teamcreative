"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { useTranslation } from "react-i18next";

export function ContactForm() {
    const { t } = useTranslation();

    return (
        <form className="space-y-4 w-full">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Input
                        placeholder={t('contact.form.name')}
                        className="bg-[#1f1f1f] border-none h-14 rounded-xl px-6 text-white text-[15px] placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-700"
                    />
                </div>
                <div className="space-y-2">
                    <Input
                        placeholder={t('contact.form.surname')}
                        className="bg-[#1f1f1f] border-none h-14 rounded-xl px-6 text-white text-[15px] placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-700"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Input
                    placeholder={t('contact.form.email')}
                    className="bg-[#1f1f1f] border-none h-14 rounded-xl px-6 text-white text-[15px] placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-700"
                />
            </div>

            <div className="space-y-2">
                <textarea
                    placeholder={t('contact.form.message')}
                    className="w-full bg-[#1f1f1f] border-none rounded-2xl p-6 text-white text-[15px] placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 min-h-[160px] resize-none"
                />
            </div>

            <div className="flex justify-center pt-2">
                <Button className="text-black hover:bg-gray-200 rounded-[4px] px-10 py-6 font-bold text-sm">
                    {t('contact.form.send')}
                </Button>
            </div>
        </form>
    );
}
