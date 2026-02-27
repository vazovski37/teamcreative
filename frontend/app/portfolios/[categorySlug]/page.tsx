
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Project } from "@/constants/portfolios";

const CATEGORY_NAMES: Record<string, string> = {
    'social-media': 'Social Media',
    'web-development': 'Web Development',
    'ui-ux': 'UI/UX Design',
    'branding': 'Branding',
    'seo': 'SEO',
    'graphic-design': 'Graphic Design',
    'showcase': 'Portfolio',
};

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
    params: Promise<{
        categorySlug: string;
    }>;
}

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
    const { data: projectsData } = await supabase.from('projects').select('categorySlug');
    const projects = projectsData || [];
    const slugs = [...new Set(projects.map((p: any) => p.categorySlug).filter(Boolean))];
    return slugs.map((categorySlug: any) => ({ categorySlug }));
}

export default async function CategoryPage({ params }: PageProps) {
    const { categorySlug } = await params;

    const { data: projectsData, error } = await supabase
        .from('projects')
        .select('*')
        .eq('categorySlug', categorySlug);

    const categoryProjects = (projectsData || []) as Project[];

    if (categoryProjects.length === 0) {
        notFound();
    }

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
