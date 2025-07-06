/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "EventSubmission" (
    "id" TEXT NOT NULL,
    "partyType" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "venue" TEXT,
    "venueAddress" TEXT,
    "events" TEXT[],
    "theme" TEXT,
    "colors" TEXT,
    "fonts" TEXT,
    "mainMessage" TEXT,
    "countdown" BOOLEAN NOT NULL,
    "hasPhotos" BOOLEAN NOT NULL,
    "backgroundMedia" TEXT,
    "backgroundMediaType" TEXT NOT NULL,
    "music" BOOLEAN NOT NULL,
    "rsvp" BOOLEAN NOT NULL,
    "rsvpFields" TEXT[],
    "rsvpDestination" TEXT NOT NULL,
    "registryLink" TEXT,
    "accommodationInfo" TEXT,
    "dressCode" TEXT,
    "faq" TEXT,
    "customDomain" TEXT,
    "privacy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventSubmission_pkey" PRIMARY KEY ("id")
);
