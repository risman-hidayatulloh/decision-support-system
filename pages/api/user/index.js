import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    res.json(user);
  });

export default handler;
