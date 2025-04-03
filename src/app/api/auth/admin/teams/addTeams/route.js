import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, managerId, location, ageGroup, contactInfo, players } = await req.json();

    console.log('Received data:', { name, managerId, location, ageGroup, contactInfo, players });

    // Ensure all required fields are present (excluding players, which is optional)
    if (!name || !managerId || !location || !ageGroup || !contactInfo) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Convert managerId to integer
    const managerIdInt = parseInt(managerId, 10);

    // Check if managerId is a valid integer
    if (isNaN(managerIdInt)) {
      return new Response(JSON.stringify({ error: 'Invalid managerId' }), { status: 400 });
    }

    // Check if manager exists
    const managerExists = await prisma.user.findUnique({
      where: { id: managerIdInt },
    });

    if (!managerExists) {
      return new Response(JSON.stringify({ error: 'Manager not found' }), { status: 404 });
    }

    // Prepare the team data
    const teamData = {
      name,
      managerId: managerIdInt,
      location,
      ageGroup,
      contactInfo,
    };

    // If players are provided, add them to the team data
    if (players && players.create && Array.isArray(players.create)) {
      teamData.players = {
        create: players.create.map(player => ({
          name: player.name,
          dateOfBirth: player.dateOfBirth ? new Date(player.dateOfBirth) : new Date(), // Default to now if not provided
          position: player.position || "Unknown", // Default position if not provided
        })),
      };
    }

    // Create a new team record with players if provided
    const newTeam = await prisma.team.create({
      data: teamData,
      include: {
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
        players: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Format the response to match the getTeams route
    const formattedTeam = {
      id: newTeam.id,
      name: newTeam.name,
      managerId: newTeam.managerId,
      manager: newTeam.manager ? newTeam.manager.name : "Unknown",
      location: newTeam.location,
      ageGroup: newTeam.ageGroup,
      contactInfo: newTeam.contactInfo || "",
      players: newTeam.players.map(player => player.name).join(', ') || "No players",
    };

    console.log('New team created:', formattedTeam);

    return new Response(JSON.stringify(formattedTeam), { status: 201 });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ error: 'Failed to add team' }), { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects
  }
}