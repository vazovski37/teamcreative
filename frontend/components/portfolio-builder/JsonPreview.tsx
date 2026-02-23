'use client';

import { useState } from 'react';
import { Project } from '@/constants/portfolios';

interface JsonPreviewProps {
    project: Project;
}

export function JsonPreview({ project }: JsonPreviewProps) {
    const [copied, setCopied] = useState(false);

    const jsonString = JSON.stringify(project, null, 4);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(jsonString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = jsonString;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Simple syntax highlighting
    const highlightJson = (json: string) => {
        return json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Strings
            .replace(/"([^"\\]|\\.)*"/g, (match) => {
                // Check if it's a key (followed by :)
                return `<span class="text-emerald-400">${match}</span>`;
            })
            // Numbers
            .replace(/\b(\d+)\b/g, '<span class="text-amber-400">$1</span>')
            // Booleans & null
            .replace(/\b(true|false|null)\b/g, '<span class="text-purple-400">$1</span>');
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">JSON Output</span>
                </div>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${copied
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    {copied ? (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy JSON
                        </>
                    )}
                </button>
            </div>

            {/* Code */}
            <div className="flex-1 overflow-auto">
                <pre className="p-4 text-xs leading-relaxed font-mono">
                    <code dangerouslySetInnerHTML={{ __html: highlightJson(jsonString) }} />
                </pre>
            </div>

            {/* Footer stats */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-white/[0.02]">
                <span className="text-[10px] text-gray-600">
                    {project.content?.length || 0} blocks · {jsonString.length.toLocaleString()} chars
                </span>
                <span className="text-[10px] text-gray-600">
                    portfolios.ts
                </span>
            </div>
        </div>
    );
}
