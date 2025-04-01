import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { teamId } = await req.json();

    console.log('Received data:', { teamId });

    // Ensure teamId is provided
    if (!teamId) {
      return new Response(JSON.stringify({ error: 'Missing teamId' }), { status: 400 });
    }

    // Convert teamId to integer
    const teamIdInt = parseInt(teamId, 10);

    // Check if teamId is a valid integer
    if (isNaN(teamIdInt)) {
      return new Response(JSON.stringify({ error: 'Invalid teamId' }), { status: 400 });
    }

    // Check if the team exists
    const teamExists = await prisma.team.findUnique({
      where: { id: teamIdInt },
    });

    if (!teamExists) {
      return new Response(JSON.stringify({ error: 'Team not found' }), { status: 404 });
    }

    // Delete the team
    await prisma.team.delete({
      where: { id: teamIdInt },
    });

    console.log('Team deleted:', teamIdInt);

    return new Response(JSON.stringify({ message: 'Team deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete team' }), { status: 500 });
  }
}