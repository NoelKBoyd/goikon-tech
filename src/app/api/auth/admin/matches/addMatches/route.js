// app/api/auth/admin/matches/addMatches/route.js

import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { homeTeamId, awayTeamId, date, fieldId, refereeId } = await request.json();

    // Basic input validation
    if (!homeTeamId || !awayTeamId || !date || !fieldId || !refereeId) {
      return new Response(
        JSON.stringify({ message: 'All fields (homeTeamId, awayTeamId, date, fieldId, refereeId) are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if field is already booked
    const existingBooking = await prisma.fieldBooking.findFirst({
      where: {
        fieldId,
        timing: new Date(date),
      },
    });

    if (existingBooking) {
      return new Response(
        JSON.stringify({ message: 'Field is already booked for this time.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create the match
    const match = await prisma.matches.create({
      data: {
        homeTeamId,
        awayTeamId,
        date: new Date(date),
        fieldId,
        refereeId,
      },
    });

    // Create the field booking, associating it with the home team
    await prisma.fieldBooking.create({
      data: {
        matchId: match.id,
        fieldId,
        teamId: homeTeamId, // Associate the booking with the home team
        timing: new Date(date),
        status: 'Booked',
      },
    });

    return new Response(JSON.stringify(match), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error scheduling match:', error);
    return new Response(
      JSON.stringify({ message: 'Error scheduling match.', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}