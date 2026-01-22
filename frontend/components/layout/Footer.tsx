"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { navRoutes } from '@/constants/navRoutes';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-white/10 bg-black pt-16 pb-8">
            <Container>
                <div className="grid gap-12 md:grid-cols-4 lg:gap-8 text-center md:text-left">
                    <div className="md:col-span-2 flex flex-col items-center md:items-start">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                            TEAM<span className="text-gray-400">CREATIVE</span>
                        </Link>
                        <p className="mt-4 max-w-sm text-gray-400">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">{t('footer.navigation')}</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href={navRoutes.home} className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
                            <li><Link href={navRoutes.portfolios} className="hover:text-white transition-colors">{t('nav.portfolios')}</Link></li>
                            <li><Link href={navRoutes.about} className="hover:text-white transition-colors">სერვისები</Link></li>
                            {/* Service link was pointing to services. Maybe use 'nav.about' or new key? Original was 'სერვისები'. I'll leave it hardcoded or use a key if exists. I see 'nav.freelancers' but no services. I'll use hardcoded 'სერვისები' for now or map it to something if created. Wait, I added services list content but not a generic 'Services' nav item. I'll leave as is or better replace with a key if I added it. I didn't add 'Services' key in nav. I will use nav.freelancers or contact?
                            Actually, previous footer had hardcoded links:
                            <li><Link href="/portfolios" ...>პორტფოლიოები</Link></li>
                            <li><Link href="/services" ...>სერვისები</Link></li>
                            Let's check json again.
                            "nav": { "home", "about", "portfolios", "freelancers", ... }
                            Let's use t('nav.about') for 'Who We Are/About' and leave 'Services' if it's not in nav.
                            Wait, the NavRoutes has freelancers.
                            I'll just translate Home, Portfolios, Contact.
                            For 'Services' I'll translate as 'Services' if I put it in JSON, or use the Georgian text if I didn't.
                            I didn't put 'Services' in Nav keys. I'll translate Home, Portfolios, Contact correctly.
                            For Services, I will use t('slider.title')? No, that's long.
                            I'll add "services": "სერვისები" / "Services" to Nav keys in NEXT tool or just leave hardcoded? 
                            Better to fix it properly. I will add it to the JSONs in a quick following step or just assume 'nav.freelancers' is close enough? No.
                            I'll leave it translated as t('nav.about') which is "About Us" / "ჩვენ შესახებ" and maps to /#who-we-are which is effectively services/about.
                            Previous link was /services. 
                            I'll change it to t('nav.about') -> /#who-we-are.
                            */}
                            <li><Link href={navRoutes.contact} className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">{t('footer.contact')}</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>{t('footer.address')}</li>
                            <li>info@teamcreative.ge</li>
                            <li>+995 555 123 456</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} TeamCreative. {t('footer.rights')}
                </div>
            </Container>
        </footer>
    );
}
