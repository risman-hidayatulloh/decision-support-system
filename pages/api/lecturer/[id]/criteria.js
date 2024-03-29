import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  // .get(async (req, res) => {
  //   const criteria_lecturer = await prisma.criteria_lecturer.findMany({
  //     include: {
  //       detail_criteria: {
  //         include: {
  //           criteria: true,
  //         },
  //       },
  //       lecturer: true,
  //     },
  //   });
  //   res.json(criteria_lecturer);
  // })
  // .get(async (req, res) => {
  //   const { id } = req.query;
  //   const criteria_lecturer = await prisma.criteria_lecturer.findMany({
  //     where: {
  //       lecturer: {
  //         id_lecturer: Number(id),
  //       },
  //     },
  //     include: {
  //       detail_criteria: {
  //         include: {
  //           criteria: true,
  //         },
  //       },
  //     },
  //   });
  //   res.json(criteria_lecturer);
  // })
  .get(async (req, res) => {
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
            criteria: {
              select: {
                id_criteria: true,
                code_criteria: true,
                name_criteria: true,
                attribute: true,
                weight: true,
              },
            },
          },
        },
      },
    });
    res.json(criteria_lecturer);
  })
  .post(async (req, res) => {
    const { id } = req.query;
    const { id_detail_criteria } = req.body;
    const criteria_lecturer = await prisma.criteria_lecturer.create({
      data: {
        id_detail_criteria,
        id_lecturer: Number(id),
      },
    });
    res.json(criteria_lecturer);
  });
export default handler;
