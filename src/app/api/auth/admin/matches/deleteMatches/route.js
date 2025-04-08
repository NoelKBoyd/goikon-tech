import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { matchId } = await req.json();
    if (!matchId) {
      return NextResponse.json({ error: 'matchId is required' }, { status: 400 });
    }
    const matchIdInt = parseInt(matchId);

    // Step 1: Delete match-related stats
    await prisma.matchRelatedStats.deleteMany({
      where: {
        matchId: matchIdInt,
      },
    });

    // Step 2: Delete incidents related to the match
    await prisma.incidentsReporting.deleteMany({
      where: {
        matchId: matchIdInt,
      },
    });

    // Step 3: Delete field bookings related to the match
    await prisma.fieldBooking.deleteMany({
      where: {
        matchId: matchIdInt,
      },
    });

    // Step 4: Delete match results
    await prisma.matchResult.deleteMany({
      where: {
        matchId: matchIdInt,
      },
    });

    // Step 5: Delete the match itself
    const existingMatch = await prisma.matches.findUnique({
      where: { id: matchIdInt },
    });

    if (!existingMatch) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    await prisma.matches.delete({
      where: { id: matchIdInt },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting match:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}