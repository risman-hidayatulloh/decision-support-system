import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const admin = await prisma.admin.findUnique({
      where: {
        id_admin: Number(id),
      },
    });
    res.json(admin);
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const { body } = req;
    const admin = await prisma.admin.update({
      where: {
        id_admin: Number(id),
      },
      data: body,
    });
    res.json(admin);
  })
  .post(async (req, res) => {
    const { id } = req.query;
    const admin = await prisma.admin.update({
      where: {
        id_admin: Number(id),
      },
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.json(admin);
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const admin = await prisma.admin.delete({
      where: {
        id_admin: Number(id),
      },
    });
    res.json(admin);
  });

export default handler;
