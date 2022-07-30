import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc().get(async (req, res) => {
  const { id } = req.query;
  const result = await prisma.result.findMany({
    where: {
      id_student: Number(id),
    },
  });

  res.json(result);
});

export default handler;
