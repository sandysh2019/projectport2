import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { bootstrapData } from "@/lib/data";
import { signAdminToken } from "@/lib/auth";
import { Admin } from "@/lib/models";

export async function POST(request: Request) {
  await bootstrapData();
  const body = await request.json();
  const admin = await Admin.findOne({ username: body.username });
  if (!admin) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(body.password || "", admin.passwordHash);
  if (!valid) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const token = await signAdminToken({ username: admin.username });
  (await cookies()).set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ message: "Logged in" });
}
