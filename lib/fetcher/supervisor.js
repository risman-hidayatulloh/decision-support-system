import axios from 'axios';

export const getSupervisors = async () => {
  const { data } = await axios.get('http://localhost:3000/api/supervisor');
  return data;
};

export const getSupervisorByIdStudent = async (id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/student/${id}/supervisor`
  );
  return data;
};
