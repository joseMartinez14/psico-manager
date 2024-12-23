import { prisma } from "@/prisma/config";
import { getCRdayFromUTC } from "@/utils/DateTime";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // await prisma.$disconnect();
    // await prisma.$connect();

    let month = searchParams.get("month");
    let year = searchParams.get("year");

    if (!month || !year) {
      month = (new Date().getMonth() + 1).toString();
      year = new Date().getFullYear().toString();
    }
    const startDate = new Date(
      Date.UTC(Number(year), Number(month) - 1, 1, 0 + 6, 0)
    ).toISOString();

    const endDate = new Date(
      Date.UTC(Number(year), Number(month), 1, 0 + 6, 0)
    ).toISOString();

    const data = await prisma.availability.findMany({
      where: {
        datetime: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const hashStructure = new Map<number, string>();

    data.forEach((element) => {
      const day = getCRdayFromUTC(element.datetime.toISOString());
      if (hashStructure.has(day)) {
        if (element.status == "Available") hashStructure.set(day, "Available");
      } else {
        hashStructure.set(day, element.status);
      }
    });

    const structure_data: { day: number; state: boolean; month: string }[] = [];

    hashStructure.forEach((value, key) => {
      structure_data.push({
        day: key,
        state: getBoolState(value),
        month: month,
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
