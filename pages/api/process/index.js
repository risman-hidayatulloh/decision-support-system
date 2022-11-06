import nc from 'next-connect';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nc()
  .post(async (req, res) => {
    try {
      const { student, maxSupervisor } = req.body;
      //Rangking with KBK
      let grouped_criteria_lecturer = await prisma.criteria_lecturer.groupBy({
        by: ['id_lecturer'],
        where: {
          lecturer: {
            expertise: student.expertise,
          },
        },
      });

      const fist_supervisor_list = await prisma.lecturer.findMany({
        where: {
          id_lecturer: {
            in: grouped_criteria_lecturer.map((item) => item.id_lecturer),
          },
          result: {
            some: {
              ranking_results: 1,
            },
          },
        },
        select: {
          _count: {
            select: {
              result: true,
            },
          },
          name_lecturer: true,
          id_lecturer: true,
        },
      });

      const second_supervisor_list = await prisma.lecturer.findMany({
        where: {
          id_lecturer: {
            in: grouped_criteria_lecturer.map((item) => item.id_lecturer),
          },
          result: {
            some: {
              ranking_results: 2,
            },
          },
        },
        select: {
          _count: {
            select: {
              result: true,
            },
          },
          name_lecturer: true,
          id_lecturer: true,
        },
      });

      //Rangking with All Lecturer where > maxSupervisor

      let flag = false;

      fist_supervisor_list.forEach((first_supervisor) => {
        if (flag) return;

        if (first_supervisor._count.result >= maxSupervisor) {
          flag = true;
          return;
        }

        second_supervisor_list.forEach((second_supervisor) => {
          if (second_supervisor._count.result >= maxSupervisor) {
            flag = true;
            return;
          }

          if (
            first_supervisor.id_lecturer === second_supervisor.id_lecturer &&
            first_supervisor._count.result + second_supervisor._count.result >=
              maxSupervisor
          ) {
            flag = true;
            return;
          }
        });
      });

      if (flag) {
        grouped_criteria_lecturer = await prisma.criteria_lecturer.groupBy({
          by: ['id_lecturer'],
        });
      }

      const list_group_criteria_lecturer = await Promise.all(
        grouped_criteria_lecturer.map((item) =>
          prisma.criteria_lecturer.findMany({
            where: {
              id_lecturer: item.id_lecturer,
            },
            include: {
              detail_criteria: {
                include: {
                  criteria: true,
                },
              },
              lecturer: {
                include: {
                  result: true,
                },
              },
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
                criteria_lecturer.detail_criteria.criteria.attribute ===
                'benefit'
              ) {
                if (
                  previous[index].pivot <
                  criteria_lecturer.detail_criteria.fuzzy
                ) {
                  previous[index].pivot =
                    criteria_lecturer.detail_criteria.fuzzy;
                }
              } else {
                if (
                  previous[index].pivot >
                  criteria_lecturer.detail_criteria.fuzzy
                ) {
                  previous[index].pivot =
                    criteria_lecturer.detail_criteria.fuzzy;
                }
              }

              return {
                ...previous[index],
              };
            } else {
              return {
                id_criteria:
                  criteria_lecturer.detail_criteria.criteria.id_criteria,
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
            const saw =
              rating * criteria_lecturer.detail_criteria.criteria.weight;

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
          totalAsFirstSupervisor:
            list_group_criteria_lecturer[0].lecturer.result.filter(
              (item) => item.ranking_results === 1
            ).length,
          totalAsSecondSupervisor:
            list_group_criteria_lecturer[0].lecturer.result.filter(
              (item) => item.ranking_results === 2
            ).length,
        })
      );

      const sorted_total_saw = total_saw.sort(
        (a, b) => b.total_saw - a.total_saw
      );

      const sorted_total_saw_with_rank = sorted_total_saw.map(
        (item, index) => ({
          ...item,
          rank: index + 1,
        })
      );

      res.json(sorted_total_saw_with_rank);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  })

  .get(async (req, res) => {
    let grouped_criteria_lecturer = await prisma.criteria_lecturer.groupBy({
      by: ['id_lecturer'],
    });

    const fist_supervisor_list = await prisma.lecturer.findMany({
      where: {
        id_lecturer: {
          in: grouped_criteria_lecturer.map((item) => item.id_lecturer),
        },
        result: {
          some: {
            ranking_results: 1,
          },
        },
      },
      select: {
        _count: {
          select: {
            result: true,
          },
        },
        name_lecturer: true,
        id_lecturer: true,
      },
    });

    const list_group_criteria_lecturer = await Promise.all(
      grouped_criteria_lecturer.map((item) =>
        prisma.criteria_lecturer.findMany({
          where: {
            id_lecturer: item.id_lecturer,
          },
          include: {
            detail_criteria: {
              include: {
                criteria: true,
              },
            },
            lecturer: {
              include: {
                result: true,
              },
            },
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
              id_criteria:
                criteria_lecturer.detail_criteria.criteria.id_criteria,
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
          const saw =
            rating * criteria_lecturer.detail_criteria.criteria.weight;

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
        totalAsFirstSupervisor:
          list_group_criteria_lecturer[0].lecturer.result.filter(
            (item) => item.ranking_results === 1
          ).length,
        totalAsSecondSupervisor:
          list_group_criteria_lecturer[0].lecturer.result.filter(
            (item) => item.ranking_results === 2
          ).length,
      })
    );

    const sorted_total_saw = total_saw.sort(
      (a, b) => b.total_saw - a.total_saw
    );

    const sorted_total_saw_with_rank = sorted_total_saw.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    res.json(sorted_total_saw_with_rank);
  });

export default handler;
