import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch player names from the database
    const players = await prisma.player.findMany({
      select: {
        id: true,
        name: true, // Only fetch player name
      },
    });

    // Return the list of players as JSON
    return new Response(JSON.stringify({ players }), { status: 200 });
  } catch (error) {
    console.error('Error fetching players:', error);

    // Return error response
    return new Response(
      JSON.stringify({ error: 'Failed to fetch players' }),
      { status: 500 }
    );
  }
}
