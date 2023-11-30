import { WelcomeEmail } from "@/components/welcome";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { userName, email } = await request.json();

  try {
    await resend.emails.send({
      from: "email@mail.magickeyboard.dev",
      to: [email],
      subject: "Magic",
      react: WelcomeEmail({
        userName,
      }),
    });
    return NextResponse.json(
      {
        status: "Ok",
      },
      {
        status: 200,
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`Failed to send email: ${e.message}`);
    }
    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}
