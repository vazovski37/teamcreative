'use client';

import { ContentBlock } from '@/constants/portfolios';
import { LocalizedText } from '@/lib/content-helpers';
import { LocalizedInput, SimpleInput, SelectInput } from './LocalizedInput';
import { MediaUploadInput } from './MediaUploadInput';

// ─── Type helpers ────────────────────────────────────────────────
type BlockOfType<T extends ContentBlock['type']> = Extract<ContentBlock, { type: T }>;

// ─── Shared wrapper ──────────────────────────────────────────────
function BlockSection({ children }: { children: React.ReactNode }) {
    return <div className="space-y-3">{children}</div>;
}

function DynamicListControls({ onAdd, addLabel }: { onAdd: () => void; addLabel: string }) {
    return (
        <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-1"
        >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {addLabel}
        </button>
    );
}

function DynamicItemWrapper({ index, onRemove, children }: { index: number; onRemove: () => void; children: React.ReactNode }) {
    return (
        <div className="relative p-3 rounded-lg border border-white/5 bg-white/[0.02] space-y-2">
            <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-gray-600 uppercase">Item {index + 1}</span>
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-red-500/60 hover:text-red-400 transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {children}
        </div>
    );
}

// ─── Hero Block ──────────────────────────────────────────────────
export function HeroBlockForm({ block, onChange }: { block: BlockOfType<'hero'>; onChange: (b: BlockOfType<'hero'>) => void }) {
    return (
        <BlockSection>
            <MediaUploadInput label="Media" value={block.media || ''} onChange={(v) => onChange({ ...block, media: v })} />
            <SelectInput label="Media Type" value={block.mediaType || 'image'} onChange={(v) => onChange({ ...block, mediaType: v as 'video' | 'image' })} options={[{ value: 'image', label: 'Image' }, { value: 'video', label: 'Video' }]} />
            <LocalizedInput label="Title" value={block.title || ''} onChange={(v) => onChange({ ...block, title: v as string | LocalizedText })} />
            <LocalizedInput label="Subtitle" value={block.subtitle || ''} onChange={(v) => onChange({ ...block, subtitle: v as string | LocalizedText })} />
            <LocalizedInput label="Badge" value={block.badge || ''} onChange={(v) => onChange({ ...block, badge: v as string | LocalizedText })} />
            <SelectInput label="Align" value={block.align || 'center'} onChange={(v) => onChange({ ...block, align: v as 'left' | 'center' })} options={[{ value: 'center', label: 'Center' }, { value: 'left', label: 'Left' }]} />
        </BlockSection>
    );
}

// ─── Text Highlight Block ────────────────────────────────────────
export function TextHighlightForm({ block, onChange }: { block: BlockOfType<'text-highlight'>; onChange: (b: BlockOfType<'text-highlight'>) => void }) {
    return (
        <BlockSection>
            <LocalizedInput label="Text" value={block.text} onChange={(v) => onChange({ ...block, text: v as string | LocalizedText })} variant="textarea" required />
            <LocalizedInput label="Label" value={block.label || ''} onChange={(v) => onChange({ ...block, label: v as string | LocalizedText })} />
            <SelectInput label="Align" value={block.align || 'center'} onChange={(v) => onChange({ ...block, align: v as 'left' | 'center' })} options={[{ value: 'center', label: 'Center' }, { value: 'left', label: 'Left' }]} />
        </BlockSection>
    );
}

// ─── Info Card Block ─────────────────────────────────────────────
export function InfoCardForm({ block, onChange }: { block: BlockOfType<'info-card'>; onChange: (b: BlockOfType<'info-card'>) => void }) {
    const details = block.details || [];

    const updateDetail = (idx: number, field: 'label' | 'value', val: string | LocalizedText) => {
        const newDetails = [...details];
        newDetails[idx] = { ...newDetails[idx], [field]: val };
        onChange({ ...block, details: newDetails });
    };

    const addDetail = () => {
        onChange({ ...block, details: [...details, { label: '', value: '' }] });
    };

    const removeDetail = (idx: number) => {
        onChange({ ...block, details: details.filter((_, i) => i !== idx) });
    };

    return (
        <BlockSection>
            <MediaUploadInput label="Media" value={block.media} onChange={(v) => onChange({ ...block, media: v })} required />
            <SelectInput label="Media Type" value={block.mediaType} onChange={(v) => onChange({ ...block, mediaType: v as 'video' | 'image' })} options={[{ value: 'image', label: 'Image' }, { value: 'video', label: 'Video' }]} />
            <LocalizedInput label="Title" value={block.title || ''} onChange={(v) => onChange({ ...block, title: v as string | LocalizedText })} />
            <SelectInput label="Theme" value={block.theme || 'paper'} onChange={(v) => onChange({ ...block, theme: v as 'paper' | 'dark' | 'glass' })} options={[{ value: 'paper', label: 'Paper' }, { value: 'dark', label: 'Dark' }, { value: 'glass', label: 'Glass' }]} />
            <SelectInput label="Align" value={block.align || 'left'} onChange={(v) => onChange({ ...block, align: v as 'left' | 'right' })} options={[{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }]} />

            <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Details</label>
                {details.map((detail, idx) => (
                    <DynamicItemWrapper key={idx} index={idx} onRemove={() => removeDetail(idx)}>
                        <LocalizedInput label="Label" value={detail.label} onChange={(v) => updateDetail(idx, 'label', v as string | LocalizedText)} />
                        <LocalizedInput label="Value" value={detail.value} onChange={(v) => updateDetail(idx, 'value', v as string | LocalizedText)} />
                    </DynamicItemWrapper>
                ))}
                <DynamicListControls onAdd={addDetail} addLabel="Add Detail" />
            </div>
        </BlockSection>
    );
}

