"use client";

import { useTranslation } from "react-i18next";
import { User, Mail, MapPin, Phone } from "lucide-react";

export function ContactInfoGrid() {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-2 gap-4 h-fit">
            <InfoCard icon={<User className="w-10 h-10" />} label={t('contact.info.projects')} />
            <InfoCard icon={<Mail className="w-10 h-10" />} label={t('contact.info.email')} />
            <InfoCard icon={<MapPin className="w-10 h-10" />} label={t('contact.info.address')} />
            <InfoCard icon={<Phone className="w-10 h-10" />} label={t('contact.info.number')} />
        </div>
    );
}

function InfoCard({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="bg-[#1f1f1f] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-[#252525] transition-colors cursor-default border border-white/5 h-full min-h-[140px]">
            <div className="text-white">
                {icon}
            </div>
            <span className="text-gray-300 font-medium text-sm md:text-[15px]">{label}</span>
        </div>
    )
}
