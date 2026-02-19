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
                <div className="w-full max-w-5xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden backdrop-blur-sm">
                    {/* Ambient Glows */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -ml-32 -mb-32 pointer-events-none opacity-40"></div>

                    <form className="flex flex-col gap-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="flex flex-col gap-3 group">
                                <label className="text-white/70 text-sm font-[family-name:var(--font-firago)] font-medium pl-2 tracking-wide group-focus-within:text-white transition-colors">
                                    {t('freelancers.form.name_surname')}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('freelancers.form.name_surname')}
                                    className="h-[64px] bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 font-[family-name:var(--font-firago)] placeholder:text-white/20"
                                />
                            </div>

                            {/* Number */}
                            <div className="flex flex-col gap-3 group">
                                <label className="text-white/70 text-sm font-[family-name:var(--font-firago)] font-medium pl-2 tracking-wide group-focus-within:text-white transition-colors">
                                    {t('freelancers.form.number')} <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('freelancers.form.number')}
                                    className="h-[64px] bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 font-[family-name:var(--font-firago)] placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Email */}
                            <div className="flex flex-col gap-3 group">
                                <label className="text-white/70 text-sm font-[family-name:var(--font-firago)] font-medium pl-2 tracking-wide group-focus-within:text-white transition-colors">
                                    {t('freelancers.form.email')} <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder={t('freelancers.form.email')}
                                    className="h-[64px] bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 font-[family-name:var(--font-firago)] placeholder:text-white/20"
                                />
                            </div>

                            {/* Portfolio Link */}
                            <div className="flex flex-col gap-3 group">
                                <label className="text-white/70 text-sm font-[family-name:var(--font-firago)] font-medium pl-2 tracking-wide group-focus-within:text-white transition-colors">
                                    {t('freelancers.form.portfolio')} <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('freelancers.form.portfolio')}
                                    className="h-[64px] bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 font-[family-name:var(--font-firago)] placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="flex flex-col gap-3 group">
                            <label className="text-white/70 text-sm font-[family-name:var(--font-firago)] font-medium pl-2 tracking-wide group-focus-within:text-white transition-colors">
                                {t('freelancers.form.upload')}
                            </label>
                            <div className="h-[64px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex items-center hover:border-white/20 transition-colors group-focus-within:border-primary/50">
                                <button type="button" className="h-full px-8 bg-white/10 text-white font-bold text-sm uppercase hover:bg-white/20 transition-colors">
                                    {t('freelancers.form.upload_btn')}
                                </button>
                                <span className="px-6 text-white/40 font-[family-name:var(--font-firago)]">
                                    No file chosen
                                </span>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-3 group">
                            <label className="text-white/70 text-sm font-[family-name:var(--font-firago)] font-medium pl-2 tracking-wide group-focus-within:text-white transition-colors">
                                {t('freelancers.form.message')}
                            </label>
                            <textarea
                                placeholder={t('freelancers.form.message')}
                                className="h-[200px] bg-white/5 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 font-[family-name:var(--font-firago)] placeholder:text-white/20 resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <Button className="w-full md:w-auto bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 rounded-xl px-12 py-7 font-bold text-lg font-[family-name:var(--font-firago)] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,75,0,0.4)]">
                                {t('freelancers.form.send')}
                            </Button>
                        </div>

                    </form>
                </div>
            </Container>
        </section>
    );
}
