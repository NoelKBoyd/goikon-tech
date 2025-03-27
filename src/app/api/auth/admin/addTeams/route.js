import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, managerId, location, ageGroup, contactInfo } = await req.json();

    console.log('Received data:', { name, managerId, location, ageGroup, contactInfo });

    // Ensure all required fields are present
    if (!name || !managerId || !location || !ageGroup || !contactInfo) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Convert managerId to integer
    const managerIdInt = parseInt(managerId, 10);

    // Check if managerId is a valid integer
    if (isNaN(managerIdInt)) {
      return new Response(JSON.stringify({ error: 'Invalid managerId' }), { status: 400 });
    }


    const managerExists = await prisma.user.findUnique({
      where: { id: managerIdInt }, 
    });


    if (!managerExists) {
      return new Response(JSON.stringify({ error: 'Manager not found' }), { status: 400 });
    }

    // Create a new team record
    const newTeam = await prisma.team.create({
      data: {
        name,
        managerId: managerIdInt,
        location,
        ageGroup,
        contactInfo,
      },
    });

    console.log('New team created:', newTeam);

    return new Response(JSON.stringify(newTeam), { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ error: 'Failed to add team' }), { status: 500 });
  }
}
