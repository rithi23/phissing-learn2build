import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { InteractionAction, ParticipantInteraction } from "@/types";
import type { ParticipantInteractionInput } from "@/lib/validations";

type MemoryRecord = ParticipantInteraction;

const globalForStore = globalThis as unknown as {
  demoInteractions?: MemoryRecord[];
};

const memoryStore = globalForStore.demoInteractions ?? [];
if (process.env.NODE_ENV !== "production") {
  globalForStore.demoInteractions = memoryStore;
}

function toIso(date: Date) {
  return date.toISOString();
}

function fromPrisma(record: {
  id: string;
  name: string | null;
  email: string | null;
  action: InteractionAction;
  passwordEntered: boolean;
  passwordLength: number | null;
  sessionId: string;
  createdAt: Date;
}): ParticipantInteraction {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    action: record.action,
    passwordEntered: record.passwordEntered,
    passwordLength: record.passwordLength,
    sessionId: record.sessionId,
    createdAt: toIso(record.createdAt),
  };
}

function createMemoryRecord(
  input: ParticipantInteractionInput,
): MemoryRecord {
  return {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    action: input.action,
    passwordEntered: input.passwordEntered,
    passwordLength: input.passwordLength ?? null,
    sessionId: input.sessionId,
    createdAt: new Date().toISOString(),
  };
}

export async function recordParticipantInteraction(
  input: ParticipantInteractionInput,
) {
  try {
    const created = await prisma.participantInteraction.create({
      data: {
        name: input.name,
        email: input.email,
        action: input.action,
        passwordEntered: input.passwordEntered,
        passwordLength: input.passwordLength,
        sessionId: input.sessionId,
      },
    });
    return fromPrisma(created);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError
    ) {
      const record = createMemoryRecord(input);
      memoryStore.unshift(record);
      return record;
    }
    throw error;
  }
}

export async function listParticipantInteractions() {
  try {
    const records = await prisma.participantInteraction.findMany({
      orderBy: { createdAt: "desc" },
    });
    return records.map(fromPrisma);
  } catch {
    return [...memoryStore].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1,
    );
  }
}
