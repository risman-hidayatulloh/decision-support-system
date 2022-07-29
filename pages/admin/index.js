import { Typography } from '@mui/material';
import LayoutAdmin from '/components/Layout/Admin';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// //import { getStudents } from '../../lib/fetcher/student';

const data2 = [
  { name: 'Group A', value: 400, fill: '#8884d8' },
  { name: 'Group B', value: 300, fill: '#83a6ed' },
  { name: 'Group C', value: 300, fill: '#8dd1e1' },
  { name: 'Group D', value: 200, fill: '#82ca9d' },
  { name: 'Group E', value: 278, fill: '#a4de6c' },
  { name: 'Group F', value: 189, fill: '#ffc658' },
];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//const { data } = useSWR('/api/student', getStudents);

//console.log(data);

const Home = () => {
  return (
    <>
      <LayoutAdmin pageTitle="Home">
        <Typography>Home</Typography>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={1000} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data2}
              cx={200}
              cy={200}
              outerRadius={80}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </LayoutAdmin>
    </>
  );
};

export default Home;
