import { Resend } from "resend";
import { env } from "@/env";
import type { EmailSender, SendProps } from "./sender";

const resend = new Resend(env.RESEND_API_KEY);
export class ResendSender implements EmailSender {
  send = async ({ to, subject, html }: SendProps) => {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
    console.log("email result", result);
  };
}
