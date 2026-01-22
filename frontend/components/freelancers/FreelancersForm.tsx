"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function FreelancersForm() {
    const { t } = useTranslation();

    return (
        <section className="py-24 pb-48 bg-black">
            <Container className="flex flex-col items-center">
                {/* Header */}
                <div className="flex items-center gap-6 md:gap-12 mb-20">
                    <Image
                        src="/assets/star-icon.png"
                        alt="star"
                        width={30}
                        height={50}
                        className="hidden md:block w-6 h-10 md:w-8 md:h-14 -rotate-12"
                    />
                    <h2 className="text-[32px] md:text-[50px] font-medium font-[family-name:var(--font-ms-block)] text-white uppercase tracking-widest text-center">
                        {t('freelancers.form.title')}
                    </h2>
                    <Image
                        src="/assets/star-icon.png"
                        alt="star"
                        width={30}
                        height={50}
                        className="hidden md:block w-6 h-10 md:w-8 md:h-14 rotate-12 scale-x-[-1]"
                    />
                </div>

                {/* Form */}
                <div className="w-full max-w-5xl bg-[#111] border border-white/5 rounded-[30px] p-8 md:p-16">
                    <form className="flex flex-col gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="flex flex-col gap-3">
                                <label className="text-white font-[family-name:var(--font-firago)] opacity-80 pl-2">
                                    {t('freelancers.form.name_surname')}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('freelancers.form.name_surname')}
                                    className="h-[60px] bg-[#222] rounded-xl px-6 text-white outline-none focus:ring-1 focus:ring-white/20 font-[family-name:var(--font-firago)] placeholder:text-gray-500"
                                />
                            </div>

                            {/* Number */}
                            <div className="flex flex-col gap-3">
                                <label className="text-white font-[family-name:var(--font-firago)] opacity-80 pl-2">
                                    {t('freelancers.form.number')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('freelancers.form.number')}
                                    className="h-[60px] bg-[#222] rounded-xl px-6 text-white outline-none focus:ring-1 focus:ring-white/20 font-[family-name:var(--font-firago)] placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Email */}
                            <div className="flex flex-col gap-3">
                                <label className="text-white font-[family-name:var(--font-firago)] opacity-80 pl-2">
                                    {t('freelancers.form.email')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder={t('freelancers.form.email')}
                                    className="h-[60px] bg-[#222] rounded-xl px-6 text-white outline-none focus:ring-1 focus:ring-white/20 font-[family-name:var(--font-firago)] placeholder:text-gray-500"
                                />
                            </div>

                            {/* Portfolio Link */}
                            <div className="flex flex-col gap-3">
                                <label className="text-white font-[family-name:var(--font-firago)] opacity-80 pl-2">
                                    {t('freelancers.form.portfolio')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('freelancers.form.portfolio')}
                                    className="h-[60px] bg-[#222] rounded-xl px-6 text-white outline-none focus:ring-1 focus:ring-white/20 font-[family-name:var(--font-firago)] placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="flex flex-col gap-3">
                            <label className="text-white font-[family-name:var(--font-firago)] opacity-80 pl-2">
                                {t('freelancers.form.upload')}
                            </label>
                            <div className="h-[60px] bg-[#222] rounded-xl overflow-hidden flex items-center">
                                <button type="button" className="h-full px-6 bg-[#eee] text-black font-bold text-sm uppercase">
                                    {t('freelancers.form.upload_btn')}
                                </button>
                                <span className="px-6 text-gray-500 font-[family-name:var(--font-firago)]">
                                    No file chosen
                                </span>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-3">
                            <label className="text-white font-[family-name:var(--font-firago)] opacity-80 pl-2">
                                {t('freelancers.form.message')}
                            </label>
                            <textarea
                                placeholder={t('freelancers.form.message')}
                                className="h-[200px] bg-[#222] rounded-xl p-6 text-white outline-none focus:ring-1 focus:ring-white/20 font-[family-name:var(--font-firago)] placeholder:text-gray-500 resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <div>
                            <Button className="bg-white text-black hover:bg-gray-200 rounded-[4px] px-8 py-6 font-bold text-[16px] font-[family-name:var(--font-firago)]">
                                {t('freelancers.form.send')}
                            </Button>
                        </div>

                    </form>
                </div>
            </Container>
        </section>
    );
}
