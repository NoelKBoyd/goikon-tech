export async function POST(request) {
  try {
    const { homeTeamId, awayTeamId, dateTime, fieldId, refereeId } = await request.json();

    // Basic input validation
    if (!homeTeamId || !awayTeamId || !dateTime || !fieldId || !refereeId) {
      return new Response(
        JSON.stringify({ message: 'All fields (homeTeamId, awayTeamId, dateTime, fieldId, refereeId) are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if teams, field, and referee exist
    const homeTeam = await prisma.team.findUnique({ where: { id: homeTeamId } });
    const awayTeam = await prisma.team.findUnique({ where: { id: awayTeamId } });
    const field = await prisma.field.findUnique({ where: { id: fieldId } });
    const referee = await prisma.user.findUnique({ where: { id: refereeId } });

    if (!homeTeam || !awayTeam || !field || !referee) {
      return new Response(
        JSON.stringify({ message: 'Invalid home/away team, field, or referee.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the field is already booked
    const existingBooking = await prisma.fieldBooking.findFirst({
      where: {
        fieldId,
        timing: new Date(dateTime),
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
        date: new Date(dateTime),
        fieldId,
        refereeId,
      },
    });

    // Create the field booking
    await prisma.fieldBooking.create({
      data: {
        matchId: match.id,
        fieldId,
        teamId: homeTeamId,
        timing: new Date(dateTime),
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
