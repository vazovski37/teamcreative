"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectGridCardProps {
    title: string;
    category: string;
    image: string;
}

export function ProjectGridCard({ title, category, image }: ProjectGridCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative aspect-square overflow-hidden rounded-[25px] cursor-pointer"
        >
            {/* Placeholder Image */}
            <div className={`h-full w-full ${image} bg-cover bg-center transition-transform duration-500 group-hover:scale-110`} />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                <div>
                    <p className="text-sm font-medium text-blue-400 mb-1">{category}</p>
                    <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
                </div>
                <div className="rounded-full bg-white/20 p-2 backdrop-blur-md opacity-0 transform translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                    <ArrowUpRight className="text-white" />
                </div>
            </div>
        </motion.div>
    );
}
