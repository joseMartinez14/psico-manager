import api from "@/app/config";
import { formatUTCTimeTo12Hour, getCRdayFromUTC } from "@/utils/DateTime";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

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
    const res = await api.get(
      `availabilities?filters[Datetime][$gte]=${startDate}&filters[Datetime][$lt]=${endDate}`
    );

    const data = await res.data.data;

    const structure_data: any = [];

    data.forEach((element: any) => {
      const hour = formatUTCTimeTo12Hour(element.Datetime);
      structure_data.push({
        state: getBoolState(element.AvailabilityStatus),
        month: month,
        year: year,
        day: day,
        hour: hour,
        document_id: element.documentId,
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
