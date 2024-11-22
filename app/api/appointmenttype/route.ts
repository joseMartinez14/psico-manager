import api from "@/app/config";

export async function GET() {
  try {
    const res = await api.get("appointment-types");
    const data = res.data.data;

    const data_structured = data.map((app: any) => {
      return { value: app.AppointmentType, id: app.documentId };
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
