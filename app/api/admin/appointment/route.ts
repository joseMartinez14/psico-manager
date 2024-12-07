import api from "@/app/config";
import { formatCRUTCDate, formatUTCTimeTo12Hour } from "@/utils/DateTime";
import { sendEmail } from "@/utils/email";
import { AppointmentItem } from "@/utils/Types";
import { cookies } from "next/headers";

interface appointmentStrapi {
  document_id: string;
  email: string;
  clientName: string;
  phone: string;
  appointment_type: { AppointmentType: string };
  mode: { Mode: string };
  availability: { Datetime: string; Duration: string };
}

export async function POST(req: Request) {
  const data = await req.json();

  const res_avail = await api.get(`availabilities/${data.appointmentHour}`);
  const availability = await res_avail.data.data;
  if (
    res_avail.status == 200 &&
    availability.AvailabilityStatus.toLowerCase() == "available"
  ) {
    //Save new appointment
    const new_appointment_data = {
      data: {
        appointment_type: data.appointmentType,
        availability: data.appointmentHour,
        mode: data.appointmentMode,
        email: data.email,
        phone: data.phone,
        clientName: data.name,
      },
    };
    const res_create_app = await api.post(
      "appointments",
      JSON.stringify(new_appointment_data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (res_create_app.status >= 200 && res_create_app.status < 300) {
      const update_avail_data = {
        data: {
          AvailabilityStatus: "unavailable",
          Duration: availability.Duration,
          Datetime: availability.Datetime,
        },
      };
      availability.AvailabilityStatus = "unavailable";
      const res_avail_update = await api.put(
        `availabilities/${data.appointmentHour}`,
        JSON.stringify(update_avail_data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
        }
      );
      if (res_avail_update.status >= 200 && res_avail_update.status < 300) {
        await sendEmail(res_create_app.data.data.documentId);
        return Response.json({ message: "Data inserted successfully" });
      }
      return Response.json(
        { error: "Failed to update availability" },
        { status: 502 }
      );
    } else {
      return Response.json(
        { error: "Failed to save appointment" },
        { status: 501 }
      );
    }
  }

  return Response.json(
    { error: "Failed to save appointment" },
    { status: 500 }
  );
}

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("psicoStrapiToken");
  if (!token) {
    return Response.json({ error: "User not logged in" }, { status: 403 });
  }

  const strapi_res = await api.get(
    "appointments?populate=appointment_type&populate=mode&populate=availability",
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  const data = strapi_res.data.data;

  const struct_data: AppointmentItem[] = data.map((app: appointmentStrapi) => {
    return {
      id: app.document_id,
      clientEmail: app.email,
      clientName: app.clientName,
      clientPhone: app.phone,
      type: app.appointment_type.AppointmentType,
      mode: app.mode.Mode,
      date: formatCRUTCDate(app.availability.Datetime),
      hour: formatUTCTimeTo12Hour(app.availability.Datetime),
      duration: app.availability.Duration,
    };
  });

  return Response.json(struct_data);
}
