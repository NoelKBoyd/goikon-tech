import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const refereeId = 5;

        const matches = await prisma.matches.findMany({
            where: {
              refereeId,
              result: {
                isNot: null,
              },
            },
            include: {
              homeTeam: true,
              awayTeam: true,
              field: true,
              result: true,
            },
            orderBy: {
              date: 'desc',
            },
          });

        
        const incidentReports = await prisma.incidentsReporting.findMany({
            where: {
                match: {
                    refereeId,
                },
            },
            orderBy: {
                id: 'desc',
            },
            include: {
                match: true,
                player: true,
            },
            take: 5, 
        });

        
        const recentActivity = [...matches, ...incidentReports];

        
        recentActivity.sort((a, b) => (b.date || b.timestamp) - (a.date || a.timestamp));

        return NextResponse.json(recentActivity, { status: 200 });
    } catch (error) {
        console.error('Error fetching recent activity:', error);

        return NextResponse.json(
            { message: 'Error fetching recent activity', error: error.message },
            { status: 500 }
        );
    }
}
