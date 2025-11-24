import { NextRequest, NextResponse } from 'next/server';
import rawg from '@/app/lib/rawg';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q')?.trim() ?? '';
    if (!query) {
        return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }
    if (query.length > 200) {
        return NextResponse.json({ error: 'Search query is too long' }, { status: 400 });
    }

    const page = (() => {
        const p = parseInt(searchParams.get('page') ?? '1', 10);
        return Number.isNaN(p) || p < 1 ? 1 : p;
    })();

    const pageSize = (() => {
        const s = parseInt(searchParams.get('page_size') ?? '20', 10);
        const normalized = Number.isNaN(s) ? 20 : s;
        return Math.max(1, Math.min(normalized, 40)); // clamp between 1 and RAWG max 40
    })();

    const exactParam = searchParams.get('exact');
    const searchExact = exactParam === '1' || exactParam === 'true';

    try {
        const response = await rawg.get('/games', {
            params: {
                search: query,
                page,
                page_size: pageSize,
                ordering: '-rating,-added',
                ...(searchExact ? { search_exact: true } : {}),
            },
        });

        const data = response?.data;
        if (!data || !Array.isArray(data.results)) {
            console.error('RAWG: unexpected response shape', { status: response?.status, data });
            return NextResponse.json(
                { error: 'Unexpected response from RAWG' },
                { status: 502 }
            );
        }

        return NextResponse.json({
            results: data.results,
            count: data.count ?? null,
            next: data.next ?? null,
            previous: data.previous ?? null,
        });
    } catch (err: unknown) {
        const error: any = err;
        console.error('RAWG API Error:', {
            message: error?.message,
            code: error?.code,
            status: error?.response?.status,
            data: error?.response?.data,
        });

        if (error?.code === 'ECONNABORTED') {
            return NextResponse.json({ error: 'Request timeout – RAWG is slow right now' }, { status: 504 });
        }

        if (error?.response?.status === 401) {
            return NextResponse.json({ error: 'Upstream authentication failure (RAWG API key)' }, { status: 502 });
        }

        if (error?.response?.status === 429) {
            return NextResponse.json({ error: 'Too many requests – please wait a moment' }, { status: 429 });
        }

        // If RAWG returned a specific status, surface it when reasonable
        if (typeof error?.response?.status === 'number') {
            return NextResponse.json(
                { error: error?.response?.data?.detail ?? 'Upstream service error' },
                { status: Math.max(500, error.response.status) }
            );
        }

        return NextResponse.json({ error: 'Failed to fetch games. Try again later.' }, { status: 502 });
    }
}