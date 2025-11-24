// app/api/games/[id]/route.ts
import rawg from '@/lib/rawg';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // ← Promise!
) {
  const { id } = await params; // ← await it!

  try {
    const [gameRes, screenshotsRes] = await Promise.all([
      rawg.get(`/games/${id}`),
      rawg.get(`/games/${id}/screenshots`),
    ]);

    return NextResponse.json({
      ...gameRes.data,
      screenshots: screenshotsRes.data.results,
    });
  } catch (error: any) {
    console.error('Game detail error:', error.message || error);

    const status = error.response?.status;
    return NextResponse.json(
      { error: 'Game not found or API error' },
      { status: status === 404 ? 404 : 500 }
    );
  }
}