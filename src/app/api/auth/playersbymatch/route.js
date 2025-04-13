import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get('matchId');

  if (!matchId) {
    return new Response(JSON.stringify({ message: 'Match ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const match = await prisma.matches.findUnique({
      where: {
        id: parseInt(matchId, 10),
      },
      select: {
        homeTeamId: true,
        awayTeamId: true,
      },
    });

    if (!match) {
      return new Response(JSON.stringify({ message: 'Match not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const players = await prisma.player.findMany({
      where: {
        teamId: {
          in: [match.homeTeamId, match.awayTeamId],
        },
      },
      select: {
        id: true,
        name: true,
        teamId: true,
        position: true,
      },
    });

    return new Response(JSON.stringify(players), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
