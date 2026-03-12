'use client';

import { useEffect, useRef, useState } from 'react';
import { LocalizedText, sanitizeRichTextHtml, toRichTextHtml } from '@/lib/content-helpers';

interface LocalizedInputProps {
    label: string;
    value: string | LocalizedText;
    onChange: (value: string | LocalizedText) => void;
    variant?: 'input' | 'textarea';
    placeholder?: string;
    required?: boolean;
    rich?: boolean;
}

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    singleLine?: boolean;
}

const FONT_SIZE_PRESET: Record<string, string> = {
    "1": "10px",
    "2": "13px",
    "3": "16px",
    "4": "18px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
};

const KEYWORD_FONT_SIZE_MAP: Record<string, string> = {
    "xx-small": "9px",
    "x-small": "10px",
    "small": "13px",
    "medium": "16px",
    "large": "18px",
    "x-large": "24px",
    "xx-large": "32px",
    "xxx-large": "48px",
};

const FONT_OPTIONS = [
    { label: 'Default', value: 'var(--font-firago), sans-serif' },
    { label: 'MSBlock', value: 'var(--font-ms-block), sans-serif' },
    { label: 'Roman', value: 'var(--font-roman), serif' },
];

const FONT_WEIGHT_OPTIONS = [
    { label: '100', value: '100' },
    { label: '200', value: '200' },
    { label: '300', value: '300' },
    { label: '400', value: '400' },
    { label: '500', value: '500' },
    { label: '600', value: '600' },
    { label: '700', value: '700' },
    { label: '800', value: '800' },
    { label: '900', value: '900' },
];

const EMPTY_HTML_REGEX = /^(\s|&nbsp;|<br\s*\/?>|<div><br><\/div>|<p><br><\/p>)+$/i;
const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 200;

function normalizeLegacyFontNodes(root: HTMLElement) {
    const fontNodes = Array.from(root.querySelectorAll('font'));

    fontNodes.forEach((fontNode) => {
        const span = document.createElement('span');
        const face = fontNode.getAttribute('face');
        const size = fontNode.getAttribute('size');
        const color = fontNode.getAttribute('color');

        if (face) span.style.fontFamily = face;
        if (color) span.style.color = color;
        if (size && FONT_SIZE_PRESET[size]) span.style.fontSize = FONT_SIZE_PRESET[size];

        while (fontNode.firstChild) {
            span.appendChild(fontNode.firstChild);
        }

        fontNode.replaceWith(span);
    });

    const sizeSpans = Array.from(root.querySelectorAll('span[style*="font-size"]'));
    sizeSpans.forEach((node) => {
        const htmlNode = node as HTMLElement;
        const currentSize = htmlNode.style.fontSize?.trim().toLowerCase();
        if (currentSize && KEYWORD_FONT_SIZE_MAP[currentSize]) {
            htmlNode.style.fontSize = KEYWORD_FONT_SIZE_MAP[currentSize];
        }
    });
}

function sanitizeForStorage(html: string, singleLine: boolean) {
    let cleaned = sanitizeRichTextHtml(html).replace(/\u200B/g, "");

    if (singleLine) {
        cleaned = cleaned
            .replace(/<\/?(div|p|h[1-6]|ul|ol|li|blockquote|pre)[^>]*>/gi, " ")
            .replace(/<br\s*\/?>/gi, " ")
            .replace(/&nbsp;/gi, " ")
            .replace(/\s+/g, " ")
            .trim();

        return cleaned;
    }

    cleaned = cleaned.trim();
    if (!cleaned || EMPTY_HTML_REGEX.test(cleaned)) return "";
    return cleaned;
}

