import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Project } from "@/constants/portfolios";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeroBlock } from "@/components/portfolio/blocks/HeroBlock";
import { TextBlock } from "@/components/portfolio/blocks/TextBlock";
import { InfoCardBlock } from "@/components/portfolio/blocks/InfoCardBlock";
import { ReelGridBlock } from "@/components/portfolio/blocks/ReelGridBlock";
import { MediaGridBlock } from "@/components/portfolio/blocks/MediaGridBlock";
import { VerticalShowcaseBlock } from "@/components/portfolio/blocks/VerticalShowcaseBlock";
import { ResultsBlock } from "@/components/portfolio/blocks/ResultsBlock";
import { LegacyColumnsBlock } from "@/components/portfolio/blocks/LegacyColumnsBlock";
import { BentoGridBlock } from "@/components/portfolio/blocks/BentoGridBlock";
import { ResultsCTA } from "@/components/portfolio/ResultsCTA";

export const revalidate = 3600;

interface PageProps {
    params: Promise<{
        categorySlug: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { categorySlug, slug } = await params;

    const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('categorySlug', categorySlug)
        .eq('slug', slug)
        .single();

    const project = data as Project | null;

    if (!project) {
        return { title: "Project Not Found | TeamCreative" };
    }

    const meta = project.meta;
    const title = meta?.metaTitle || `${project.title} – ${project.client} | TeamCreative`;
    const description = meta?.metaDescription || project.description || `${project.category} project for ${project.client} by TeamCreative.`;
    const ogImage = meta?.ogImage || project.coverImage;
    const keywordsStr = meta?.keywords;

    return {
        title,
        description,
        ...(keywordsStr && { keywords: keywordsStr.split(',').map(k => k.trim()) }),
        openGraph: {
            title,
            description,
            type: "article",
            ...(ogImage && {
                images: [{ url: ogImage, alt: project.title }],
            }),
        },
        twitter: {
            card: ogImage ? "summary_large_image" : "summary",
            title,
            description,
            ...(ogImage && { images: [ogImage] }),
        },
    };
}

export async function generateStaticParams() {
    const { data: projectsData } = await supabase.from('projects').select('categorySlug, slug');
    const projects = projectsData || [];
    return projects.map((p: any) => ({
        categorySlug: p.categorySlug,
        slug: p.slug,
    }));
}

export default async function ProjectPage({ params }: PageProps) {
    const { categorySlug, slug } = await params;

    const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('categorySlug', categorySlug)
        .eq('slug', slug)
        .single();

    const project = data as Project | null;

    if (!project) {
        notFound();
    }

    // If project has new content blocks, render them
    if (project.content && project.content.length > 0) {
        return (
            <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans">
                {project.content.map((block, idx) => {
                    switch (block.type) {
                        case 'hero':
                            return <HeroBlock key={idx} {...block} />;
                        case 'text-highlight':
                            return <TextBlock key={idx} text={block.text} label={block.label} align={block.align} />;
                        case 'legacy-columns':
                            return <LegacyColumnsBlock key={idx} {...block} />;
                        case 'info-card':
                            return <InfoCardBlock key={idx} {...block} />;
                        case 'reel-grid':
                            return <ReelGridBlock key={idx} {...block} />;
                        case 'media-grid':
                            return <MediaGridBlock key={idx} {...block} />;
                        case 'vertical-showcase':
                            return <VerticalShowcaseBlock key={idx} {...block} />;
                        case 'bento-grid':
                            return <BentoGridBlock key={idx} {...block} />;
                        case 'results':
                            return <ResultsBlock key={idx} {...block} />;
                        default:
                            return null;
                    }
                })}

                <ResultsCTA />
            </div>
        );
    }

    // Fallback for projects not yet migrated (Legacy Layout)
    // Split images for different sections
    const storyImages = project.images ? project.images.slice(0, 3) : [];
    const galleryImages = project.images ? project.images.slice(3) : [];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">

            {/* HERO SECTION */}
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                {/* Background Media */}
                <div className="absolute inset-0 z-0">
                    {project.coverImage ? (
                        project.coverImage.startsWith('blob:') || project.coverImage.startsWith('data:') || project.coverImage.startsWith('/uploads/') ? (
                            <img src={project.coverImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        ) : (
                            <Image src={project.coverImage} alt={project.title} fill className="object-cover opacity-60" priority />
                        )
                    ) : (
                        <div className="w-full h-full bg-neutral-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <h2 className="text-blue-500 tracking-wider uppercase text-sm md:text-base font-bold mb-4">
                        {project.category} / {project.client}
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-8 drop-shadow-2xl font-heading">
                        {project.title}
                    </h1>
                </div>
            </section>

            <Container className="py-24 space-y-32">

                {/* INTRO TEXT SECTION */}
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                        To create a truly immersive experience, our strategy focused on distinct visual storytelling.
                    </p>
                </div>

                {/* TASK & STRATEGY GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* The Task */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="h-px flex-1 bg-white/20"></span>
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-400">The Task</span>
                        </div>
                        <div className="relative pl-8 border-l-2 border-blue-500/50">
                            <h3 className="text-2xl font-bold mb-4 text-white">Challenge Accepted</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {project.description?.replace('ამოცანა:', '')}
                            </p>
                        </div>
                    </div>

                    {/* The Strategy */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-400">The Strategy</span>
                            <span className="h-px flex-1 bg-white/20"></span>
                        </div>
                        <div className="relative pl-8 border-l-2 border-purple-500/50">
                            <h3 className="text-2xl font-bold mb-4 text-white">Our Approach</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {project.strategy ? project.strategy.replace('სტრატეგია:', '') : 'Strategy loading...'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* STORIES SECTION (Vertical Images) */}
                {storyImages.length > 0 && (
                    <div className="space-y-12">
                        <div className="text-center mb-16">
                            <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 font-heading">
                                VISUAL HIGHLIGHTS
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {storyImages.map((img, idx) => {
                                const isLocal = img.startsWith('blob:') || img.startsWith('data:') || img.startsWith('/uploads/');
                                return (
                                    <div key={idx} className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl skew-y-0 hover:-skew-y-1 transition-all duration-500">
                                        {isLocal ? (
                                            <img src={img} alt={`Story ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <Image src={img} alt={`Story ${idx + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Highlight 0{idx + 1}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}


                {/* TOUR / GALLERY SECTION (Horizontal/Grid) */}
                {galleryImages.length > 0 && (
                    <div className="space-y-12">
                        <div className="flex items-end justify-between border-b border-white/10 pb-6">
                            <h3 className="text-3xl font-bold">Project Gallery</h3>
                            <span className="text-gray-500 text-sm">Explore the details</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {galleryImages.map((img, idx) => {
                                const isLocal = img.startsWith('blob:') || img.startsWith('data:') || img.startsWith('/uploads/');
                                return (
                                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
                                        {isLocal ? (
                                            <img src={img} alt={`Gallery ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                        ) : (
                                            <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* RESULTS SECTION */}
                <div className="bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h4 className="text-blue-400 font-bold uppercase tracking-widest mb-4 text-sm">Impact</h4>
                            <h3 className="text-4xl md:text-5xl font-bold mb-8 font-heading">
                                THE RESULTS
                            </h3>
                            <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                {project.results ? project.results.replace('შედეგები ციფრებში:', '') : ''}
                            </p>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                                    <div className="text-3xl font-bold text-white mb-1">150%</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-wider">Growth</div>
                                </div>
                                <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                                    <div className="text-3xl font-bold text-white mb-1">10k+</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-wider">Engagement</div>
                                </div>
                            </div>
                        </div>

                        {/* Creative Visual/Luggage Concept */}
                        <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black/50">
                            {project.images && project.images[1] ? (
                                project.images[1].startsWith('blob:') || project.images[1].startsWith('data:') || project.images[1].startsWith('/uploads/') ? (
                                    <img src={project.images[1]} alt="Result Visual" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-lighten" />
                                ) : (
                                    <Image src={project.images[1]} alt="Result Visual" fill className="object-cover opacity-80 mix-blend-lighten" />
                                )
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-700">Visual</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <h5 className="text-2xl font-bold text-white mb-2">Discover New Horizons</h5>
                                <p className="text-sm text-gray-400">Where strategy meets creativity.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RESULTS CTA */}
                <ResultsCTA />

            </Container>
        </div>
    );
}
