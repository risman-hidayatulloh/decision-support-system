import axios from 'axios';

export const addResult = async (payload) => {
  try {
    const { data } = await axios.post(
      'http://localhost:3000/api/result/',
      payload
    );
    return data;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getStudentResult = async (id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/student/${id}/result`
  );
  return data;
};
