import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const user = await prisma.user.findUnique({
      where: {
        id_user: Number(id),
      },
    });
    res.json(user);
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const { body } = req;
    const user = await prisma.user.update({
      where: {
        id_user: Number(id),
      },
      data: body,
    });
    res.json(user);
  })
  .post(async (req, res) => {
    const { id } = req.query;
    const user = await prisma.user.update({
      where: {
        id_user: Number(id),
      },
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.json(user);
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const user = await prisma.user.delete({
      where: {
        id_user: Number(id),
      },
    });
    res.json(user);
  });

export default handler;
