import nc from 'next-connect';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc().get(async (req, res) => {
  const totalStudent = await prisma.student.count();
  const groupByExpertise = await prisma.student.groupBy({
    by: ['expertise'],
    _count: {
      expertise: true,
    },
  });

  res.json({
    totalStudent,
    groupByExpertise,
  });
});

export default handler;
