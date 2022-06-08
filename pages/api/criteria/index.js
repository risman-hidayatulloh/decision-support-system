import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const criteria = await prisma.criteria.findMany();
    res.json(criteria);
  })
  .post(async (req, res) => {
    const { code_criteria, name_criteria, attribute, weight } = req.body;
    const criteria = await prisma.criteria.create({
      data: {
        code_criteria,
        name_criteria,
        attribute,
        weight,
      },
    });
    res.json(criteria);
  });

export default handler;
