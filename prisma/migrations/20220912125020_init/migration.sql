/*
  Warnings:

  - You are about to drop the column `detergentAmount` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `softenerAmount` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `detergentAmount` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `softenerAmount` on the `Vendor` table. All the data in the column will be lost.
  - Added the required column `detergent` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `softener` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "detergentAmount",
DROP COLUMN "softenerAmount",
ADD COLUMN     "detergent" INTEGER NOT NULL,
ADD COLUMN     "softener" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "detergentAmount",
DROP COLUMN "softenerAmount",
ADD COLUMN     "detergent" INTEGER NOT NULL DEFAULT 5000,
ADD COLUMN     "softener" INTEGER NOT NULL DEFAULT 5000;
