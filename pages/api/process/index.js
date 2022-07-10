import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc().post(async (req, res) => {
  const { lecturer, criteria } = req.body;

  if (!lecturer || !criteria) {
    res.status(400).json({
      message: 'Bad Request',
    });
    return;
  }

  const grouped_criteria_lecturer = await prisma.criteria_lecturer.groupBy({
    by: ['id_lecturer'],
    where: {
      id_lecturer: {
        in: lecturer,
      },
    },
  });

  const list_group_criteria_lecturer = await Promise.all(
    grouped_criteria_lecturer.map((item) =>
      prisma.criteria_lecturer.findMany({
        where: {
          id_lecturer: item.id_lecturer,
          detail_criteria: {
            id_criteria: {
              in: criteria,
            },
          },
        },
        include: {
          detail_criteria: {
            include: {
              criteria: true,
            },
          },
          lecturer: true,
        },
        orderBy: {
          id_detail_criteria: 'asc',
        },
      })
    )
  );

  const calculation_data = list_group_criteria_lecturer.reduce(
    (previous, group_criteria_lecturer) => {
      return group_criteria_lecturer.map((criteria_lecturer, index) => {
        if (previous) {
          if (
            criteria_lecturer.detail_criteria.criteria.attribute === 'benefit'
          ) {
            if (
              previous[index].pivot < criteria_lecturer.detail_criteria.fuzzy
            ) {
              previous[index].pivot = criteria_lecturer.detail_criteria.fuzzy;
            }
          } else {
            if (
              previous[index].pivot > criteria_lecturer.detail_criteria.fuzzy
            ) {
              previous[index].pivot = criteria_lecturer.detail_criteria.fuzzy;
            }
          }

          return {
            ...previous[index],
          };
        } else {
          return {
            id_criteria: criteria_lecturer.detail_criteria.criteria.id_criteria,
            code: criteria_lecturer.detail_criteria.criteria.code_criteria,
            pivot: criteria_lecturer.detail_criteria.fuzzy,
          };
        }
      });
    },
    null
  );

  const normalized_list_group_criteria_lecturer =
    list_group_criteria_lecturer.map((group_criteria_lecturer) =>
      group_criteria_lecturer.map((criteria_lecturer, index) => {
        const rating =
          criteria_lecturer.detail_criteria.criteria.attribute === 'benefit'
            ? criteria_lecturer.detail_criteria.fuzzy /
              calculation_data[index].pivot
            : calculation_data[index].pivot /
              criteria_lecturer.detail_criteria.fuzzy;
        const saw = rating * criteria_lecturer.detail_criteria.criteria.weight;

        return {
          ...criteria_lecturer,
          rating,
          saw,
        };
      })
    );

  const total_saw = normalized_list_group_criteria_lecturer.map(
    (list_group_criteria_lecturer) => ({
      total_saw: list_group_criteria_lecturer.reduce(
        (previous, criteria_lecturer) => previous + criteria_lecturer.saw,
        0
      ),
      lecturer: list_group_criteria_lecturer[0].lecturer,
    })
  );

  const sorted_total_saw = total_saw.sort((a, b) => b.total_saw - a.total_saw);

  const sorted_total_saw_with_rank = sorted_total_saw.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  res.json(sorted_total_saw_with_rank);
});

export default handler;
