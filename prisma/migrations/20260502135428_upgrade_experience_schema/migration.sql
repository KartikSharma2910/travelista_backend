-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;
