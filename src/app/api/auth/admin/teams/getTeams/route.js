import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all teams with their associated manager and players
    const teams = await prisma.team.findMany({
      include: {
        manager: {
          select: {
            id: true,
            name: true
          }
        },
        players: {
          select: {
            id: true,
            name: true
          }
        }
      },
    });

    // Format the data for the frontend
    const formattedTeams = teams.map(team => ({
      id: team.id,
      name: team.name,
      managerId: team.managerId,
      manager: team.manager ? team.manager.name : "Unknown",
      location: team.location,
      ageGroup: team.ageGroup,
      contactInfo: team.contactInfo || "",
      players: team.players.map(player => player.name).join(', ') || "No players"
    }));

    return NextResponse.json(formattedTeams, { status: 200 });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json([], { status: 500 });
  }
}