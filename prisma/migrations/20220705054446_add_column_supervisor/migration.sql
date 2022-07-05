/*
  Warnings:

  - You are about to drop the column `supervisor` on the `supervisor` table. All the data in the column will be lost.
  - Added the required column `supervisor1` to the `supervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisor2` to the `supervisor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "supervisor" DROP COLUMN "supervisor",
ADD COLUMN     "supervisor1" VARCHAR(255) NOT NULL,
ADD COLUMN     "supervisor2" VARCHAR(255) NOT NULL;
