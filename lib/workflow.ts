import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import {Client as QstashClient} from "@upstash/qstash";
import emailjs from "@emailjs/browser"

export const workflowClient = new WorkflowClient({
  baseUrl : config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export async function sendEmail({
  email, subject, message,
}: { email: string; subject: string; message: string }) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // For server usage, prefer a private key (ACCESS TOKEN) from EmailJS
    body: JSON.stringify({
      service_id: 'service_u5vbi42',
      template_id: 'template_tdqxoah',
      user_id: "LwWXTEu8hRY_80-og",     // or omit if using private key only
      accessToken: process.env.EMAILJS_PRIVATE_KEY, // recommended for server
      template_params: { email, subject, message },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`EmailJS failed: ${res.status} ${text}`);
  }
}
