-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendorID" TEXT NOT NULL,
    "softenerAmount" INTEGER NOT NULL DEFAULT 5000,
    "detergentAmount" INTEGER NOT NULL DEFAULT 5000,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_vendorID_key" ON "Vendor"("vendorID");
