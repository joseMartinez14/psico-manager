import { prisma } from "@/prisma/config";
import { getCostaRicaToUTCTime, getCRDateFromUTC } from "@/utils/DateTime";
import { isAuthenticated } from "@/utils/email/auth";
import { cookies } from "next/headers";

interface addAvailabilityReturn {
  date: string;
  state: boolean;
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  await prisma.$disconnect();
  await prisma.$connect();

  const token = cookieStore.get("psicoStrapiToken");
  if (!token) {
    return Response.json(
      { error: "User not logged in. No token provided" },
      { status: 403 }
    );
  }
  const isAuth = await isAuthenticated(token.value);

  if (!isAuth) {
    return Response.json({ error: "User not logged" }, { status: 403 });
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

    const new_avail_data = await prisma.availability.create({
      data: {
        datetime: utc_date,
        status: "Available",
        duration: item.duration,
      },
    });

    console.log(new_avail_data);

    returnData.push({
      date: getCRDateFromUTC(utc_date.toISOString()),
      state: true,
    });
  }

  return Response.json(returnData);
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies();

  const token = cookieStore.get("psicoStrapiToken");
  if (!token) {
    return Response.json(
      { error: "User not logged in. No token provided" },
      { status: 403 }
    );
  }
  const isAuth = await isAuthenticated(token.value);

  if (!isAuth) {
    return Response.json({ error: "User not logged" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const avail_id = searchParams.get("ID");

  await prisma.availability.delete({
    where: { id: Number(avail_id) },
  });

  return Response.json({ message: "Se borro exitosamente" });
}
