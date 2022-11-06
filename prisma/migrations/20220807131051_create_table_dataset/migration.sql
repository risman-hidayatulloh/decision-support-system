-- CreateTable
CREATE TABLE "dataset" (
    "id_dataset" SERIAL NOT NULL,
    "id_student" INTEGER NOT NULL,
    "id_lecturer" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_153" PRIMARY KEY ("id_dataset")
);

-- AddForeignKey
ALTER TABLE "dataset" ADD CONSTRAINT "fk_169" FOREIGN KEY ("id_lecturer") REFERENCES "lecturer"("id_lecturer") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dataset" ADD CONSTRAINT "fk_163" FOREIGN KEY ("id_student") REFERENCES "student"("id_student") ON DELETE NO ACTION ON UPDATE NO ACTION;
