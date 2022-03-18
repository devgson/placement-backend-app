/*
  Warnings:

  - The `status` column on the `authorizationRequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `registrationStatus` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationStatus` to the `tutors` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "authorizationRequests" DROP COLUMN "status",
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT E'pending';

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "registrationStatus" "ApplicationStatus" NOT NULL;

-- AlterTable
ALTER TABLE "tutors" ADD COLUMN     "registrationStatus" "ApplicationStatus" NOT NULL;

-- DropEnum
DROP TYPE "AuthorizationRequestStatus";
