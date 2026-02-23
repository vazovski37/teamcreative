'use client';

import { useState } from 'react';
import { LocalizedText } from '@/lib/content-helpers';

interface LocalizedInputProps {
    label: string;
    value: string | LocalizedText;
    onChange: (value: string | LocalizedText) => void;
    variant?: 'input' | 'textarea';
    placeholder?: string;
    required?: boolean;
}

export function LocalizedInput({ label, value, onChange, variant = 'input', placeholder, required }: LocalizedInputProps) {
    const [tab, setTab] = useState<'en' | 'ge'>('en');
    const [isLocalized, setIsLocalized] = useState(typeof value === 'object' && value !== null);

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
        setIsLocalized(!isLocalized);
    };

    const inputClasses = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors';

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
                    {variant === 'textarea' ? (
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
                    )}
                </div>
            ) : (
                <>
                    {variant === 'textarea' ? (
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
