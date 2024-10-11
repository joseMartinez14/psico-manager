import api from "@/app/config";
import { getCRdayFromUTC } from "@/utils/DateTime";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!month || !year) {
      return Response.json(
        {
          error:
            "Missing required query parameters: 'month' and 'year' are required.",
        },
        { status: 400 }
      );
    }

    const startDate = new Date(
      Date.UTC(Number(year), Number(month) - 1, 1, 0 + 6, 0)
    ).toISOString(); // First day of the month

    const endDate = new Date(
      Date.UTC(Number(year), Number(month), 1, 0 + 6, 0)
    ).toISOString(); // Last day of the month

    const res = await api.get(
      `availabilities?filters[Datetime][$gte]=${startDate}&filters[Datetime][$lt]=${endDate}`
    );

    const data = res.data.data;
    const hashStructure = new Map<number, string>();

    data.forEach((element: any) => {
      const day = getCRdayFromUTC(element.Datetime);
      if (hashStructure.has(day)) {
        if (element.AvailabilityStatus == "Available")
          hashStructure.set(day, "Available");
      } else {
        hashStructure.set(day, element.AvailabilityStatus);
      }
    });

    const structure_data: any = [];

    hashStructure.forEach((value, key) => {
      structure_data.push({ day: key, state: value });
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
