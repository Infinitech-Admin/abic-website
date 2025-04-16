import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";

import AppointmentEmail from "@/emails/appointment";

export async function POST(req: Request) {
  const {
    name,
    sender_email,
    phone,
    properties,
    message,
    email,
    appointment_date,
    appointment_time,
  } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const emailHtml = await render(
    AppointmentEmail({
      name: name,
      sender_email: sender_email,
      phone: phone,
      properties,
      message: message,
      email: email,
      date: appointment_date,
      time: appointment_time,
    }),
  );

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Abic Realty Corp : New Property Appointment",
    html: emailHtml,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);

  return NextResponse.json({
    status: "success",
    message: "Email sent successfully",
  });
}
