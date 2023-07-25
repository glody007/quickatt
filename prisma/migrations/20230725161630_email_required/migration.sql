/*
  Warnings:

  - Made the column `email` on table `Agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "email" SET NOT NULL;
