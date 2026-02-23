'use client';

import { useState } from 'react';
import { ContentBlock, Project } from '@/constants/portfolios';
import { Container } from '@/components/ui/Container';
import { BlockEditor } from '@/components/portfolio-builder/BlockEditorForms';
import { JsonPreview } from '@/components/portfolio-builder/JsonPreview';
import { LivePreview } from '@/components/portfolio-builder/LivePreview';
import { SimpleInput, SelectInput } from '@/components/portfolio-builder/LocalizedInput';
import { MediaUploadInput } from '@/components/portfolio-builder/MediaUploadInput';

// ─── Block type config ───────────────────────────────────────────
const BLOCK_TYPES: { type: ContentBlock['type']; label: string; color: string; icon: string }[] = [
    { type: 'hero', label: 'Hero', color: 'bg-blue-500', icon: '🖼️' },
    { type: 'text-highlight', label: 'Text Highlight', color: 'bg-emerald-500', icon: '✏️' },
    { type: 'info-card', label: 'Info Card', color: 'bg-purple-500', icon: '📋' },
    { type: 'reel-grid', label: 'Reel Grid', color: 'bg-pink-500', icon: '🎬' },
    { type: 'media-grid', label: 'Media Grid', color: 'bg-amber-500', icon: '🖼️' },
    { type: 'vertical-showcase', label: 'Vertical Showcase', color: 'bg-cyan-500', icon: '📱' },
    { type: 'results', label: 'Results', color: 'bg-green-500', icon: '📊' },
    { type: 'legacy-columns', label: 'Legacy Columns', color: 'bg-orange-500', icon: '📰' },
];

function createDefaultBlock(type: ContentBlock['type']): ContentBlock {
    switch (type) {
        case 'hero': return { type: 'hero' };
        case 'text-highlight': return { type: 'text-highlight', text: '' };
        case 'info-card': return { type: 'info-card', media: '', mediaType: 'image', details: [] };
        case 'reel-grid': return { type: 'reel-grid', items: [] };
        case 'media-grid': return { type: 'media-grid', items: [] };
        case 'vertical-showcase': return { type: 'vertical-showcase', media: '', mediaType: 'image' };
        case 'results': return { type: 'results', title: '', description: '', stats: [] };
        case 'legacy-columns': return { type: 'legacy-columns', left: { title: '', text: '' }, right: { title: '', text: '' } };
    }
}

const CATEGORY_OPTIONS = [
    { value: 'social-media', label: 'Social Media' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'branding', label: 'Branding' },
    { value: 'seo', label: 'SEO' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'showcase', label: 'Showcase' },
];

const CATEGORY_DISPLAY: Record<string, string> = {
    'social-media': 'Social Media',
    'web-development': 'Web Development',
    'ui-ux': 'UI/UX Design',
    'branding': 'Branding',
    'seo': 'SEO',
    'graphic-design': 'Graphic Design',
    'showcase': 'Portfolio',
};

