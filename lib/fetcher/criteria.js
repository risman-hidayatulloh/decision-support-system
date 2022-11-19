import axios from 'axios';

export const getCriterias = async () => {
  const { data } = await axios.get(
    'https://decision-support-system-risman.vercel.app/api/criteria'
  );
  return data;
};

export const editCriteria = async (id, payload) => {
  const { data } = await axios.patch(
    `https://decision-support-system-risman.vercel.app/api/criteria/${id}`,
    payload
  );
  return data;
};

export const addCriteria = async (payload) => {
  const { data } = await axios.post(
    'https://decision-support-system-risman.vercel.app/api/criteria',
    payload
  );
  return data;
};

export const deleteCriteria = async (id) => {
  const { data } = await axios.delete(
    `https://decision-support-system-risman.vercel.app/api/criteria/${id}`
  );
  return data;
};

export const getCriteria = async (id) => {
  const { data } = await axios.get(
    `https://decision-support-system-risman.vercel.app/api/criteria/${id}`
  );
  return data;
};
