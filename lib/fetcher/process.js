import axios from 'axios';

export const processData = async (
  lecturer,
  criteria,
  student,
  maxSupervisor
) => {
  const { data } = await axios.post(
    'https://decision-support-system-risman.vercel.app/api/process',
    {
      lecturer: lecturer?.map((item) => item.id_lecturer),
      criteria: criteria?.map((item) => item.id_criteria),
      student,
      maxSupervisor,
    }
  );
  return data;
};

export const getProcess = async (id) => {
  const { data } = await axios.get(
    `https://decision-support-system-risman.vercel.app/api/process/${id}`
  );
  return data;
};

export const getProcessQuota = async () => {
  const { data } = await axios.get(
    'https://decision-support-system-risman.vercel.app/api/process'
  );
  return data;
};
