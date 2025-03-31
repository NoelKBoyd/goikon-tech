import { prisma } from "@/lib/prisma";

export async function POST(req, res) {
  try {
    const { homeTeamId, awayTeamId, date, fieldId } = await req.json();

    if (!homeTeamId || !awayTeamId || !date || !fieldId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const match = await prisma.matches.create({
      data: {
        homeTeamId: parseInt(homeTeamId),
        awayTeamId: parseInt(awayTeamId),
        date: new Date(date),
        fieldId: parseInt(fieldId),
      },
    });

    return res.status(201).json(match);
  } catch (error) {
    console.error("Error adding match:", error);
    return res.status(500).json({ error: "Failed to add match" });
  }
}
