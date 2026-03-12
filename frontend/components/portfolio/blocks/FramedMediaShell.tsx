'use client';

import { cn } from "@/lib/utils";

interface FramedMediaShellProps {
    className?: string;
    mediaClassName?: string;
    children: React.ReactNode;
}

export function FramedMediaShell({ className, mediaClassName, children }: FramedMediaShellProps) {
    return (
        <div
            className={cn(
                "relative h-full rounded-[1.75rem] bg-[#2b313b] p-[6px] border border-[#3b4350]",
                "shadow-[0_1px_0_rgba(255,255,255,0.06),0_14px_30px_rgba(0,0,0,0.5)]",
                className
            )}
        >
            <div className="pointer-events-none absolute inset-[2px] rounded-[1.58rem] border border-white/[0.08]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[1.66rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />

            <div className={cn("relative h-full overflow-hidden rounded-[1.35rem] border border-black/45 bg-[#171b22]", mediaClassName)}>
                {children}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/[0.12]" />
            </div>
        </div>
    );
}
