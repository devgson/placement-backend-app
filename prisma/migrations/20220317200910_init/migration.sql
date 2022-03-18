-- CreateEnum
CREATE TYPE "ScheduledVisitStatus" AS ENUM ('done', 'pending');

-- CreateEnum
CREATE TYPE "ScheduledVisitType" AS ENUM ('virtual', 'physical');

-- CreateEnum
CREATE TYPE "PlacementStatus" AS ENUM ('active', 'completed');

-- CreateEnum
CREATE TYPE "AuthorizationRequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutors" (
    "id" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tutors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "currentLevel" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorizationRequests" (
    "id" UUID NOT NULL,
    "companyName" TEXT NOT NULL,
    "companySector" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "potentialEndDate" TIMESTAMP(3) NOT NULL,
    "potentialStartDate" TIMESTAMP(3) NOT NULL,
    "requestForm" TEXT NOT NULL,
    "adminComment" VARCHAR(255) NOT NULL,
    "studentComment" VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AuthorizationRequestStatus" NOT NULL DEFAULT E'pending',
    "studentId" UUID NOT NULL,

    CONSTRAINT "authorizationRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placements" (
    "id" UUID NOT NULL,
    "companyName" TEXT NOT NULL,
    "companySector" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "status" "PlacementStatus" NOT NULL DEFAULT E'active',
    "scheduledVisitDate" TIMESTAMP(3) NOT NULL,
    "scheduledVisitType" "ScheduledVisitType" NOT NULL,
    "scheduledVisitStatus" "ScheduledVisitStatus" NOT NULL DEFAULT E'pending',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tutorId" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "authorizationRequestId" UUID NOT NULL,

    CONSTRAINT "placements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placementMonthlyReports" (
    "id" UUID NOT NULL,
    "month" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "placementMonthlyReports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tutors_email_key" ON "tutors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "placements_authorizationRequestId_key" ON "placements"("authorizationRequestId");

-- AddForeignKey
ALTER TABLE "authorizationRequests" ADD CONSTRAINT "authorizationRequests_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_authorizationRequestId_fkey" FOREIGN KEY ("authorizationRequestId") REFERENCES "authorizationRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
