import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const dataset = await prisma.dataset.findMany({});
    res.json(dataset);
  })
  .post(async (req, res) => {
    try {
      const { id_dataset, id_student, id_lecturer, isStatus } = req.body;

      const dataset = await prisma.dataset.create({
        data: {
          id_dataset,
          id_student,
          id_lecturer,
          isStatus,
        },
      });
      res.json(dataset);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

export default handler;
