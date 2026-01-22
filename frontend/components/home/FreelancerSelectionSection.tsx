'use client';

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'
import Link from 'next/link'
import { navRoutes } from '@/constants/navRoutes'

export function FreelancerSelectionSection() {
    const { t } = useTranslation()

    return (
        <section className="py-24 bg-black overflow-hidden relative">
            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6">

                    {/* Left Card - Tilted Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotate: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:block relative w-[280px] h-[380px] bg-gradient-to-br from-blue-900 to-cyan-500 rounded-[30px] shadow-2xl skew-y-3"
                    >
                        {/* Abstract lines or content placeholder */}
                        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.png')] opacity-20 bg-cover"></div>
                    </motion.div>

                    {/* Center Content */}
                    <div className="flex flex-col items-center text-center z-20 mx-4">
                        <h2 className="text-white text-[32px] md:text-[45px] font-medium leading-[1.4] md:leading-[70px] tracking-[0.4px] font-[family-name:var(--font-ms-block)] uppercase mb-12">
                            <Trans i18nKey="freelancerSelection.title" components={{ br: <br /> }} />
                        </h2>

                        <Link href={navRoutes.portfolios}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-2 px-8 py-6 bg-transparent text-white border-white cursor-pointer hover:bg-white/10 hover:border-white uppercase font-bold text-sm tracking-widest transition-all duration-300"
                            >
                                {t('freelancerSelection.cta')}
                            </Button>
                        </Link>

                        {/* Gradient Line Decoration */}
                        <div className="mt-8 w-32 h-1.5 rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-red-500" />
                    </div>

                    {/* Right Card - Tilted Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:block relative w-[280px] h-[380px] bg-gradient-to-bl from-purple-900 to-pink-500 rounded-[30px] shadow-2xl -skew-y-3"
                    >
                        {/* Abstract lines or content placeholder */}
                        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.png')] opacity-20 bg-cover"></div>
                    </motion.div>

                </div>
            </Container>

            {/* Mobile Background Decoration elements to simulate cards if needed, or just keep clean */}
            <div className="lg:hidden absolute top-1/2 left-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -translate-y-1/2"></div>
            <div className="lg:hidden absolute top-1/2 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full -translate-y-1/2"></div>
        </section>
    )
}
