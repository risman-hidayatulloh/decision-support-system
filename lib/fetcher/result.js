import axios from 'axios';

export const addResult = async (payload) => {
  const { data } = await axios.post(
    'http://localhost:3000/api/result/',
    payload
  );
  return data;
};
