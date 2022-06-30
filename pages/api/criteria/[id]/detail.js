import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc().get(async (req, res) => {
  const { id } = req.query;
  const detail_criteria = await prisma.detail_criteria.findMany({
    where: {
      criteria: {
        id_criteria: Number(id),
      },
    },
  });
  res.json(detail_criteria);
});

export default handler;
