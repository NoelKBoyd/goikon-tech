// /api/auth/admin/reports/addReport.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      homeTeamId,
      awayTeamId,
      homeTeamScore,
      assists,
      yellowCard,
      redCard,
      fouls,
      shotsOnTarget,
    } = body;

    // Required fields validation
    if (!homeTeamId || !awayTeamId) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          required: ['homeTeamId', 'awayTeamId']
        },
        { status: 400 }
      );
    }

    // Convert string IDs to integers and validate
    const parsedHomeTeamId = parseInt(homeTeamId);
    const parsedAwayTeamId = parseInt(awayTeamId);

    if (isNaN(parsedHomeTeamId) || isNaN(parsedAwayTeamId)) {
      return NextResponse.json(
        { error: 'Invalid team ID format: IDs must be numbers' },
        { status: 400 }
      );
    }

    // Verify teams exist and are different
    const [homeTeam, awayTeam] = await Promise.all([
      prisma.team.findUnique({ where: { id: parsedHomeTeamId } }),
      prisma.team.findUnique({ where: { id: parsedAwayTeamId } })
    ]);

    if (!homeTeam || !awayTeam) {
      return NextResponse.json(
        { error: 'One or both teams not found' },
        { status: 404 }
      );
    }

    if (parsedHomeTeamId === parsedAwayTeamId) {
      return NextResponse.json(
        { error: 'Home team and away team cannot be the same' },
        { status: 400 }
      );
    }

    // Create match with all stats in result
    const newMatch = await prisma.matches.create({
      data: {
        homeTeamId: parsedHomeTeamId,
        awayTeamId: parsedAwayTeamId,
        date: new Date(),
        fieldId: 1,
        refereeId: 1,
        result: {
          create: {
            homeTeamScore: parseInt(homeTeamScore) || 0,
            awayTeamScore: 0, // You might want to add this to your form
            status: 'COMPLETED',
            timeStamp: new Date(),
            assists: parseInt(assists) || 0,
            yellowCard: parseInt(yellowCard) || 0,
            redCard: parseInt(redCard) || 0,
            fouls: parseInt(fouls) || 0,
            shotsOnTarget: parseInt(shotsOnTarget) || 0,
          }
        }
      },
      include: {
        homeTeam: { select: { name: true } },
        awayTeam: { select: { name: true } },
        result: true
      }
    });

    return NextResponse.json({
      message: 'Match report created successfully',
      data: newMatch
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding match report:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A match with these details already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to create match report',
        details: error.message
      },
      { status: 500 }
    );
  }
}