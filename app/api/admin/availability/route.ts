import api from "@/app/config";
import { getCostaRicaToUTCTime, getCRDateFromUTC } from "@/utils/DateTime";
import { cookies } from "next/headers";

interface addAvailabilityReturn {
  date: string;
  state: boolean;
}

export async function POST(req: Request) {
  const cookieStore = await cookies();

  const token = cookieStore.get("psicoStrapiToken");
  if (!token) {
    return Response.json({ error: "User not logged in" }, { status: 403 });
  }
  const data = await req.json();

  const returnData: addAvailabilityReturn[] = [];

  for (const item of data) {
    const utc_date = getCostaRicaToUTCTime(
      item.year,
      item.month,
      item.day,
      item.hour
    );
    const new_avail_data = {
      data: {
        AvailabilityStatus: "Available",
        Duration: item.duration,
        Datetime: utc_date,
      },
    };

    const avail_res = await api.post(
      "availabilities",
      JSON.stringify(new_avail_data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (avail_res.status >= 200 && avail_res.status < 300) {
      returnData.push({
        date: getCRDateFromUTC(utc_date.toISOString()),
        state: true,
      });
    } else {
      if (avail_res.status >= 400 && avail_res.status < 500) {
        console.log("Putaaaaa");
        return Response.json({ error: "User not logged in" }, { status: 403 });
      }
      returnData.push({
        date: getCRDateFromUTC(utc_date.toISOString()),
        state: false,
      });
    }
  }

  return Response.json(returnData);
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies();

  const { searchParams } = new URL(req.url);
  const avail_id = searchParams.get("ID");

  const token = cookieStore.get("psicoStrapiToken");
  console.log(token);
  if (!token) {
    console.log("Esta mierda nunca entra aqui");
    return Response.json({ error: "User not logged in" }, { status: 403 });
  }

  const strapi_res = await api.delete(`availabilities/${avail_id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (strapi_res.status == 204) {
    return Response.json({ message: "Se borro exitosamente" });
  }
  return Response.json(
    { error: "Error al eliminar la disponibilidad" },
    { status: 506 }
  );
}
