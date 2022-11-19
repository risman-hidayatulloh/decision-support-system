import axios from 'axios';

export const getStudents = async () => {
  const { data } = await axios.get(
    'https://decision-support-system-risman.vercel.app/api/student'
  );
  return data;
};

export const editStudent = async (id, payload) => {
  const { data } = await axios.patch(
    `https://decision-support-system-risman.vercel.app/api/student/${id}`,
    payload
  );
  return data;
};

export const addStudent = async (payload) => {
  const { data } = await axios.post(
    'https://decision-support-system-risman.vercel.app/api/student',
    payload
  );
  return data;
};

export const deleteStudent = async (id) => {
  const { data } = await axios.delete(
    `https://decision-support-system-risman.vercel.app/api/student/${id}`
  );
  return data;
};

export const getStudent = async (id) => {
  const { data } = await axios.get(
    `https://decision-support-system-risman.vercel.app/api/student/${id}`
  );
  return data;
};
