import axios from 'axios';

export const getSupervisors = async () => {
  const { data } = await axios.get(
    'https://decision-support-system-risman.vercel.app/api/supervisor'
  );
  return data;
};

export const getSupervisorByIdStudent = async (id) => {
  const { data } = await axios.get(
    `https://decision-support-system-risman.vercel.app/api/student/${id}/supervisor`
  );
  return data;
};
