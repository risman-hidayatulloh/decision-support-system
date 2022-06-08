import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const student = await prisma.student.findUnique({
      where: {
        id_student: Number(id),
      },
    });
    res.json(student);
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const { body } = req;
    const student = await prisma.student.update({
      where: {
        id_student: Number(id),
      },
      data: body,
    });
    res.json(student);
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const student = await prisma.student.delete({
      where: {
        id_student: Number(id),
      },
    });
    res.json(student);
  });

export default handler;
