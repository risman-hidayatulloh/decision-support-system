import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const lecturer = await prisma.lecturer.findUnique({
      where: {
        id_lecturer: Number(id),
      },
    });
    res.json(lecturer);
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const { body } = req;
    const lecturer = await prisma.lecturer.update({
      where: {
        id_lecturer: Number(id),
      },
      data: body,
    });
    res.json(lecturer);
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const lecturer = await prisma.lecturer.delete({
      where: {
        id_lecturer: Number(id),
      },
    });
    res.json(lecturer);
  });

export default handler;
