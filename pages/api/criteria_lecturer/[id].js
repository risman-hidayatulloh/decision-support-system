import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const criteria_lecturer = await prisma.criteria_lecturer.findUnique({
      where: {
        id_criteria_lecturer: Number(id),
      },
    });
    res.json(criteria_lecturer);
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const { body } = req;
    const criteria_lecturer = await prisma.criteria_lecturer.update({
      where: {
        id_criteria_lecturer: Number(id),
      },
      data: body,
    });
    res.json(criteria_lecturer);
  })

  .delete(async (req, res) => {
    const { id } = req.query;
    const criteria_lecturer = await prisma.criteria_lecturer.delete({
      where: {
        id_criteria_lecturer: Number(id),
      },
    });
    res.json(criteria_lecturer);
  });

export default handler;
