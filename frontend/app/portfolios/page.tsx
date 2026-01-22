import { Container } from "@/components/ui/Container";
import { ProjectCategoryCard } from "@/components/portfolio/ProjectCategoryCard";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const categories = [
    { id: 1, title: "Graphic Design", count: 12, slug: "graphic-design", color: "bg-blue-600" },
    { id: 2, title: "Web Development", count: 8, slug: "web-development", color: "bg-purple-600" },
    { id: 3, title: "UI/UX Design", count: 5, slug: "ui-ux", color: "bg-pink-600" },
    { id: 4, title: "Branding", count: 10, slug: "branding", color: "bg-orange-600" },
    { id: 5, title: "Motion Graphics", count: 4, slug: "motion", color: "bg-green-600" },
    { id: 6, title: "Photography", count: 15, slug: "photography", color: "bg-red-600" },
];

export default function Portfolios() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Navbar />
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
                </Container>
            </main>
            <Footer />
        </div>
    );
}
