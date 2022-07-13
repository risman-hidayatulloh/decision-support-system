import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc().get(async (req, res) => {
  try {
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

    if (!criteria_lecturer) {
      res.status(400).json({
        message: 'Bad Request',
      });
      return;
    }

    res.json(criteria_lecturer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default handler;
