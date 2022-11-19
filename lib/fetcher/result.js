import axios from 'axios';

export const getResults = async () => {
  try {
    const { data } = await axios.get(
      'https://decision-support-system-risman.vercel.app/api/result'
    );
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
};

export const addResult = async (payload) => {
  try {
    const { data } = await axios.post(
      'https://decision-support-system-risman.vercel.app/api/result/',
      payload
    );
    return data;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getStudentResult = async (id) => {
  const { data } = await axios.get(
    `https://decision-support-system-risman.vercel.app/api/student/${id}/result`
  );
  return data;
};
