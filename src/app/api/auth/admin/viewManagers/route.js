import { NextResponse } from 'next/server';  // Add this import

import prisma from '@/lib/prisma'; // Assuming you're using Prisma client here

export async function GET() {
  try {
    // Fetch all managers with their associated role
    const managers = await prisma.user.findMany({
      where: {
        roleId: 25, // Use roleId instead of roleID
      },
      include: {
        role: true, // Optional: Include role details if needed
      },
    });

    // Return managers as JSON response
    return NextResponse.json(managers, { status: 200 });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return NextResponse.json([], { status: 500 }); // Return an empty array on error
  }
}
