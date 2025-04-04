import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const refereeId = parseInt(searchParams.get('refereeId'), 10);


        const matches = await prisma.matches.findMany({
            where: {
                refereeId,
                result: null, 
            },
            include: {
                homeTeam: true,
                awayTeam: true,
                field: true,
            },
        });

        return NextResponse.json(matches, { status: 200 });
    } catch (error) {
        console.error('Error fetching assigned matches:', error);

        return NextResponse.json(
            { message: 'Error fetching matches', error: error.message },
            { status: 500 }
        );
    }
}
