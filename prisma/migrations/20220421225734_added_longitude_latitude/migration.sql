/*
  Warnings:

  - You are about to drop the column `duration` on the `authorizationRequests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authorizationRequests" DROP COLUMN "duration",
ADD COLUMN     "latitude" TEXT NOT NULL DEFAULT E'0',
ADD COLUMN     "longitude" TEXT NOT NULL DEFAULT E'0';

-- AlterTable
ALTER TABLE "placements" ADD COLUMN     "latitude" TEXT NOT NULL DEFAULT E'0',
ADD COLUMN     "longitude" TEXT NOT NULL DEFAULT E'0';
