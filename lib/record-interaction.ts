import type { InteractionAction } from "@/types";
import { getOrCreateSessionId } from "@/lib/session";

type RecordInteractionInput = {
  name?: string;
  email: string;
  action: InteractionAction;
  passwordEntered: boolean;
  passwordLength?: number;
};

export async function recordInteraction(input: RecordInteractionInput) {
  const response = await fetch("/api/participants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      action: input.action,
      passwordEntered: input.passwordEntered,
      passwordLength: input.passwordLength,
      sessionId: getOrCreateSessionId(),
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to record this demo interaction.");
  }
}
