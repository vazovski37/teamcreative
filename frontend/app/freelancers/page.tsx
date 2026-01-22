"use client";

import { FreelancersHero } from "@/components/freelancers/FreelancersHero";
import { FreelancersBenefits } from "@/components/freelancers/FreelancersBenefits";
import { FreelancersForm } from "@/components/freelancers/FreelancersForm";

export default function Freelancers() {
    return (
        <main className="min-h-screen bg-black text-white relative flex flex-col ">
            <FreelancersHero />
            <FreelancersBenefits />
            <FreelancersForm />
        </main>
    );
}
