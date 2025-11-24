// app/api/games/search/route.ts
import rawg from '@/lib/rawg';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();

  if (!q) {
    return NextResponse.json(
      { error: 'Search query (q) is required' },
      { status: 400 }
    );
  }

  try {
    const res = await rawg.get('/games', {
      params: {
        search: q,
        page_size: 40,
        ordering: '-rating,-added',
      },
    });

    return NextResponse.json({
      results: res.data.results,
      count: res.data.count,
      next: res.data.next,
      previous: res.data.previous,
    });
  } catch (error: any) {
    console.error('RAWG search error:', error.message || error);

    if (error.response?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limited by RAWG – please wait a moment' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to search games' },
      { status: 500 }
    );
  }
}