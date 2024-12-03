import api from "@/app/config";
import { email_template_html } from "@/utils/Contants";
import { formatCRUTCDate, formatUTCTimeTo12Hour } from "./DateTime";

const brevo = require("@getbrevo/brevo");
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export async function sendEmail(appointment_id: string) {
  const strapi_res = await api.get(
    `appointments/${appointment_id}?populate=appointment_type&populate=mode&populate=availability`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!(strapi_res.status >= 200 && strapi_res.status < 300)) {
    return false;
  }

  const data = strapi_res.data.data;

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Cita agendada con Dra. Nicole Rivera";
  sendSmtpEmail.to = [{ email: data.email, name: data.clientName }]; //Aqui poner el correo de nicole para avisar cuando hay una cita nueva
  sendSmtpEmail.sender = {
    name: "Nicole Psicologa",
    email: "josems0899@gmail.com",
  };

  sendSmtpEmail.htmlContent = email_template_html;

  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };

  const cr_utc_date = formatCRUTCDate(data.availability.Datetime);
  const cr_utc_hour = formatUTCTimeTo12Hour(data.availability.Datetime);

  sendSmtpEmail.params = {
    nombre_cliente: data.clientName,
    fecha_cita: cr_utc_date,
    hora_cita: cr_utc_hour,
    tipo_cita: data.appointment_type.AppointmentType,
    modalidad_cita: data.mode.Mode,
    nombre_doctora: "Nicole Rivera",
    telefono_doctora: "+506 8441 7617",
  };

  apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .then((res: any) => {
      console.log(`Email sent to ${data.clientName}`);
      return true;
    })
    .catch((err: any) => {
      console.error(err);
      return false;
    });
  return Response.json({ holis: "Holaaaa" });
}
