import axios from 'axios';

export const getCriterias = async () => {
  const { data } = await axios.get('http://localhost:3000/api/criteria');
  return data;
};

export const editCriteria = async (id, payload) => {
  const { data } = await axios.patch(
    `http://localhost:3000/api/criteria/${id}`,
    payload
  );
  return data;
};

export const deleteCriteria = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:3000/api/criteria/${id}`
  );
  return data;
};

export const getCriteria = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/api/criteria/${id}`);
  return data;
};
