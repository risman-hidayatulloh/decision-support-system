import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const supervisor = await prisma.supervisor.findMany({
      where: {
        student: {
          id_student: Number(id),
        },
      },
    });
    res.json(supervisor);
  })
  .post(async (req, res) => {
    const { supervisor1, supervisor2 } = req.body;
    const { id } = req.query;
    const supervisor = await prisma.supervisor.create({
      data: {
        supervisor1,
        supervisor2,
        id_student: Number(id),
      },
    });
    res.json(supervisor);
  });

export default handler;
