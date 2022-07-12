import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc().get(async (req, res) => {
  //ref lecturer [id] criteria
  const { id } = req.query;
  const criteria_lecturer = await prisma.criteria_lecturer.findMany({
    where: {
      lecturer: {
        id_lecturer: Number(id),
      },
    },
    include: {
      detail_criteria: {
        include: {
          criteria: true,
        },
      },
      //lecturer: true,
    },
  });
  res.json(criteria_lecturer);
});

export default handler;
