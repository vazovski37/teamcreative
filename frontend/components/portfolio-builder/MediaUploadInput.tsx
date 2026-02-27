'use client';

import { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface MediaUploadInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}

export function MediaUploadInput({ label, value, onChange, placeholder, required }: MediaUploadInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            // Generate a unique filename
            const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

            // Upload directly to Supabase
            const { error } = await supabase
                .storage
                .from('portfolio-media')
                .upload(`uploads/${filename}`, file, {
                    contentType: file.type,
                    upsert: false
                });

            if (error) {
                alert('Upload failed: ' + error.message);
                return;
            }

            // Get the public URL
            const { data: publicUrlData } = supabase
                .storage
                .from('portfolio-media')
                .getPublicUrl(`uploads/${filename}`);

            setFileName(file.name);
            onChange(publicUrlData.publicUrl);

        } catch (err: any) {
            console.error(err);
            alert('Upload error: ' + err.message);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleClear = () => {
        if (value.startsWith('blob:')) {
            URL.revokeObjectURL(value);
        }
        setFileName('');
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const isUploaded = value.startsWith('blob:') || value.startsWith('data:') || value.startsWith('/uploads/');
    const inputClasses = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors';

    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {label} {required && <span className="text-red-400">*</span>}
            </label>

            {/* Thumbnail preview */}
            {value && (
                <div className="relative group w-full h-24 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 text-white/60 hover:text-white hover:bg-red-500/80 opacity-0 group-hover:opacity-100 transition-all"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {isUploaded && fileName && (
                        <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-sm px-2 py-1">
                            <span className="text-[10px] text-gray-300 truncate block">{fileName}</span>
                        </div>
                    )}
                </div>
            )}

            {/* URL input + upload button row */}
            <div className="flex gap-1.5">
                <input
                    type="text"
                    value={isUploaded ? (fileName || 'Uploaded file') : value}
                    onChange={(e) => {
                        setFileName('');
                        onChange(e.target.value);
                    }}
                    placeholder={placeholder || '/images/...'}
                    className={`${inputClasses} flex-1 ${isUploaded ? 'text-blue-400' : ''}`}
                    readOnly={isUploaded}
                />
                <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className={`w-3.5 h-3.5 ${isUploading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isUploading ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        )}
                    </svg>
                    <span className="text-xs font-medium">{isUploading ? 'Uploading...' : 'Upload'}</span>
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}
