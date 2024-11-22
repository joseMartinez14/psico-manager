import api from "@/app/config";

export async function GET() {
  try {
    const res = await api.get("modes");
    const data = res.data.data;
    const data_structured = data.map((app: any) => {
      return { value: app.Mode, id: app.documentId };
    });

    return Response.json(data_structured);
  } catch (error) {
    console.error("Error fetching modes:", error);
    return Response.json({ error: "Failed to fetch modes." }, { status: 500 });
  }
}
