import nodeMailer from "nodemailer";
import { config } from "dotenv";
config();
const { HOST, SERVICE, EMAIL_PORT, SECURE, PASSWORD, USER_EMAIL } = process.env;

export const sendEmail = async (email, subject, text, html) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: HOST,
      service: SERVICE,
      port: Number(EMAIL_PORT),
      secure: Boolean(SECURE),
      auth: {
        user: String(USER_EMAIL),
        pass: String(PASSWORD),
      },
    });

    await transporter.sendMail({
      from: {
        name: "AdvenShop",
        address: String(USER_EMAIL),
      },
      to: email,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Email sent Successfully");
  } catch (error) {
    console.log({
      errorType: "nodeMailer",
      error: error,
    });
  }
};
