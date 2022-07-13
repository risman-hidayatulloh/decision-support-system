import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const criteria_lecturer = await prisma.criteria_lecturer.findMany({
      include: {
        detail_criteria: {
          include: {
            criteria: true,
          },
        },
        lecturer: true,
      },
    });
    res.json(criteria_lecturer);
  })
  .post(async (req, res) => {
    try {
      const { id_detail_criteria, id_lecturer } = req.body;

      const detail_criteria = await prisma.detail_criteria.findFirst({
        where: {
          id_detail_criteria: id_detail_criteria,
        },
      });

      const isExist = await prisma.criteria_lecturer.findFirst({
        where: {
          id_lecturer,
          detail_criteria: {
            criteria: {
              id_criteria: detail_criteria?.id_criteria,
            },
          },
        },
      });

      if (isExist) {
        res.status(400).json({
          message: 'Bad Request',
        });
        return;
      }

      const criteria_lecturer = await prisma.criteria_lecturer.create({
        data: {
          id_detail_criteria,
          id_lecturer,
        },
      });
      res.json(criteria_lecturer);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
export default handler;
