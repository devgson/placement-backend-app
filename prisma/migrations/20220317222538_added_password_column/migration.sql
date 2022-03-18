/*
  Warnings:

  - Added the required column `password` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `tutors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tutors" ADD COLUMN     "password" TEXT NOT NULL;
