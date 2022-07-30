import useSWR from 'swr';

import { getStudentStatistics } from '../../lib/fetcher/statistic';
import { Card, Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useMemo } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExpertiseChartStudent = () => {
  const { data } = useSWR('/api/statistic/student', getStudentStatistics);

  const chartData = useMemo(() => {
    if (data) {
      return data.groupByExpertise.map((item) => ({
        name: item.expertise,
        value: item._count.expertise,
      }));
    }
    return undefined;
  }, [data]);

  if (!chartData) return null;

  return (
    <Card variant="outlined" sx={{ width: 300, height: 300 }}>
      <Typography align={'center'}>Mahasiswa</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ExpertiseChartStudent;
