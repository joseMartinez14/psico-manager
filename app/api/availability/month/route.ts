import api from "@/app/config";
import { getCRdayFromUTC } from "@/utils/DateTime";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

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
    const res = await api.get(
      `availabilities?filters[Datetime][$gte]=${startDate}&filters[Datetime][$lt]=${endDate}&pagination[pageSize]=240`
    );

    const data = await res.data.data;

    const hashStructure = new Map<number, string>();

    data.forEach(
      (element: { Datetime: string; AvailabilityStatus: string }) => {
        const day = getCRdayFromUTC(element.Datetime);
        if (hashStructure.has(day)) {
          if (element.AvailabilityStatus == "Available")
            hashStructure.set(day, "Available");
        } else {
          hashStructure.set(day, element.AvailabilityStatus);
        }
      }
    );

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
