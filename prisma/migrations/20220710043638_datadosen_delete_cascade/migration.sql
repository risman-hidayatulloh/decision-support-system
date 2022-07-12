-- DropForeignKey
ALTER TABLE "criteria_lecturer" DROP CONSTRAINT "fk_101";

-- AddForeignKey
ALTER TABLE "criteria_lecturer" ADD CONSTRAINT "fk_101" FOREIGN KEY ("id_lecturer") REFERENCES "lecturer"("id_lecturer") ON DELETE CASCADE ON UPDATE CASCADE;
