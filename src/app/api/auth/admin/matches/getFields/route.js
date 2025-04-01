import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const fields = await prisma.field.findMany({
      select: {
        id: true,
        location: true, 
      },
    });

    return NextResponse.json(fields, { status: 200 });
  } catch (error) {
    console.error('Error fetching fields:', error);
    return NextResponse.json([], { status: 500 });
  }
}
