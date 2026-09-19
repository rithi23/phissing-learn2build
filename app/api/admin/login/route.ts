import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminCredentials } from "@/lib/admin-auth";
import { adminLoginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter username and password" }, { status: 400 });
  }

  const expected = getAdminCredentials();
  const valid =
    parsed.data.username === expected.username &&
    parsed.data.password === expected.password;

  if (!valid) {
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
