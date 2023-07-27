/*
  Warnings:

  - A unique constraint covering the columns `[pin]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "pin" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Agent_pin_key" ON "Agent"("pin");
