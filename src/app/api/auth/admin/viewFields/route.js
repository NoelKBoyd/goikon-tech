import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Fetch all fields from the database
    const fields = await prisma.field.findMany({
      include: {
        user: true, // If you want to include the user associated with the field
        bookings: true, // If you want to include bookings for the field
        maintenance: true, // If you want to include maintenance schedule
      },
    });

    return new Response(JSON.stringify(fields), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching fields:", error);
    return new Response("Failed to fetch fields", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
