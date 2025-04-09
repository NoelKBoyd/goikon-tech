// pages/api/users/index.js (or app/api/users/route.js for App Router)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        dateOfBirth: true,
        email: true,
        phone: true,
        roleId: true,
      },
    });

    // Format dateOfBirth to string
    const formattedUsers = users.map(user => ({
      ...user,
      dateOfBirth: user.dateOfBirth.toISOString().split('T')[0]
    }));

    return new Response(JSON.stringify(formattedUsers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}