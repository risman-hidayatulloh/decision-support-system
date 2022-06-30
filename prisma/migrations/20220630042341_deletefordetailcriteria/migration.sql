-- DropForeignKey
ALTER TABLE "detail_criteria" DROP CONSTRAINT "fk_69";

-- AddForeignKey
ALTER TABLE "detail_criteria" ADD CONSTRAINT "fk_69" FOREIGN KEY ("id_criteria") REFERENCES "criteria"("id_criteria") ON DELETE CASCADE ON UPDATE NO ACTION;
