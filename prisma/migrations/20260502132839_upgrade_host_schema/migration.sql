/*
  Warnings:

  - Added the required column `hostId` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "hostId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Host" ADD COLUMN     "expertiseTags" TEXT[],
ADD COLUMN     "foodInfo" JSONB,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "introVideoUrl" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "pricePerDay" INTEGER,
ADD COLUMN     "responseTime" TEXT,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "safetyScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "services" TEXT[],
ADD COLUMN     "specialties" TEXT[],
ADD COLUMN     "stayInfo" JSONB,
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "transportInfo" JSONB,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
