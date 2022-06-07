import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const student = await prisma.student.findMany();
    res.json(student);
  })
  .post(async (req, res) => {
    const { email, password, nim, name_student, thesis_title, expertise } =
      req.body;
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    const student = await prisma.student.create({
      data: {
        id_student: user.id,
        nim,
        name_student,
        thesis_title,
        expertise,
      },
    });
    res.json(student);
  });

export default handler;
