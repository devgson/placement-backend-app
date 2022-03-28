-- AlterTable
ALTER TABLE "authorizationRequests" ALTER COLUMN "adminComment" DROP NOT NULL,
ALTER COLUMN "studentComment" DROP NOT NULL;
