import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const { matchid, playerid, type, action } = await req.json();
        
        if (!matchid || !playerid || !type) 
            return NextResponse.json({ message: 'Match ID, Player ID, and Incident Type are required' }, { status: 400 });

        if (!Number.isInteger(matchid) || matchid <= 0) 
            return NextResponse.json({ message: 'Invalid Match ID format' }, { status: 400 });

        if (!Number.isInteger(playerid) || playerid <= 0) 
            return NextResponse.json({ message: 'Invalid Player ID format' }, { status: 400 });

        const validTypes = ['Suspension', 'Fines'];
        if (!validTypes.includes(type)) 
            return NextResponse.json({ message: 'Invalid Incident Type' }, { status: 400 });

        if (action && typeof action !== 'string') 
            return NextResponse.json({ message: 'Invalid Action format' }, { status: 400 });


        const disciplinaryactions = await prisma.disciplinaryActions.create({
            data: { matchId: matchid, playerId: playerid, type, action },
        });

        return NextResponse.json({ message: 'Incident report submitted successfully', reportId: disciplinaryactions.id }, { status: 201 });

    } catch (error) {
        console.error('Error submitting incident report:', error);
        return NextResponse.json({ message: 'Error submitting incident report', error: error.message }, { status: 500 });
    }
}
