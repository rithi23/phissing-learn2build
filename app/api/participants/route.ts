import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  listParticipantInteractions,
  recordParticipantInteraction,
} from "@/lib/interactions";
import { hasForbiddenSensitiveFields } from "@/lib/utils";
import { participantInteractionSchema } from "@/lib/validations";

export async function GET() {
  const records = await listParticipantInteractions();
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
    const payload = participantInteractionSchema.parse(body);
    await recordParticipantInteraction(payload);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid interaction payload" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Unable to record interaction" },
      { status: 500 },
    );
  }
}
