import { prisma } from "@/prisma/config";

export async function GET() {
  try {
    const data = await prisma.mode.findMany();

    const data_structured = data.map((app) => {
      return { value: app.mode, id: app.id };
    });

    return Response.json(data_structured);
  } catch (error) {
    console.error("Error fetching modes:", error);
    return Response.json({ error: "Failed to fetch modes." }, { status: 500 });
  }
}
