import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const supervisor = await prisma.supervisor.findMany();
    res.json(supervisor);
  })
  .post(async (req, res) => {
    const { supervisor1, supervisor2 } = req.body;
    const supervisor = await prisma.supervisor.create({
      data: {
        supervisor1,
        supervisor2,
      },
    });
    res.json(supervisor);
  });

export default handler;
