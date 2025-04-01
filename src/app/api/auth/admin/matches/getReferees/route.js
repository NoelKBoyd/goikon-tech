import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Prisma client

export async function GET() {
  try {
    // Fetch all referees (users with the referee role)
    const referees = await prisma.user.findMany({
      where: {
        role: {
          name: 'Referee', // Ensure "Referee" matches exactly as stored in your database
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(referees, { status: 200 });
  } catch (error) {
    console.error('Error fetching referees:', error);
    return NextResponse.json([], { status: 500 });
  }
}
