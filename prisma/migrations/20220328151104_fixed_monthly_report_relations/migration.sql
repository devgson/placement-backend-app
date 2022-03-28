/*
  Warnings:

  - Added the required column `placementId` to the `placementMonthlyReports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "placementMonthlyReports" ADD COLUMN     "placementId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "placementMonthlyReports" ADD CONSTRAINT "placementMonthlyReports_placementId_fkey" FOREIGN KEY ("placementId") REFERENCES "placements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
