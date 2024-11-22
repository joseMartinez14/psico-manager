import Mailgen from "mailgen";

import Mailgun, { MailgunMessageData } from "mailgun.js";
import FormData from "form-data";

const mailgun = new Mailgun(FormData);

const client = mailgun.client({
  username: "api",
  key: "3965c55e10f7025504cdffa52206d25e-784975b6-dd407d66",
});

const messageData = {
  from: "Excited User <me@sandboxdc10805a31ef48f3b51abd7b25d76f25.mailgun.org>",
  to: "josems0899@gmail.com",
  subject: "hello",
  text: "Some text. Is a html?",
};

export async function GET() {
  client.messages
    .create("sandboxdc10805a31ef48f3b51abd7b25d76f25.mailgun.org", messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("Mamoooo");
      console.log(err);
    });
  return Response.json({ holis: "Holaaaa" });
}
