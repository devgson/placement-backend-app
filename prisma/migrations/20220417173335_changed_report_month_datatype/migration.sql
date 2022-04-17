/*
  Warnings:

  - Changed the type of `month` on the `placementMonthlyReports` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "placementMonthlyReports" DROP COLUMN "month",
ADD COLUMN     "month" TIMESTAMP(3) NOT NULL;
