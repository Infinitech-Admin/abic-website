import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import SubscriptionMail from "@/emails/newsletter";



export async function POST(req: Request) {
  const { name, sender_email, phone,  properties, message, email } =
    await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const emailHtml = await render(
    SubscriptionMail({
      email: email,
    }),
  );

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Abic Realty Corporation : Subscribed",
    html: emailHtml,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);

  return NextResponse.json({
    status: "success",
    message: "Email sent successfully",
  });
}
