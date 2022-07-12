import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const supervisor = await prisma.supervisor.findUnique({
      where: {
        id_supervisor: Number(id),
      },
    });
    //console.log(supervisor);
    res.json(supervisor);
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const { body } = req;
    const supervisor = await prisma.supervisor.update({
      where: {
        id_supervisor: Number(id),
      },
      data: body,
    });
    res.json(supervisor);
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const supervisor = await prisma.supervisor.delete({
      where: {
        id_supervisor: Number(id),
      },
    });
    res.json(supervisor);
  });

export default handler;
