"use client";

import { Container } from "@/components/ui/Container";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Blog() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <main className="pt-32 pb-24">
                <Container>
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                            BLOG
                        </h1>
                        <p className="mt-4 text-gray-400 max-w-xl">
                            Coming soon...
                        </p>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
