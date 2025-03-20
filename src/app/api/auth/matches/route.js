import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const matches = await prisma.matches.findMany({
      include: {
        homeTeam: { select: { name: true } },   
        awayTeam: { select: { name: true } },   
        referee: { select: { name: true } },   
        field: { select: { location: true } }       
      }
    });

    return NextResponse.json({ matches });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}
