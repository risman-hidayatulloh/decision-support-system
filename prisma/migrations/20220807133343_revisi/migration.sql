/*
  Warnings:

  - You are about to drop the column `status` on the `dataset` table. All the data in the column will be lost.
  - Added the required column `isStatus` to the `dataset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dataset" DROP COLUMN "status",
ADD COLUMN     "isStatus" VARCHAR(255) NOT NULL;
