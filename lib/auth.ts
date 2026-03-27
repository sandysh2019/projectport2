import { SignJWT, jwtVerify } from "jose";

function getKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(payload: { username: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getKey());
}

export async function verifyAdminToken(token: string) {
  const verified = await jwtVerify(token, getKey());
  return verified.payload as { username: string };
}
