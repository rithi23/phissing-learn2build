-- CreateEnum
CREATE TYPE "InteractionAction" AS ENUM ('LOGIN', 'REGISTER', 'PASSWORD_RESET');

-- CreateTable
CREATE TABLE "ParticipantInteraction" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "action" "InteractionAction" NOT NULL,
    "passwordEntered" BOOLEAN NOT NULL DEFAULT false,
    "passwordLength" INTEGER,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ParticipantInteraction_email_idx" ON "ParticipantInteraction"("email");

-- CreateIndex
CREATE INDEX "ParticipantInteraction_action_idx" ON "ParticipantInteraction"("action");

-- CreateIndex
CREATE INDEX "ParticipantInteraction_createdAt_idx" ON "ParticipantInteraction"("createdAt");
