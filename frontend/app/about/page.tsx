"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutContent } from "@/components/about/AboutContent";
import { PartnersSlider } from "@/components/about/PartnersSlider";
import { StatsSection } from "@/components/about/StatsSection";


export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white relative flex flex-col ">
            {/* Content */}
            <div className="relative z-10 flex flex-col gap-12 pb-24">
                <AboutHero />
                <AboutContent />
                <PartnersSlider />
                <StatsSection />
            </div>
        </main>
    );
}