// ─── Reel Grid Block ─────────────────────────────────────────────
export function ReelGridForm({ block, onChange }: { block: BlockOfType<'reel-grid'>; onChange: (b: BlockOfType<'reel-grid'>) => void }) {
    const items = block.items || [];

    const updateItem = (idx: number, field: string, val: string | LocalizedText) => {
        const newItems = [...items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        onChange({ ...block, items: newItems });
    };

    const addItem = () => {
        onChange({ ...block, items: [...items, { media: '', mediaType: 'image' as const }] });
    };

    const removeItem = (idx: number) => {
        onChange({ ...block, items: items.filter((_, i) => i !== idx) });
    };

    return (
        <BlockSection>
            <SelectInput
                label="Mobile Layout"
                value={block.mobileLayout || 'swipe'}
                onChange={(v) => onChange({ ...block, mobileLayout: v as 'swipe' | 'column' })}
                options={[{ value: 'swipe', label: 'Swipe' }, { value: 'column', label: 'Column' }]}
            />

            <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Items</label>
                {items.map((item, idx) => (
                    <DynamicItemWrapper key={idx} index={idx} onRemove={() => removeItem(idx)}>
                        <MediaUploadInput label="Media" value={item.media} onChange={(v) => updateItem(idx, 'media', v)} />
                        <SelectInput label="Media Type" value={item.mediaType} onChange={(v) => updateItem(idx, 'mediaType', v)} options={[{ value: 'image', label: 'Image' }, { value: 'video', label: 'Video' }]} />
                        <LocalizedInput label="Caption" value={item.caption || ''} onChange={(v) => updateItem(idx, 'caption', v as string | LocalizedText)} />
                    </DynamicItemWrapper>
                ))}
                <DynamicListControls onAdd={addItem} addLabel="Add Reel Item" />
            </div>
        </BlockSection>
    );
}

// ─── Media Grid Block ────────────────────────────────────────────
export function MediaGridForm({ block, onChange }: { block: BlockOfType<'media-grid'>; onChange: (b: BlockOfType<'media-grid'>) => void }) {
    const items = block.items || [];

    const updateItem = (idx: number, field: string, val: string) => {
        const newItems = [...items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        onChange({ ...block, items: newItems });
    };

    const addItem = () => {
        onChange({ ...block, items: [...items, { media: '', mediaType: 'image' as const, size: 'sq' as const }] });
    };

    const removeItem = (idx: number) => {
        onChange({ ...block, items: items.filter((_, i) => i !== idx) });
    };

    return (
        <BlockSection>
            <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Items</label>
                {items.map((item, idx) => (
                    <DynamicItemWrapper key={idx} index={idx} onRemove={() => removeItem(idx)}>
                        <MediaUploadInput label="Media" value={item.media} onChange={(v) => updateItem(idx, 'media', v)} />
                        <SelectInput label="Media Type" value={item.mediaType} onChange={(v) => updateItem(idx, 'mediaType', v)} options={[{ value: 'image', label: 'Image' }, { value: 'video', label: 'Video' }]} />
                        <SelectInput label="Size" value={item.size || 'sq'} onChange={(v) => updateItem(idx, 'size', v)} options={[{ value: 'sq', label: 'Square' }, { value: 'wide', label: 'Wide' }]} />
                    </DynamicItemWrapper>
                ))}
                <DynamicListControls onAdd={addItem} addLabel="Add Media Item" />
            </div>
        </BlockSection>
    );
}

// ─── Vertical Showcase Block ─────────────────────────────────────
export function VerticalShowcaseForm({ block, onChange }: { block: BlockOfType<'vertical-showcase'>; onChange: (b: BlockOfType<'vertical-showcase'>) => void }) {
    return (
        <BlockSection>
            <MediaUploadInput label="Media" value={block.media} onChange={(v) => onChange({ ...block, media: v })} required />
            <SelectInput label="Media Type" value={block.mediaType} onChange={(v) => onChange({ ...block, mediaType: v as 'video' | 'image' })} options={[{ value: 'image', label: 'Image' }, { value: 'video', label: 'Video' }]} />
            <LocalizedInput label="Title" value={block.title || ''} onChange={(v) => onChange({ ...block, title: v as string | LocalizedText })} />
            <LocalizedInput label="Overlay Text" value={block.overlayText || ''} onChange={(v) => onChange({ ...block, overlayText: v as string | LocalizedText })} />
        </BlockSection>
    );
}

// ─── Results Block ───────────────────────────────────────────────
export function ResultsForm({ block, onChange }: { block: BlockOfType<'results'>; onChange: (b: BlockOfType<'results'>) => void }) {
    const stats = block.stats || [];

    const updateStat = (idx: number, field: 'label' | 'value', val: string | LocalizedText) => {
        const newStats = [...stats];
        newStats[idx] = { ...newStats[idx], [field]: val };
        onChange({ ...block, stats: newStats });
    };

    const addStat = () => {
        onChange({ ...block, stats: [...stats, { label: '', value: '' }] });
    };

    const removeStat = (idx: number) => {
        onChange({ ...block, stats: stats.filter((_, i) => i !== idx) });
    };

    return (
        <BlockSection>
            <LocalizedInput label="Title" value={block.title} onChange={(v) => onChange({ ...block, title: v as string | LocalizedText })} required />
            <LocalizedInput label="Description" value={block.description} onChange={(v) => onChange({ ...block, description: v as string | LocalizedText })} variant="textarea" required />

            <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Stats</label>
                {stats.map((stat, idx) => (
                    <DynamicItemWrapper key={idx} index={idx} onRemove={() => removeStat(idx)}>
                        <LocalizedInput label="Label" value={stat.label} onChange={(v) => updateStat(idx, 'label', v as string | LocalizedText)} />
                        <LocalizedInput label="Value" value={stat.value} onChange={(v) => updateStat(idx, 'value', v as string | LocalizedText)} />
                    </DynamicItemWrapper>
                ))}
                <DynamicListControls onAdd={addStat} addLabel="Add Stat" />
            </div>
        </BlockSection>
    );
}

// ─── Legacy Columns Block ────────────────────────────────────────
export function LegacyColumnsForm({ block, onChange }: { block: BlockOfType<'legacy-columns'>; onChange: (b: BlockOfType<'legacy-columns'>) => void }) {
    return (
        <BlockSection>
            <div className="space-y-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                <span className="text-[10px] font-medium text-gray-600 uppercase">Left Column</span>
                <LocalizedInput label="Label" value={block.left.label || ''} onChange={(v) => onChange({ ...block, left: { ...block.left, label: v as string | LocalizedText } })} />
                <LocalizedInput label="Title" value={block.left.title} onChange={(v) => onChange({ ...block, left: { ...block.left, title: v as string | LocalizedText } })} required />
                <LocalizedInput label="Text" value={block.left.text} onChange={(v) => onChange({ ...block, left: { ...block.left, text: v as string | LocalizedText } })} variant="textarea" required />
            </div>
            <div className="space-y-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                <span className="text-[10px] font-medium text-gray-600 uppercase">Right Column</span>
                <LocalizedInput label="Label" value={block.right.label || ''} onChange={(v) => onChange({ ...block, right: { ...block.right, label: v as string | LocalizedText } })} />
                <LocalizedInput label="Title" value={block.right.title} onChange={(v) => onChange({ ...block, right: { ...block.right, title: v as string | LocalizedText } })} required />
                <LocalizedInput label="Text" value={block.right.text} onChange={(v) => onChange({ ...block, right: { ...block.right, text: v as string | LocalizedText } })} variant="textarea" required />
            </div>
        </BlockSection>
    );
}

// ─── Block Editor Router ─────────────────────────────────────────
export function BlockEditor({ block, onChange }: { block: ContentBlock; onChange: (b: ContentBlock) => void }) {
    switch (block.type) {
        case 'hero':
            return <HeroBlockForm block={block} onChange={onChange} />;
        case 'text-highlight':
            return <TextHighlightForm block={block} onChange={onChange} />;
        case 'info-card':
            return <InfoCardForm block={block} onChange={onChange} />;
        case 'reel-grid':
            return <ReelGridForm block={block} onChange={onChange} />;
        case 'media-grid':
            return <MediaGridForm block={block} onChange={onChange} />;
        case 'vertical-showcase':
            return <VerticalShowcaseForm block={block} onChange={onChange} />;
        case 'results':
            return <ResultsForm block={block} onChange={onChange} />;
        case 'legacy-columns':
            return <LegacyColumnsForm block={block} onChange={onChange} />;
        default:
            return <p className="text-gray-500 text-sm">Unknown block type</p>;
    }
}
