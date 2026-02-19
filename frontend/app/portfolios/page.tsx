import { Container } from "@/components/ui/Container";
import { ProjectCategoryCard } from "@/components/portfolio/ProjectCategoryCard";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projects } from "@/constants/portfolios";

const categories = [
    { id: 1, title: "Social Media", count: 6, slug: "social-media", color: "bg-blue-600" },
    { id: 2, title: "Web Development", count: 0, slug: "web-development", color: "bg-purple-600" },
    { id: 3, title: "UI/UX Design", count: 0, slug: "ui-ux", color: "bg-pink-600" },
    { id: 4, title: "Branding", count: 0, slug: "branding", color: "bg-orange-600" },
    { id: 5, title: "SEO", count: 0, slug: "seo", color: "bg-green-600" },
    { id: 6, title: "Graphic Design", count: 0, slug: "graphic-design", color: "bg-red-600" },
];

export default function Portfolios() {
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
