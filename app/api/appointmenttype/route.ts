import { prisma } from "@/prisma/config";

export async function GET() {
  try {
    const data = await prisma.appointmentType.findMany();
    const data_structured = data.map((app) => {
      return { value: app.type, id: app.id };
    });

    return Response.json(data_structured);
  } catch (error) {
    console.error("Error fetching appointment-types:", error);
    return Response.json(
      { error: "Failed to fetch appointment-types." },
      { status: 500 }
    );
  }
}
