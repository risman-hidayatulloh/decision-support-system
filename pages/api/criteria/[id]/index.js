import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const criteria = await prisma.criteria.findUnique({
      where: {
        id_criteria: Number(id),
      },
      include: {
        detail_criteria: true,
      },
    });
    res.json(criteria);
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const { body } = req;
    const criteria = await prisma.criteria.update({
      where: {
        id_criteria: Number(id),
      },
      data: body,
    });
    res.json(criteria);
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const criteria = await prisma.criteria.delete({
      where: {
        id_criteria: Number(id),
      },
    });
    res.json(criteria);
  });

export default handler;
