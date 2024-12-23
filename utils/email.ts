import { email_template_html } from "@/utils/Contants";
import { formatCRUTCDate, formatUTCTimeTo12Hour } from "./DateTime";
import { prisma } from "@/lib/prisma";

const brevo = require("@getbrevo/brevo");
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export async function sendEmail(appointment_id: string) {
  const data = await prisma.appointment.findUnique({
    include: { appointmentType: true, availability: true, mode: true },
    where: { id: Number(appointment_id) },
  });

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Cita agendada con Dra. Nicole Rivera";
  sendSmtpEmail.to = [{ email: data?.email, name: data?.clientName }]; //Aqui poner el correo de nicole para avisar cuando hay una cita nueva
  sendSmtpEmail.sender = {
    name: "Nicole Psicologa",
    email: "josems0899@gmail.com",
  };

  sendSmtpEmail.htmlContent = email_template_html;

  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };

  const cr_utc_date = formatCRUTCDate(
    data?.availability.datetime.toString() || ""
  );
  const cr_utc_hour = formatUTCTimeTo12Hour(
    data?.availability.datetime.toString() || ""
  );

  sendSmtpEmail.params = {
    nombre_cliente: data?.clientName,
    fecha_cita: cr_utc_date,
    hora_cita: cr_utc_hour,
    tipo_cita: data?.appointmentType.type,
    modalidad_cita: data?.mode.mode,
    nombre_doctora: "Nicole Rivera",
    telefono_doctora: "+506 8441 7617",
  };

  apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .then((res: any) => {
      console.log(`Email sent to ${data?.clientName}`);
      return true;
    })
    .catch((err: any) => {
      console.error(err);
      return false;
    });
  return Response.json({ holis: "Holaaaa" });
}
