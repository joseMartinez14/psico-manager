import { prisma } from "@/prisma/config";
import { formatCRUTCDate, formatUTCTimeTo12Hour } from "@/utils/DateTime";
import { sendEmail } from "@/utils/email";
import { isAuthenticated } from "@/utils/email/auth";
import { AppointmentItem } from "@/utils/Types";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();

  const availability = await prisma.availability.findUnique({
    where: { id: Number(data.appointmentHour) },
  });

  if (availability?.status.toLowerCase() == "available") {
    const new_app = await prisma.appointment.create({
      data: {
        appointmentTypeId: Number(data.appointmentType),
        availabilityId: Number(data.appointmentHour),
        modeId: Number(data.appointmentMode),
        email: data.email,
        phone: data.phone,
        clientName: data.name,
      },
    });

    await prisma.availability.update({
      where: { id: new_app.availabilityId },
      data: { status: "unavailable" },
    });
    await sendEmail(new_app.id.toString());

    return Response.json({ message: "Data inserted successfully" });
  }
}

export async function GET() {
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

  const data = await prisma.appointment.findMany({
    include: { appointmentType: true, availability: true, mode: true },
  });

  const struct_data: AppointmentItem[] = data.map((app) => {
    return {
      id: app.email,
      clientEmail: app.email,
      clientName: app.clientName,
      clientPhone: app.phone,
      type: app.appointmentType.type,
      mode: app.mode.mode,
      date: formatCRUTCDate(app.availability.datetime.toString()),
      hour: formatUTCTimeTo12Hour(app.availability.datetime.toString()),
      duration: app.availability.duration,
    };
  });

  return Response.json(struct_data);
}
