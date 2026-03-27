import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";

export async function requireAdmin() {
  const token = (await cookies()).get("admin_token")?.value;
  if (!token) throw new Error("Unauthorized");
  await verifyAdminToken(token);
}
