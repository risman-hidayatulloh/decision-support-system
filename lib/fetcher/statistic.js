import axios from 'axios';

export const getStudentStatistics = async () => {
  const { data } = await axios.get(
    'http://localhost:3000/api/statistic/student'
  );
  return data;
};
