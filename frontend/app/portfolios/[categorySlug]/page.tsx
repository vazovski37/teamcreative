
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getProjectsByCategory, projects } from "@/constants/portfolios";

import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { notFound } from "next/navigation";

const CATEGORY_NAMES: Record<string, string> = {
    'social-media': 'Social Media',
    'web-development': 'Web Development',
    'ui-ux': 'UI/UX Design',
    'branding': 'Branding',
    'seo': 'SEO',
    'graphic-design': 'Graphic Design',
    'showcase': 'Portfolio',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { categorySlug } = await params;
    const categoryName = CATEGORY_NAMES[categorySlug] || categorySlug;
    const title = `${categoryName} Projects | TeamCreative`;
    const description = `Explore our ${categoryName.toLowerCase()} projects — creative work tailored to deliver results by TeamCreative.`;

    return {
        title,
        description,
        openGraph: { title, description, type: "website" },
        twitter: { card: "summary", title, description },
    };
}

export async function generateStaticParams() {
    const slugs = [...new Set(projects.map((p) => p.categorySlug))];
    return slugs.map((categorySlug) => ({ categorySlug }));
}


interface PageProps {
    params: Promise<{
        categorySlug: string;
    }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { categorySlug } = await params;

    // Check if category exists by checking if any project has this categorySlug
    // unique valid categories check
    const validCategory = projects.some(p => p.categorySlug === categorySlug);

    if (!validCategory) {
        // Alternatively, if no projects, maybe we still want to show an empty page if the category is technically valid?
        // For now, if no projects match, assume 404 or just show empty. 
        // Better to check against a known list of categories if we had one separate from projects.
        // But since we derive everything from projects:
        if (projects.filter(p => p.categorySlug === categorySlug).length === 0) {
            notFound();
        }
    }

    const categoryProjects = getProjectsByCategory(categorySlug);
    const categoryTitle = categoryProjects[0]?.category || categorySlug;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <main className="pt-32 pb-24">
                <Container>
                    <div className="mb-16 text-center">
                        <h4 className="text-blue-500 font-medium mb-2 tracking-wider uppercase text-sm">
                            Portfolio
                        </h4>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            {categoryTitle}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Explore our work in various industries, tailored to deliver specific results and overcome unique challenges.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryProjects.map((project) => (
                            <div key={project.id} className="h-full">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                </Container>
            </main>
        </div>
    );
}
