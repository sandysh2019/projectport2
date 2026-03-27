import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { bootstrapData } from "@/lib/data";
import { Admin } from "@/lib/models";

export async function POST(request: Request) {
  await bootstrapData();
  const token = (await cookies()).get("admin_token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const payload = await verifyAdminToken(token);
    const body = await request.json();
    const newPassword = body.newPassword?.toString() || "";
    if (newPassword.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await Admin.updateOne({ username: payload.username }, { $set: { passwordHash } });
    return NextResponse.json({ message: "Password updated" });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
