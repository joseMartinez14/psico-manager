import { prisma } from "@/prisma/config";
import { formatUTCTimeTo12Hour } from "@/utils/DateTime";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    await prisma.$disconnect();
    await prisma.$connect();

    let day = searchParams.get("day");
    let month = searchParams.get("month");
    let year = searchParams.get("year");

    if (!month || !year || !day) {
      day = new Date().getDate().toString();
      month = (new Date().getMonth() + 1).toString();
      year = new Date().getFullYear().toString();
    }

    const startDate = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day), 0 + 6, 0)
    ).toISOString();

    const endDate = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day) + 1, 0 + 6, 0)
    ).toISOString();

    const data = await prisma.availability.findMany({
      where: {
        datetime: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const structure_data: {
      state: boolean;
      month: string;
      year: string;
      day: string;
      hour: string;
      document_id: string;
    }[] = [];

    data.forEach((element) => {
      const hour = formatUTCTimeTo12Hour(element.datetime.toISOString());
      structure_data.push({
        state: getBoolState(element.status),
        month: month,
        year: year,
        day: day,
        hour: hour,
        document_id: element.id.toString(),
      });
    });

    return Response.json(structure_data);
  } catch (error) {
    console.error("Error fetching availabilities:", error);
    return Response.json(
      { error: "Failed to fetch availabilities." },
      { status: 500 }
    );
  }
}

const getBoolState = (avail: string): boolean => {
  if (avail == "Available") {
    return true;
  }
  return false;
};
