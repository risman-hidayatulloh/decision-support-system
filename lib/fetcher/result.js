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
