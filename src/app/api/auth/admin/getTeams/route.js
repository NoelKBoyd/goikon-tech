import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming you're using Prisma client here

export async function GET() {
  try {
    // Fetch all teams with their associated manager
    const teams = await prisma.team.findMany({
      include: {
        manager: true,  // Ensure manager data is included
      },
    });

    // Return teams along with their managers
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json([], { status: 500 }); // Return empty array on error
  }
}
