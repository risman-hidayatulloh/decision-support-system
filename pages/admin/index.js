import LayoutAdmin from '/components/Layout/Admin';
import dynamic from 'next/dynamic';
import { Typography, Box } from '@mui/material';

const ExpertiseChartStudent = dynamic(
  () => import('../../sections/admin/ExpertiseChartStudent'),
  {
    ssr: false,
  }
);

const Home = () => {
  return (
    <>
      <LayoutAdmin pageTitle="Home">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <ExpertiseChartStudent />
        </Box>
      </LayoutAdmin>
    </>
  );
};

export default Home;
