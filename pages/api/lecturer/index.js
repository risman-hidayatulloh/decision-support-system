import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const lecturer = await prisma.lecturer.findMany();
    res.json(lecturer);
  })
  .post(async (req, res) => {
    const { email, password, nip, name_lecturer, is_admin } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    const lecturer = await prisma.lecturer.create({
      data: {
        id_user: user.id_user,
        nip,
        name_lecturer,
        is_admin,
      },
    });
    res.json(lecturer);
  });

export default handler;
