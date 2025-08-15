import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import {Client as QstashClient} from "@upstash/qstash";
import emailjs from "@emailjs/browser"

export const workflowClient = new WorkflowClient({
  baseUrl : config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({email, subject, message}:{
  email: string,
  subject: string,
  message: string
}) =>{
  await emailjs.send(
    'service_u5vbi42',
    'template_tdqxoah',
    {
      email: email,
      subject: subject,
      message: message
    },
    'LwWXTEu8hRY_80-og'
  )
}
