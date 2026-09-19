import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createEventRegistration,
  listEventRegistrations,
} from "@/lib/event-registrations";
import { hasForbiddenSensitiveFields } from "@/lib/utils";
import { eventRegistrationSchema } from "@/lib/validations";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const records = await listEventRegistrations();
  return NextResponse.json({ records });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (hasForbiddenSensitiveFields(body)) {
    return NextResponse.json(
      { error: "Sensitive fields are not accepted" },
      { status: 400 },
    );
  }

  try {
    const payload = eventRegistrationSchema.parse(body);
    const record = await createEventRegistration(payload);
    return NextResponse.json({ success: true, id: record.id });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid registration payload" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Unable to save registration" },
      { status: 500 },
    );
  }
}
