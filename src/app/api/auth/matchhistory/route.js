import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const refereeId = parseInt(searchParams.get('refereeId') || '', 10);

    if (isNaN(refereeId)) {
      return NextResponse.json(
        { message: 'Invalid refereeId' },
        { status: 400 }
      );
    }

    const matches = await prisma.matches.findMany({
      where: {
        refereeId,
        result: {
          isNot: null,
        },
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        field: true,
        result: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json({ matches }, { status: 200 });
  } catch (error) {
    console.error('Error fetching match history:', error);
    return NextResponse.json(
      { message: 'Failed to fetch match history', error: error.message },
      { status: 500 }
    );
  }
}
