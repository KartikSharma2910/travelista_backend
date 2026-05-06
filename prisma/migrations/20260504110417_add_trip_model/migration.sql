-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tripType" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "route" TEXT,
    "duration" TEXT,
    "maxTravelers" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "priceModel" TEXT NOT NULL,
    "includesFood" BOOLEAN NOT NULL,
    "includesStay" BOOLEAN NOT NULL,
    "includesActivities" BOOLEAN NOT NULL,
    "includesTransport" BOOLEAN NOT NULL,
    "tripDirection" TEXT NOT NULL,
    "highlights" TEXT[],
    "inclusions" TEXT[],
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
