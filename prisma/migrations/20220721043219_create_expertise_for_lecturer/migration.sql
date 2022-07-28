/*
  Warnings:

  - Added the required column `expertise` to the `lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lecturer" ADD COLUMN     "expertise" VARCHAR(255) NOT NULL;
