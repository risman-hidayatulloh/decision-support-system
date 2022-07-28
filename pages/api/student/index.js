import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const student = await prisma.student.findMany({
      orderBy: {
        expertise: 'asc',
      },
    });
    res.json(student);
  })
  .post(async (req, res) => {
    const {
      email,
      password,
      nim,
      name_student,
      thesis_title,
      expertise,
      document,
    } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    const student = await prisma.student.create({
      data: {
        id_user: user.id_user,
        nim,
        name_student,
        thesis_title,
        expertise,
        document,
      },
    });
    res.json(student);
  });

export default handler;
