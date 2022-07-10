import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const result = await prisma.result.findMany();
    res.json(result);
  })
  .post(async (req, res) => {
    const result = await prisma.result.createMany({
      data: req.body,
    });
    res.json(result);
  });

export default handler;
