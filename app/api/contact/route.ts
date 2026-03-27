import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid form payload" }, { status: 400 });
    }

    if (!resend) {
      return NextResponse.json({ message: "Email service is not configured yet" }, { status: 500 });
    }

    const to = process.env.CONTACT_TO_EMAIL || "santhoshwe2007@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    await resend.emails.send({
      from,
      to,
      subject: `Portfolio inquiry from ${parsed.data.name}`,
      html: `<p><strong>Name:</strong> ${parsed.data.name}</p><p><strong>Email:</strong> ${parsed.data.email}</p><p><strong>Message:</strong><br/>${parsed.data.message}</p>`,
    });

    await resend.emails.send({
      from,
      to: parsed.data.email,
      subject: "Thanks for reaching out to Santhosh",
      html: "<p>Your message has been received. I will get back to you shortly.</p>",
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch {
    return NextResponse.json({ message: "Could not send message" }, { status: 500 });
  }
}