function RichTextEditor({ value, onChange, placeholder, singleLine = false }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const selectionRef = useRef<Range | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isEmpty, setIsEmpty] = useState(!value);
    const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0].value);
    const [fontWeight, setFontWeight] = useState("400");
    const [fontSize, setFontSize] = useState("24");

    const ensureSelectionInEditor = () => {
        const editor = editorRef.current;
        const selection = window.getSelection();

        if (!editor || !selection) return null;

        let range: Range | null = null;

        if (selection.rangeCount > 0) {
            const currentRange = selection.getRangeAt(0);
            if (editor.contains(currentRange.commonAncestorContainer)) {
                range = currentRange;
            }
        }

        if (!range && selectionRef.current && editor.contains(selectionRef.current.commonAncestorContainer)) {
            range = selectionRef.current.cloneRange();
        }

        if (!range) {
            range = document.createRange();
            range.selectNodeContents(editor);
            range.collapse(false);
        }

        selection.removeAllRanges();
        selection.addRange(range);
        return range;
    };

    const saveSelection = () => {
        const editor = editorRef.current;
        if (!editor) return;

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (editor.contains(range.commonAncestorContainer)) {
            selectionRef.current = range.cloneRange();
        }
    };

    const restoreSelection = () => {
        if (!selectionRef.current) return;
        const selection = window.getSelection();
        if (!selection) return;
        selection.removeAllRanges();
        selection.addRange(selectionRef.current);
    };

    const emitChange = () => {
        const editor = editorRef.current;
        if (!editor) return;

        normalizeLegacyFontNodes(editor);
        const nextValue = sanitizeForStorage(editor.innerHTML, singleLine);
        setIsEmpty(nextValue.length === 0);
        onChange(nextValue);
    };

    const runCommand = (command: string, commandValue?: string) => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.focus();
        const range = ensureSelectionInEditor();
        if (!range) return;
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand(command, false, commandValue);
        normalizeLegacyFontNodes(editor);
        saveSelection();
        emitChange();
    };

    const applyInlineStyle = (
        style: { fontFamily?: string; fontSize?: string; fontWeight?: string },
        scope: 'selection' | 'all' = 'selection'
    ) => {
        const editor = editorRef.current;
        if (!editor) return;
        editor.focus();

        const selection = window.getSelection();
        if (!selection) return;

        if (scope === 'all') {
            const fullRange = document.createRange();
            fullRange.selectNodeContents(editor);
            selection.removeAllRanges();
            selection.addRange(fullRange);
        } else {
            const range = ensureSelectionInEditor();
            if (!range) return;
        }

        const targetRange = selection.getRangeAt(0);
        const styledSpan = document.createElement('span');
        if (style.fontFamily) styledSpan.style.fontFamily = style.fontFamily;
        if (style.fontSize) styledSpan.style.fontSize = style.fontSize;
        if (style.fontWeight) styledSpan.style.fontWeight = style.fontWeight;

        if (targetRange.collapsed) {
            styledSpan.textContent = '\u200B';
            targetRange.insertNode(styledSpan);

            const caretRange = document.createRange();
            caretRange.setStart(styledSpan.firstChild as Text, 1);
            caretRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(caretRange);
        } else {
            const fragment = targetRange.extractContents();
            styledSpan.appendChild(fragment);
            targetRange.insertNode(styledSpan);

            const styledRange = document.createRange();
            styledRange.selectNodeContents(styledSpan);
            selection.removeAllRanges();
            selection.addRange(styledRange);
        }

        normalizeLegacyFontNodes(editor);
        saveSelection();
        emitChange();
    };

    const applyFontFamily = (nextFontFamily: string) => {
        setFontFamily(nextFontFamily);
        applyInlineStyle({ fontFamily: nextFontFamily });
    };

    const applyFontWeight = (nextFontWeight: string) => {
        setFontWeight(nextFontWeight);
        applyInlineStyle({ fontWeight: nextFontWeight });
    };

    const applyFontSize = (scope: 'selection' | 'all' = 'selection') => {
        const parsed = Number(fontSize);
        if (!Number.isFinite(parsed)) return;

        const clamped = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.round(parsed)));
        setFontSize(String(clamped));
        applyInlineStyle({ fontSize: `${clamped}px` }, scope);
    };

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const htmlValue = toRichTextHtml(value);
        if (editor.innerHTML !== htmlValue) {
            editor.innerHTML = htmlValue;
        }

        setIsEmpty(sanitizeForStorage(htmlValue, singleLine).length === 0);
    }, [value, singleLine]);

    const editorClasses = [
        'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm',
        'focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/30 transition-colors',
        'outline-none',
        singleLine ? 'min-h-[42px] whitespace-nowrap overflow-x-auto overflow-y-hidden' : 'min-h-[96px] whitespace-pre-wrap',
    ].join(' ');

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-2">
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => runCommand('bold')}
                    className="h-7 min-w-7 px-2 rounded bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors"
                    title="Bold"
                >
                    B
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => runCommand('italic')}
                    className="h-7 min-w-7 px-2 rounded bg-white/5 hover:bg-white/10 text-white text-xs italic transition-colors"
                    title="Italic"
                >
                    I
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => runCommand('underline')}
                    className="h-7 min-w-7 px-2 rounded bg-white/5 hover:bg-white/10 text-white text-xs underline transition-colors"
                    title="Underline"
                >
                    U
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => runCommand('removeFormat')}
                    className="h-7 px-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] uppercase tracking-wide transition-colors"
                    title="Clear formatting"
                >
                    Clear
                </button>

                <div className="h-5 w-px bg-white/10 mx-0.5" />

                <select
                    value={fontFamily}
                    onChange={(e) => {
                        applyFontFamily(e.target.value);
                    }}
                    className="h-7 bg-black/50 border border-white/10 rounded px-2 text-[11px] text-white focus:outline-none focus:border-blue-500/50"
                    title="Font family"
                >
                    {FONT_OPTIONS.map((option) => (
                        <option key={option.label} value={option.value} className="bg-neutral-900 text-white">
                            {option.label}
                        </option>
                    ))}
                </select>

                <select
                    value={fontWeight}
                    onChange={(e) => applyFontWeight(e.target.value)}
                    className="h-7 w-18 bg-black/50 border border-white/10 rounded px-2 text-[11px] text-white focus:outline-none focus:border-blue-500/50"
                    title="Font weight"
                >
                    {FONT_WEIGHT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value} className="bg-neutral-900 text-white">
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="flex items-center gap-1">
                    <input
                        type="number"
                        min={MIN_FONT_SIZE}
                        max={MAX_FONT_SIZE}
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                applyFontSize();
                            }
                        }}
                        className="h-7 w-16 bg-black/50 border border-white/10 rounded px-2 text-[11px] text-white focus:outline-none focus:border-blue-500/50"
                        title="Font size in pixels"
                    />
                    <span className="text-[10px] text-gray-500">px</span>
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => applyFontSize('selection')}
                        className="h-7 px-2 rounded bg-white/5 hover:bg-white/10 text-gray-200 text-[10px] uppercase tracking-wide transition-colors"
                        title="Apply size to selected text"
                    >
                        Apply
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => applyFontSize('all')}
                        className="h-7 px-2 rounded bg-white/5 hover:bg-white/10 text-gray-200 text-[10px] uppercase tracking-wide transition-colors"
                        title="Apply size to all text in this field"
                    >
                        All
                    </button>
                </div>
            </div>

            <div className="relative">
                {isEmpty && !isFocused && (
                    <span
                        className={`pointer-events-none absolute left-3 text-sm text-white/30 ${singleLine ? 'top-1/2 -translate-y-1/2' : 'top-2'}`}
                    >
                        {placeholder}
                    </span>
                )}
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    className={editorClasses}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        saveSelection();
                        emitChange();
                    }}
                    onInput={() => {
                        saveSelection();
                        emitChange();
                    }}
                    onKeyUp={saveSelection}
                    onMouseUp={saveSelection}
                    onPaste={(e) => {
                        e.preventDefault();
                        const text = e.clipboardData.getData('text/plain');
                        document.execCommand('insertText', false, text);
                    }}
                    onKeyDown={(e) => {
                        if (singleLine && e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                />
            </div>
        </div>
    );
}

export function LocalizedInput({ label, value, onChange, variant = 'input', placeholder, required, rich = true }: LocalizedInputProps) {
    const [tab, setTab] = useState<'en' | 'ge'>('en');
    const isLocalized = typeof value === 'object' && value !== null;

    const getStringValue = () => {
        if (typeof value === 'string') return value;
        return value?.en || '';
    };

    const getLocalizedValue = (lang: 'en' | 'ge') => {
        if (typeof value === 'object' && value !== null) return value[lang] || '';
        if (lang === 'en') return (value as string) || '';
        return '';
    };

    const handleStringChange = (v: string) => {
        onChange(v);
    };

    const handleLocalizedChange = (lang: 'en' | 'ge', v: string) => {
        const current = typeof value === 'object' && value !== null ? value : { en: (value as string) || '', ge: '' };
        onChange({ ...current, [lang]: v });
    };

    const toggleLocalized = () => {
        if (isLocalized) {
            onChange(getLocalizedValue('en'));
        } else {
            onChange({ en: getStringValue(), ge: '' });
        }
    };

    const inputClasses = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors';

    useEffect(() => {
        if (!isLocalized && tab !== 'en') {
            setTab('en');
        }
    }, [isLocalized, tab]);

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {label} {required && <span className="text-red-400">*</span>}
                </label>
                <button
                    type="button"
                    onClick={toggleLocalized}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors"
                >
                    {isLocalized ? 'EN/GE' : 'Simple'}
                </button>
            </div>

            {isLocalized ? (
                <div className="space-y-1.5">
                    <div className="flex gap-1">
                        {(['en', 'ge'] as const).map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setTab(lang)}
                                className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md transition-colors ${tab === lang
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'text-gray-600 hover:text-gray-400'
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                    {rich ? (
                        <RichTextEditor
                            value={getLocalizedValue(tab)}
                            onChange={(next) => handleLocalizedChange(tab, next)}
                            placeholder={`${placeholder || label} (${tab.toUpperCase()})`}
                            singleLine={variant !== 'textarea'}
                        />
                    ) : (
                        variant === 'textarea' ? (
                            <textarea
                                value={getLocalizedValue(tab)}
                                onChange={(e) => handleLocalizedChange(tab, e.target.value)}
                                placeholder={`${placeholder || label} (${tab.toUpperCase()})`}
                                className={`${inputClasses} min-h-[80px] resize-y`}
                            />
                        ) : (
                            <input
                                type="text"
                                value={getLocalizedValue(tab)}
                                onChange={(e) => handleLocalizedChange(tab, e.target.value)}
                                placeholder={`${placeholder || label} (${tab.toUpperCase()})`}
                                className={inputClasses}
                            />
                        )
                    )}
                </div>
            ) : (
                <>
                    {rich ? (
                        <RichTextEditor
                            value={getStringValue()}
                            onChange={handleStringChange}
                            placeholder={placeholder || label}
                            singleLine={variant !== 'textarea'}
                        />
                    ) : (
                        variant === 'textarea' ? (
                            <textarea
                                value={getStringValue()}
                                onChange={(e) => handleStringChange(e.target.value)}
                                placeholder={placeholder || label}
                                className={`${inputClasses} min-h-[80px] resize-y`}
                            />
                        ) : (
                            <input
                                type="text"
                                value={getStringValue()}
                                onChange={(e) => handleStringChange(e.target.value)}
                                placeholder={placeholder || label}
                                className={inputClasses}
                            />
                        )
                    )}
                </>
            )}
        </div>
    );
}

// Simple non-localized input for metadata fields
interface SimpleInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    variant?: 'input' | 'textarea';
}

export function SimpleInput({ label, value, onChange, placeholder, required, variant = 'input' }: SimpleInputProps) {
    const inputClasses = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors';

    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            {variant === 'textarea' ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder || label}
                    className={`${inputClasses} min-h-[80px] resize-y`}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder || label}
                    className={inputClasses}
                />
            )}
        </div>
    );
}

// Select component
interface SelectInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    required?: boolean;
}

export function SelectInput({ label, value, onChange, options, required }: SelectInputProps) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-neutral-900">
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
