import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    // You should probably add a secret token check here if this routes gets public.
    const path = request.nextUrl.searchParams.get('path');
    if (path) {
        revalidatePath(path);
        return NextResponse.json({ revalidated: true, now: Date.now() });
    }
    return NextResponse.json({ revalidated: false, message: 'Missing path to revalidate' }, { status: 400 });
}
