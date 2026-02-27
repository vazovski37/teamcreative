
"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/constants/portfolios";

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/portfolios/${project.categorySlug}/${project.slug}`} className="group block h-full">
            <div className="relative rounded-[2rem] bg-[#111] p-3 border border-white/5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/20 group-hover:border-blue-500/30">
                {/* Image Container - Vertical Aspect Ratio to mimic Social Media Posts */}
                <div className="aspect-[4/5] relative w-full overflow-hidden rounded-[1.5rem]">
                    {project.coverImage || (project.images && project.images[0]) ? (
                        <Image
                            src={project.coverImage || (project.images ? project.images[0] : '')}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-600">
                            No Image
                        </div>
                    )}

                    {/* Overlay Gradient for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {project.client}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                            {project.title}
                        </h3>
                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                            <p className="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                {project.description.replace('ამოცანა:', '')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
