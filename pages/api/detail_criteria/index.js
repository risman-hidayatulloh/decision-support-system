import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const detail_criteria = await prisma.detail_criteria.findMany();
    res.json(detail_criteria);
  })
  .post(async (req, res) => {
    const { description, fuzzy, variable } = req.body;
    const detail_criteria = await prisma.detail_criteria.create({
      data: {
        description,
        fuzzy,
        variable,
      },
    });
    res.json(detail_criteria);
  });

export default handler;
