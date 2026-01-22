"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCategoryCardProps {
    title: string;
    count: number;
    slug: string;
    color: string;
}

export function ProjectCategoryCard({ title, count, slug, color }: ProjectCategoryCardProps) {
    return (
        <Link href={`/portfolios/${slug}`}>
            <motion.div
                whileHover={{ y: -10 }}
                className={cn(
                    "group relative h-[300px] cursor-pointer overflow-hidden rounded-[30px] p-8 transition-colors",
                    color
                )}
            >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                <div className="relative z-10 flex h-full flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                        <span className="rounded-full border border-white/30 px-3 py-1 text-xs backdrop-blur-md">
                            {count} Projects
                        </span>
                        <div className="rounded-full bg-white/10 p-2 backdrop-blur-md transition-transform group-hover:rotate-45">
                            <ArrowUpRight strokeWidth={1.5} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h3>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
