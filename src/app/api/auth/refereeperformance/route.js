import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const body = await req.json();
        const { matchId, refereeId, refereeRating } = body;

        // Validate required fields
        if (!matchId || !refereeId || refereeRating === undefined) {
            return NextResponse.json({ message: 'Match ID, Referee ID, and Referee Rating are required' }, { status: 400 });
        }

        if (!Number.isInteger(matchId) || matchId <= 0) {
            return NextResponse.json({ message: 'Invalid Match ID format' }, { status: 400 });
        }

        if (!Number.isInteger(refereeId) || refereeId <= 0) {
            return NextResponse.json({ message: 'Invalid Referee ID format' }, { status: 400 });
        }

        if (refereeRating < 1 || refereeRating > 10) {
            return NextResponse.json({ message: 'Referee Rating must be between 1 and 10' }, { status: 400 });
        }

        const matchResult = await prisma.matchResult.findUnique({
            where: { matchId },
        });

        if (!matchResult) {
            return NextResponse.json({ message: 'This match has no result. Referee performance cannot be rated.' }, { status: 400 });
        }

        const match = await prisma.matches.findUnique({
            where: { id: matchId },
            select: { refereeId: true },
        });

        if (!match || match.refereeId !== refereeId) {
            return NextResponse.json({ message: 'Only the referee who officiated the match can be rated.' }, { status: 403 });
        }

        const refereePerformance = await prisma.refereePerformance.create({
            data: {
                matchId,
                refereeId,
                refereeRating,
            },
        });

        return NextResponse.json({ message: 'Referee performance submitted successfully', resultId: refereePerformance.matchId }, { status: 201 });

    } catch (error) {
        console.error('Error submitting referee performance:', error);
        return NextResponse.json({ message: 'Error submitting referee performance', error: error.message }, { status: 500 });
    }
}
