import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate a unique filename
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        // Upload to Supabase Storage bucket named 'portfolio-media'
        const { error } = await supabase
            .storage
            .from('portfolio-media')
            .upload(`uploads/${filename}`, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        // Get the public URL
        const { data: publicUrlData } = supabase
            .storage
            .from('portfolio-media')
            .getPublicUrl(`uploads/${filename}`);

        // The builder UI expects { success: true, url: string }
        return NextResponse.json({ success: true, url: publicUrlData.publicUrl });

    } catch (error: any) {
        console.error('Upload handler error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
