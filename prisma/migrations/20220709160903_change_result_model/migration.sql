/*
  Warnings:

  - You are about to drop the column `first_supervisor` on the `result` table. All the data in the column will be lost.
  - You are about to drop the column `second_supervisor` on the `result` table. All the data in the column will be lost.
  - Added the required column `id_supervisor` to the `result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "result" DROP COLUMN "first_supervisor",
DROP COLUMN "second_supervisor",
ADD COLUMN     "id_supervisor" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "fk_133" FOREIGN KEY ("id_supervisor") REFERENCES "lecturer"("id_lecturer") ON DELETE NO ACTION ON UPDATE NO ACTION;
