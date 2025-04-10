import prisma from '@/lib/prisma';

export async function GET(req) {
  try {
    const stats = await prisma.matchRelatedStats.findMany({
      include: {
        player: {
          select: {
            id: true,
            name: true,
            position: true,
          },
        },
      },
    });

    const aggregatedStats = stats.reduce((acc, stat) => {
      const playerId = stat.player.id;

      if (!acc[playerId]) {
        acc[playerId] = {
          id: playerId,
          name: stat.player.name,
          position: stat.player.position,
          appearances: 0,
          goals: 0,
          assists: 0,
          cleansheets: 0, 
          form: 10,
        };
      }

      acc[playerId].appearances += 1;
      acc[playerId].goals += stat.goals || 0;
      acc[playerId].assists += stat.assists || 0;

      return acc;
    }, {});

    const players = Object.values(aggregatedStats).map((player) => ({
      ...player,
    }));

    return new Response(JSON.stringify({ players }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch player stats' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
