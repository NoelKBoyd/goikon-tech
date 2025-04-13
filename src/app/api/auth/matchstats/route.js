import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const {
      matchId,
      playerId,
      goals,
      assists,
      yellowCard,
      redCard,
      fouls,
      shotsOnTarget,
    } = await request.json();

    if (
      !matchId || !playerId ||
      goals === undefined || assists === undefined ||
      yellowCard === undefined || redCard === undefined ||
      fouls === undefined || shotsOnTarget === undefined
    ) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), {
        status: 400,
      });
    }

    const matchStat = await prisma.matchRelatedStats.create({
        data: {
          matchId,
          playerId,
          goals,
          assists,
          yellowCard,
          redCard,
          fouls,
          shotsOnTarget,
        },
      });
      

    return new Response(JSON.stringify(matchStat), {
      status: 200,
    });
  } catch (error) {
    console.error('Error creating match stat:', error);
    return new Response(JSON.stringify({ message: 'Failed to create match stats', error: error.message }), {
      status: 500,
    });
  }
}
