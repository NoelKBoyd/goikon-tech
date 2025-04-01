import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this is the correct path to your Prisma client

export async function GET() {
  try {
    // Fetch match data with related teams and match stats
    const matches = await prisma.matches.findMany({
      include: {
        homeTeam: {
          select: {
            name: true, // Home team name
          },
        },
        awayTeam: {
          select: {
            name: true, // Away team name
          },
        },
        result: true, // Match result (e.g., scores, status)
        matchStats: {
          select: {
            playerId: true,
            goals: true,
            assists: true,
            yellowCard: true,
            redCard: true,
            fouls: true,
            shotsOnTarget: true,
          },
        },
      },
    });

    // Return the matches as a JSON response
    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    console.error('Error fetching match stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch match stats' },
      { status: 500 }
    );
  }
}