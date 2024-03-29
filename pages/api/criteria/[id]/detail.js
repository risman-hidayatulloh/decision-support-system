import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const detail_criteria = await prisma.detail_criteria.findMany({
      where: {
        criteria: {
          id_criteria: Number(id),
        },
      },
      orderBy: {
        fuzzy: 'desc',
      },
    });
    res.json(detail_criteria);
  })
  .post(async (req, res) => {
    const { description, fuzzy, variable } = req.body;
    const { id } = req.query;
    const detail_criteria = await prisma.detail_criteria.create({
      data: {
        description,
        fuzzy,
        variable,
        id_criteria: Number(id),
      },
    });
    res.json(detail_criteria);
  });

export default handler;
