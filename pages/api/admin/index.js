import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const admin = await prisma.admin.findMany();
    res.json(admin);
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    const admin = await prisma.admin.create({
      data: {
        email,
        password,
      },
    });
    res.json(admin);
  });

export default handler;
