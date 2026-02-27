import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectCategoryCard } from "@/components/portfolio/ProjectCategoryCard";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { supabase } from "@/lib/supabase";
import { Project } from "@/constants/portfolios";

export const metadata: Metadata = {
    title: "Portfolio | TeamCreative",
    description: "Explore our creative portfolio — social media, web development, UI/UX design, branding, SEO, and graphic design projects by TeamCreative.",
    openGraph: {
        title: "Portfolio | TeamCreative",
        description: "Explore our creative portfolio — social media, web development, UI/UX design, branding, SEO, and graphic design projects by TeamCreative.",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Portfolio | TeamCreative",
        description: "Explore our creative portfolio by TeamCreative.",
    },
};

export const revalidate = 3600;

const CATEGORY_COLORS: Record<string, string> = {
    "social-media": "bg-blue-600",
    "web-development": "bg-purple-600",
    "ui-ux": "bg-pink-600",
    "branding": "bg-orange-600",
    "seo": "bg-green-600",
    "graphic-design": "bg-red-600",
};

export default async function Portfolios() {
    const { data: projectsData, error } = await supabase
        .from('projects')
        .select('*');

    const projects: Project[] = (projectsData || []) as Project[];

    const categoryMap = new Map<string, { id: number; title: string; count: number; slug: string; color: string }>();
    let idCounter = 1;

    projects.forEach(p => {
        if (!categoryMap.has(p.categorySlug)) {
            categoryMap.set(p.categorySlug, {
                id: idCounter++,
                title: p.category || p.categorySlug,
                count: 1,
                slug: p.categorySlug,
                color: CATEGORY_COLORS[p.categorySlug] || "bg-gray-600"
            });
        } else {
            const cat = categoryMap.get(p.categorySlug)!;
            cat.count += 1;
        }
    });

    const categories = Array.from(categoryMap.values());

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <main className="pt-32 pb-24">
                <Container>
                    <div className="mb-16 text-center">
                        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                            OUR WORK
                        </h1>
                        <p className="mt-6 text-xl text-gray-400">
                            Explore our creative journey across different fields.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((cat) => (
                            <ProjectCategoryCard
                                key={cat.id}
                                title={cat.title}
                                slug={cat.slug}
                                count={cat.count}
                                color={cat.color}
                            />
                        ))}
                    </div>

                    <div className="mt-32">
                        <h2 className="text-3xl font-bold mb-12 text-center">Recent Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.slice(0, 3).map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
}
