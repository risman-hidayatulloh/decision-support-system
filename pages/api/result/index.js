import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const list_of_students = await prisma.result.groupBy({
      by: ['id_student'],
    });

    const list_of_students_with_result = await Promise.all(
      list_of_students.map((student) =>
        prisma.result.findMany({
          where: {
            id_student: student.id_student,
          },
          include: {
            student: true,
            supervisor: true,
          },
        })
      )
    );

    const mapped_list = list_of_students_with_result.map(
      (student_with_result) => {
        return {
          student: student_with_result[0].student,
          first_supervisor: student_with_result.find(
            (result) => result.ranking_results === 1
          ).supervisor,
          second_supervisor: student_with_result.find(
            (result) => result.ranking_results === 2
          ).supervisor,
        };
      }
    );

    res.json(mapped_list);
  })
  .post(async (req, res) => {
    const result = await prisma.result.createMany({
      data: req.body,
    });
    res.json(result);
  });

export default handler;
