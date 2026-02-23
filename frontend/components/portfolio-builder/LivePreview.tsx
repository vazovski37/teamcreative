'use client';

import { ContentBlock } from '@/constants/portfolios';
import { HeroBlock } from '@/components/portfolio/blocks/HeroBlock';
import { TextBlock } from '@/components/portfolio/blocks/TextBlock';
import { InfoCardBlock } from '@/components/portfolio/blocks/InfoCardBlock';
import { ReelGridBlock } from '@/components/portfolio/blocks/ReelGridBlock';
import { MediaGridBlock } from '@/components/portfolio/blocks/MediaGridBlock';
import { VerticalShowcaseBlock } from '@/components/portfolio/blocks/VerticalShowcaseBlock';
import { ResultsBlock } from '@/components/portfolio/blocks/ResultsBlock';
import { LegacyColumnsBlock } from '@/components/portfolio/blocks/LegacyColumnsBlock';

interface LivePreviewProps {
    blocks: ContentBlock[];
    title: string;
    category: string;
    client: string;
}

export function LivePreview({ blocks, title, category, client }: LivePreviewProps) {
    if (blocks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">No Preview Available</h3>
                <p className="text-xs text-gray-600 max-w-xs">
                    Add content blocks using the editor to see a live preview of your portfolio page here.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-full bg-black text-white">
            {/* Mini header showing project info */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5 px-4 py-2">
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span className="text-blue-400 font-medium">{category || 'Category'}</span>
                    <span>/</span>
                    <span>{client || 'Client'}</span>
                    <span>/</span>
                    <span className="text-white/60">{title || 'Project'}</span>
                </div>
            </div>

            {/* Render actual block components */}
            {blocks.map((block, idx) => {
                switch (block.type) {
                    case 'hero':
                        return <HeroBlock key={`${block.type}-${idx}`} {...block} />;
                    case 'text-highlight':
                        return <TextBlock key={`${block.type}-${idx}`} text={block.text} label={block.label} align={block.align} />;
                    case 'legacy-columns':
                        return <LegacyColumnsBlock key={`${block.type}-${idx}`} {...block} />;
                    case 'info-card':
                        return <InfoCardBlock key={`${block.type}-${idx}`} {...block} />;
                    case 'reel-grid':
                        return <ReelGridBlock key={`${block.type}-${idx}`} {...block} />;
                    case 'media-grid':
                        return <MediaGridBlock key={`${block.type}-${idx}`} {...block} />;
                    case 'vertical-showcase':
                        return <VerticalShowcaseBlock key={`${block.type}-${idx}`} {...block} />;
                    case 'results':
                        return <ResultsBlock key={`${block.type}-${idx}`} {...block} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}
