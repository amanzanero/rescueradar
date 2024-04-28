import { env } from "@/env";
import * as nodemailer from "nodemailer";
import type { EmailSender } from "./sender";

interface SendProps {
  to: string;
  subject: string;
  html: string;
}

export class GmailSender implements EmailSender {
  _transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  send = async ({ to, subject, html }: SendProps) => {
    await this._transporter.sendMail({
      from: `RescueRadar <${env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  };
}
