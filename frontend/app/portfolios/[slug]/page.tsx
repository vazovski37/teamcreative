import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProjectGridCard } from "@/components/portfolio/ProjectGridCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mock data generator based on slug
const getProjects = (slug: string) => {
    const colors = ["bg-blue-600", "bg-purple-600", "bg-pink-600", "bg-green-600", "bg-orange-600"];
    return Array.from({ length: 9 }).map((_, i) => ({
        id: i,
        title: `Project ${slug} ${i + 1}`,
        category: slug.replace("-", " ").toUpperCase(),
        image: colors[i % colors.length], // Using colors as placeholders for images
    }));
};

// We need to export this for static export if needed, or just standard page
export async function generateStaticParams() {
    const slugs = ["graphic-design", "web-development", "ui-ux", "branding", "motion", "photography"];
    return slugs.map((slug) => ({ slug }));
}

export default async function ProjectList({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const projects = getProjects(slug);
    const title = slug.replace(/-/g, " ").toUpperCase();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Navbar />
            <main className="pt-32 pb-24">
                <Container>
                    <Link href="/portfolios" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
                    </Link>

                    <div className="mb-12">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                            {title}
                        </h1>
                        <p className="mt-4 text-gray-400">
                            Selected works from our {title.toLowerCase()} portfolio.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <ProjectGridCard
                                key={project.id}
                                title={project.title}
                                category={project.category}
                                image={project.image}
                            />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button variant="outline" size="lg" className="rounded-full">Load More Projects</Button>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
