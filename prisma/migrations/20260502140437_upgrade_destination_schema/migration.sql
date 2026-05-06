-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "avgTemp" TEXT,
ADD COLUMN     "bestSeason" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "experienceTags" TEXT[],
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "hostCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sites" JSONB,
ADD COLUMN     "tagline" TEXT;