export default function PortfolioBuilderPage() {
    // ─── Project metadata state ──────────────────────────────────
    const [id, setId] = useState('');
    const [slug, setSlug] = useState('');
    const [categorySlug, setCategorySlug] = useState('social-media');
    const [client, setClient] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [strategy, setStrategy] = useState('');
    const [results, setResults] = useState('');

    // ─── SEO metadata state ──────────────────────────────────────
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [ogImage, setOgImage] = useState('');
    const [keywords, setKeywords] = useState('');

    // ─── Content blocks state ────────────────────────────────────
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);
    const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showLegacy, setShowLegacy] = useState(false);

    // ─── Right panel mode ────────────────────────────────────────
    const [rightPanel, setRightPanel] = useState<'preview' | 'json'>('preview');

    // ─── Helpers ─────────────────────────────────────────────────
    const addBlock = (type: ContentBlock['type']) => {
        const newBlock = createDefaultBlock(type);
        setBlocks([...blocks, newBlock]);
        setExpandedBlock(blocks.length);
        setShowAddMenu(false);
    };

    const updateBlock = (idx: number, block: ContentBlock) => {
        const newBlocks = [...blocks];
        newBlocks[idx] = block;
        setBlocks(newBlocks);
    };

    const removeBlock = (idx: number) => {
        setBlocks(blocks.filter((_, i) => i !== idx));
        if (expandedBlock === idx) setExpandedBlock(null);
        else if (expandedBlock !== null && expandedBlock > idx) setExpandedBlock(expandedBlock - 1);
    };

    const moveBlock = (idx: number, direction: 'up' | 'down') => {
        const newIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (newIdx < 0 || newIdx >= blocks.length) return;
        const newBlocks = [...blocks];
        [newBlocks[idx], newBlocks[newIdx]] = [newBlocks[newIdx], newBlocks[idx]];
        setBlocks(newBlocks);
        if (expandedBlock === idx) setExpandedBlock(newIdx);
        else if (expandedBlock === newIdx) setExpandedBlock(idx);
    };

    // ─── Build the Project object ────────────────────────────────
    const project: Project = {
        id: id || 'project-id',
        slug: slug || 'project-slug',
        category: CATEGORY_DISPLAY[categorySlug] || categorySlug,
        categorySlug,
        client: client || 'Client Name',
        title: title || 'Project Title',
        description: description || '',
        ...(coverImage && { coverImage }),
        ...(strategy && { strategy }),
        ...(results && { results }),
        ...(blocks.length > 0 && { content: blocks }),
        ...((metaTitle || metaDescription || ogImage || keywords) && {
            meta: {
                ...(metaTitle && { metaTitle }),
                ...(metaDescription && { metaDescription }),
                ...(ogImage && { ogImage }),
                ...(keywords && { keywords }),
            },
        }),
    };

    const getBlockConfig = (type: ContentBlock['type']) => BLOCK_TYPES.find(b => b.type === type)!;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            {/* Header */}
            <div className="border-b border-white/10 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-50">
                <Container>
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                                P
                            </div>
                            <div>
                                <h1 className="text-sm font-bold">Portfolio Builder</h1>
                                <p className="text-[10px] text-gray-500">Create portfolio entries for developers</p>
                            </div>
                        </div>

                        {/* Right panel toggle */}
                        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
                            <button
                                onClick={() => setRightPanel('preview')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${rightPanel === 'preview'
                                    ? 'bg-blue-500/20 text-blue-400 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview
                            </button>
                            <button
                                onClick={() => setRightPanel('json')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${rightPanel === 'json'
                                    ? 'bg-emerald-500/20 text-emerald-400 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                JSON
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-600">{blocks.length} blocks</span>
                            <div className="w-1 h-1 rounded-full bg-gray-700" />
                            <span className="text-[10px] text-gray-600">
                                {JSON.stringify(project).length.toLocaleString()} chars
                            </span>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Main Content - Two columns */}
            <div className="flex h-[calc(100vh-64px)]">
                {/* LEFT: Form Editor */}
                <div className="w-1/2 border-r border-white/10 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {/* ─── Project Metadata ─────────────────── */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Project Info</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <SimpleInput label="ID" value={id} onChange={setId} placeholder="my-project" required />
                                <SimpleInput label="Slug" value={slug} onChange={setSlug} placeholder="my-project-slug" required />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <SelectInput label="Category" value={categorySlug} onChange={setCategorySlug} options={CATEGORY_OPTIONS} required />
                                <SimpleInput label="Client" value={client} onChange={setClient} placeholder="Client Name" required />
                            </div>

                            <SimpleInput label="Title" value={title} onChange={setTitle} placeholder="Project Title" required />
                            <SimpleInput label="Description" value={description} onChange={setDescription} placeholder="Project description..." variant="textarea" />
                            <MediaUploadInput label="Cover Image" value={coverImage} onChange={setCoverImage} />

                            {/* Legacy fields toggle */}
                            <button
                                type="button"
                                onClick={() => setShowLegacy(!showLegacy)}
                                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors"
                            >
                                <svg className={`w-3 h-3 transition-transform ${showLegacy ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                Legacy Fields (optional)
                            </button>
                            {showLegacy && (
                                <div className="space-y-3 pl-4 border-l border-white/5">
                                    <SimpleInput label="Strategy" value={strategy} onChange={setStrategy} variant="textarea" placeholder="Strategy text..." />
                                    <SimpleInput label="Results" value={results} onChange={setResults} variant="textarea" placeholder="Results text..." />
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-white/10" />

                        {/* ─── SEO Metadata ─────────────────────── */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">SEO Metadata</h2>
                            </div>

                            <SimpleInput
                                label="Meta Title"
                                value={metaTitle}
                                onChange={setMetaTitle}
                                placeholder={`${title || 'Project Title'} – ${client || 'Client'} | TeamCreative`}
                            />
                            <SimpleInput
                                label="Meta Description"
                                value={metaDescription}
                                onChange={setMetaDescription}
                                placeholder="Concise description for search results (150–160 chars)..."
                                variant="textarea"
                            />
                            <MediaUploadInput
                                label="OG Image"
                                value={ogImage}
                                onChange={setOgImage}
                                placeholder="Social sharing image (1200×630 recommended)"
                            />
                            <SimpleInput
                                label="Keywords"
                                value={keywords}
                                onChange={setKeywords}
                                placeholder="comma, separated, keywords"
                            />

                            {metaDescription && (
                                <div className="text-[10px] text-gray-600 flex items-center gap-1.5">
                                    <span className={metaDescription.length > 160 ? 'text-amber-400' : 'text-emerald-400'}>
                                        {metaDescription.length}/160
                                    </span>
                                    {metaDescription.length > 160 ? 'Consider shortening' : 'Good length'}
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-white/10" />

                        {/* ─── Content Blocks ───────────────────── */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Content Blocks</h2>
                                </div>
                                <span className="text-[10px] text-gray-600">{blocks.length} blocks</span>
                            </div>

                            {/* Block list */}
                            {blocks.length === 0 && (
                                <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
                                    <p className="text-sm text-gray-600 mb-1">No content blocks yet</p>
                                    <p className="text-[10px] text-gray-700">Add blocks below to build your portfolio page</p>
                                </div>
                            )}

                            {blocks.map((block, idx) => {
                                const config = getBlockConfig(block.type);
                                const isExpanded = expandedBlock === idx;

                                return (
                                    <div
                                        key={idx}
                                        className={`rounded-xl border transition-colors ${isExpanded
                                            ? 'border-white/20 bg-white/[0.03]'
                                            : 'border-white/5 bg-white/[0.01] hover:border-white/10'
                                            }`}
                                    >
                                        {/* Block header */}
                                        <div
                                            className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                                            onClick={() => setExpandedBlock(isExpanded ? null : idx)}
                                        >
                                            <span className="text-sm">{config.icon}</span>
                                            <div className={`h-1.5 w-1.5 rounded-full ${config.color}`} />
                                            <span className="text-xs font-medium flex-1">{config.label}</span>

                                            {/* Controls */}
                                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => moveBlock(idx, 'up')}
                                                    disabled={idx === 0}
                                                    className="p-1 text-gray-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => moveBlock(idx, 'down')}
                                                    disabled={idx === blocks.length - 1}
                                                    className="p-1 text-gray-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => removeBlock(idx)}
                                                    className="p-1 text-gray-600 hover:text-red-400 transition-colors ml-1"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <svg className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>

                                        {/* Block editor */}
                                        {isExpanded && (
                                            <div className="px-4 pb-4 pt-1 border-t border-white/5">
                                                <BlockEditor block={block} onChange={(b) => updateBlock(idx, b)} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Add block button */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowAddMenu(!showAddMenu)}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 text-gray-500 hover:text-blue-400 transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="text-xs font-medium">Add Block</span>
                                </button>

                                {/* Add block dropdown */}
                                {showAddMenu && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl p-2 z-50 grid grid-cols-2 gap-1">
                                        {BLOCK_TYPES.map((bt) => (
                                            <button
                                                key={bt.type}
                                                onClick={() => addBlock(bt.type)}
                                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group"
                                            >
                                                <span className="text-sm">{bt.icon}</span>
                                                <div>
                                                    <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{bt.label}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Preview / JSON Toggle */}
                <div className="w-1/2 flex flex-col bg-neutral-950 overflow-hidden">
                    {rightPanel === 'preview' ? (
                        <div className="flex-1 overflow-y-auto">
                            <LivePreview
                                blocks={blocks}
                                title={title || 'Project Title'}
                                category={CATEGORY_DISPLAY[categorySlug] || categorySlug}
                                client={client || 'Client Name'}
                            />
                        </div>
                    ) : (
                        <JsonPreview project={project} />
                    )}
                </div>
            </div>
        </div>
    );
}
