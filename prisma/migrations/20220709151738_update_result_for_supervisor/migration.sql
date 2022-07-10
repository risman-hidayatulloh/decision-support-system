/*
  Warnings:

  - You are about to drop the column `id_lecturer` on the `result` table. All the data in the column will be lost.
  - You are about to drop the column `id_supervisor` on the `result` table. All the data in the column will be lost.
  - You are about to drop the `supervisor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `first_supervisor` to the `result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_supervisor` to the `result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "result" DROP CONSTRAINT "fk_75";

-- DropForeignKey
ALTER TABLE "result" DROP CONSTRAINT "fk_116";

-- DropForeignKey
ALTER TABLE "supervisor" DROP CONSTRAINT "fk_63";

-- DropIndex
DROP INDEX "fk_118";

-- DropIndex
DROP INDEX "fk_77";

-- AlterTable
ALTER TABLE "result" DROP COLUMN "id_lecturer",
DROP COLUMN "id_supervisor",
ADD COLUMN     "first_supervisor" INTEGER NOT NULL,
ADD COLUMN     "second_supervisor" INTEGER NOT NULL;

-- DropTable
DROP TABLE "supervisor";
