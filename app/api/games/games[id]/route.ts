// app/api/games/[id]/route.ts
import rawg from '@/lib/rawg';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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
    console.error('Game detail error:', error.message);
    return NextResponse.json(
      { error: 'Game not found or API error' },
      { status: error.response?.status === 404 ? 404 : 500 }
    );
  }
}