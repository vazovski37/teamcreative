"use client";

import { ContactContent } from "@/components/contact/ContactContent";
import { JoinTeamCTA } from "@/components/contact/JoinTeamCTA";

export default function Contact() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 pt-32">
            <main>
                <ContactContent />
                <JoinTeamCTA />
            </main>
        </div>
    );
}
