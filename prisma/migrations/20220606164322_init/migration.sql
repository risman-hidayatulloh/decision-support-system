-- CreateTable
CREATE TABLE "criteria" (
    "id_criteria" SERIAL NOT NULL,
    "code_criteria" VARCHAR(255) NOT NULL,
    "name_criteria" VARCHAR(255) NOT NULL,
    "attribute" VARCHAR(255) NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "pk_36" PRIMARY KEY ("id_criteria")
);

-- CreateTable
CREATE TABLE "criteria_lecturer" (
    "id_criteria_lecturer" SERIAL NOT NULL,
    "id_criteria" INTEGER NOT NULL,
    "id_lecturer" INTEGER NOT NULL,

    CONSTRAINT "pk_80" PRIMARY KEY ("id_criteria_lecturer")
);

-- CreateTable
CREATE TABLE "detail_criteria" (
    "id_detail_criteria" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "id_criteria" INTEGER NOT NULL,
    "fuzzy" INTEGER NOT NULL,
    "variable" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_43" PRIMARY KEY ("id_detail_criteria")
);

-- CreateTable
CREATE TABLE "lecturer" (
    "id_lecturer" SERIAL NOT NULL,
    "nip" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "name_lecturer" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL,

    CONSTRAINT "pk_30" PRIMARY KEY ("id_lecturer")
);

-- CreateTable
CREATE TABLE "result" (
    "id_result" SERIAL NOT NULL,
    "ranking_results" INTEGER NOT NULL,
    "id_supervisor" INTEGER NOT NULL,
    "id_student" INTEGER NOT NULL,
    "id_lecturer" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "pk_49" PRIMARY KEY ("id_result")
);

-- CreateTable
CREATE TABLE "student" (
    "id_student" SERIAL NOT NULL,
    "nim" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "name_student" VARCHAR(255) NOT NULL,
    "thesis_title" VARCHAR(255) NOT NULL,
    "expertise" VARCHAR(255) NOT NULL,
    "document" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_14" PRIMARY KEY ("id_student")
);

-- CreateTable
CREATE TABLE "supervisor" (
    "id_supervisor" SERIAL NOT NULL,
    "supervisor" VARCHAR(255) NOT NULL,
    "id_student" INTEGER NOT NULL,

    CONSTRAINT "pk_21" PRIMARY KEY ("id_supervisor")
);

-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_5" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE INDEX "fk_103" ON "criteria_lecturer"("id_lecturer");

-- CreateIndex
CREATE INDEX "fk_90" ON "criteria_lecturer"("id_criteria");

-- CreateIndex
CREATE INDEX "fk_71" ON "detail_criteria"("id_criteria");

-- CreateIndex
CREATE INDEX "fk_123" ON "lecturer"("id_user");

-- CreateIndex
CREATE INDEX "fk_109" ON "result"("id_student");

-- CreateIndex
CREATE INDEX "fk_118" ON "result"("id_supervisor");

-- CreateIndex
CREATE INDEX "fk_77" ON "result"("id_lecturer");

-- CreateIndex
CREATE INDEX "fk_55" ON "student"("id_user");

-- CreateIndex
CREATE INDEX "fk_65" ON "supervisor"("id_student");

-- AddForeignKey
ALTER TABLE "criteria_lecturer" ADD CONSTRAINT "fk_88" FOREIGN KEY ("id_criteria") REFERENCES "criteria"("id_criteria") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "criteria_lecturer" ADD CONSTRAINT "fk_101" FOREIGN KEY ("id_lecturer") REFERENCES "lecturer"("id_lecturer") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_criteria" ADD CONSTRAINT "fk_69" FOREIGN KEY ("id_criteria") REFERENCES "criteria"("id_criteria") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lecturer" ADD CONSTRAINT "fk_121" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "fk_75" FOREIGN KEY ("id_lecturer") REFERENCES "lecturer"("id_lecturer") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "fk_107" FOREIGN KEY ("id_student") REFERENCES "student"("id_student") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "fk_116" FOREIGN KEY ("id_supervisor") REFERENCES "supervisor"("id_supervisor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "fk_53" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supervisor" ADD CONSTRAINT "fk_63" FOREIGN KEY ("id_student") REFERENCES "student"("id_student") ON DELETE NO ACTION ON UPDATE NO ACTION;
