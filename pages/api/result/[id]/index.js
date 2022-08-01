import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc().delete(async (req, res) => {
  const { id } = req.query;
  const result = await prisma.result.delete({
    where: {
      id_result: Number(id),
    },
  });
  res.json(result);
});

export default handler;
