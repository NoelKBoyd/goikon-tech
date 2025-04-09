import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const body = await req.json();
        const { matchid, homeTeamScore, awayTeamScore, status, timeStamp, assists, yellowCard, redCard, penalties, shotsOnTarget } = body;

        
        if (!matchid || homeTeamScore === undefined || awayTeamScore === undefined || !status || !timeStamp) 
            return NextResponse.json({ message: 'Match ID, Scores, Status, and Timestamp are required' }, { status: 400 });

        if (!Number.isInteger(matchid) || matchid <= 0) 
            return NextResponse.json({ message: 'Invalid Match ID format' }, { status: 400 });

        if (isNaN(Date.parse(timeStamp))) 
            return NextResponse.json({ message: 'Invalid Timestamp format' }, { status: 400 });

        const NotNegative = (value) => (value !== undefined && value >= 0 ? parseInt(value, 10) : 0);

        
        const matchResult = await prisma.matchResult.create({
            data: {
                matchId: matchid,
                homeTeamScore: NotNegative(homeTeamScore),
                awayTeamScore: NotNegative(awayTeamScore),
                status,
                timeStamp: new Date(timeStamp),
                assists: NotNegative(assists),
                yellowCard: NotNegative(yellowCard),
                redCard: NotNegative(redCard),
                penalties: NotNegative(penalties),
                shotsOnTarget: NotNegative(shotsOnTarget),
            },
        });

        return NextResponse.json({ message: 'Match result submitted successfully', resultId: matchResult.id }, { status: 201 });

    } catch (error) {
        console.error('Error submitting match result:', error);
        return NextResponse.json({ message: 'Error submitting match result', error: error.message }, { status: 500 });
    }
}
