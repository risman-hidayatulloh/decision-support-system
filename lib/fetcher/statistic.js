import axios from 'axios';

export const getStudentStatistics = async () => {
  const { data } = await axios.get(
    'https://decision-support-system-risman.vercel.app/api/statistic/student'
  );
  return data;
};
