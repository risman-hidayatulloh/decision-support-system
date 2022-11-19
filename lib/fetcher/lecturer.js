import axios from 'axios';

export const getLecturers = async () => {
  const { data } = await axios.get(
    'https://decision-support-system-risman.vercel.app/api/lecturer'
  );
  return data;
};

export const editLecturer = async (id, payload) => {
  const { data } = await axios.patch(
    `https://decision-support-system-risman.vercel.app/api/lecturer/${id}`,
    payload
  );
  return data;
};

export const addLecturer = async (payload) => {
  const { data } = await axios.post(
    'https://decision-support-system-risman.vercel.app/api/lecturer',
    payload
  );
  return data;
};

export const deleteLecturer = async (id) => {
  const { data } = await axios.delete(
    `https://decision-support-system-risman.vercel.app/api/lecturer/${id}`
  );
  return data;
};

export const getLecturer = async (id) => {
  const { data } = await axios.get(
    `https://decision-support-system-risman.vercel.app/api/lecturer/${id}`
  );
  return data;
};
