import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { teamId } = await req.json();
    const teamIdInt = parseInt(teamId);

    // Step 1: Delete match-related stats (by match → team)
    await prisma.matchRelatedStats.deleteMany({
      where: {
        match: {
          OR: [
            { homeTeamId: teamIdInt },
            { awayTeamId: teamIdInt },
          ],
        },
      },
    });

    // Step 2: Delete incidents
    await prisma.incidentsReporting.deleteMany({
      where: {
        match: {
          OR: [
            { homeTeamId: teamIdInt },
            { awayTeamId: teamIdInt },
          ],
        },
      },
    });

    // Step 3: Delete field bookings (by match of team or team itself)
    await prisma.fieldBooking.deleteMany({
      where: {
        OR: [
          {
            match: {
              OR: [
                { homeTeamId: teamIdInt },
                { awayTeamId: teamIdInt },
              ],
            },
          },
          { teamId: teamIdInt },
        ],
      },
    });

    // Step 4: Delete match results
    await prisma.matchResult.deleteMany({
      where: {
        match: {
          OR: [
            { homeTeamId: teamIdInt },
            { awayTeamId: teamIdInt },
          ],
        },
      },
    });

    // Step 5: Delete matches
    await prisma.matches.deleteMany({
      where: {
        OR: [
          { homeTeamId: teamIdInt },
          { awayTeamId: teamIdInt },
        ],
      },
    });

    // Step 6: Delete team rosters
    await prisma.teamRoster.deleteMany({
      where: { teamId: teamIdInt },
    });

    // Step 7: Delete players
    await prisma.player.deleteMany({
      where: { teamId: teamIdInt },
    });

    // Step 8: Delete the team
    const existingTeam = await prisma.team.findUnique({
      where: { id: teamIdInt },
    });
    
    if (existingTeam) {
      await prisma.team.delete({
        where: { id: teamIdInt },
      });
    }
    

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting team:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
