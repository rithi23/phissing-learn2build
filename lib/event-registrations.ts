import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { EventRegistration } from "@/types";
import type { EventRegistrationValues } from "@/lib/validations";

const globalForEvents = globalThis as unknown as {
  demoEventRegistrations?: EventRegistration[];
};

const memoryStore = globalForEvents.demoEventRegistrations ?? [];
if (process.env.NODE_ENV !== "production") {
  globalForEvents.demoEventRegistrations = memoryStore;
}

function toRecord(row: {
  id: string;
  eventName: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  experience: string | null;
  projectIdea: string | null;
  skills: string | null;
  heardFrom: string | null;
  dietaryNeeds: string | null;
  tshirtSize: string | null;
  createdAt: Date;
}): EventRegistration {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function createEventRegistration(
  input: EventRegistrationValues,
) {
  const data = {
    eventName: input.eventName || "Build2Learn #38 Meetup",
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    organization: input.organization,
    role: input.role,
    experience: input.experience,
    projectIdea: input.projectIdea,
    skills: input.skills,
    heardFrom: input.heardFrom,
    dietaryNeeds: input.dietaryNeeds,
    tshirtSize: input.tshirtSize,
  };

  try {
    const created = await prisma.eventRegistration.create({ data });
    return toRecord(created);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError
    ) {
      const record: EventRegistration = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      memoryStore.unshift(record);
      return record;
    }
    throw error;
  }
}

export async function listEventRegistrations() {
  try {
    const rows = await prisma.eventRegistration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map(toRecord);
  } catch {
    return [...memoryStore].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1,
    );
  }
}
