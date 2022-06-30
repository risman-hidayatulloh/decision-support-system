import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;
    const detail_criteria = await prisma.detail_criteria.findUnique({
      where: {
        id_detail_criteria: Number(id),
      },
    });
    //console.log(detail_criteria);
    res.json(detail_criteria);
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const { body } = req;
    const detail_criteria = await prisma.detail_criteria.update({
      where: {
        id_detail_criteria: Number(id),
      },
      data: body,
    });
    res.json(detail_criteria);
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const detail_criteria = await prisma.detail_criteria.delete({
      where: {
        id_detail_criteria: Number(id),
      },
    });
    res.json(detail_criteria);
  });

export default handler;
