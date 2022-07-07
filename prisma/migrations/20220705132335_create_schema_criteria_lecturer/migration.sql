/*
  Warnings:

  - You are about to drop the column `id_criteria` on the `criteria_lecturer` table. All the data in the column will be lost.
  - Added the required column `id_detail_criteria` to the `criteria_lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "criteria_lecturer" DROP CONSTRAINT "fk_88";

-- DropIndex
DROP INDEX "fk_90";

-- AlterTable
ALTER TABLE "criteria_lecturer" DROP COLUMN "id_criteria",
ADD COLUMN     "id_detail_criteria" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "fk_90" ON "criteria_lecturer"("id_detail_criteria");

-- AddForeignKey
ALTER TABLE "criteria_lecturer" ADD CONSTRAINT "fk_88" FOREIGN KEY ("id_detail_criteria") REFERENCES "detail_criteria"("id_detail_criteria") ON DELETE NO ACTION ON UPDATE NO ACTION;
