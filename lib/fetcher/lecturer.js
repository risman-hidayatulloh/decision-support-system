import axios from 'axios';

export const getLecturers = async () => {
  const { data } = await axios.get('http://localhost:3000/api/lecturer');
  return data;
};

export const editLecturer = async (id, payload) => {
  const { data } = await axios.patch(
    `http://localhost:3000/api/lecturer/${id}`,
    payload
  );
  return data;
};

export const addLecturer = async (payload) => {
  const { data } = await axios.post(
    'http://localhost:3000/api/lecturer',
    payload
  );
  return data;
};

export const deleteLecturer = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:3000/api/lecturer/${id}`
  );
  return data;
};

export const getLecturer = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/api/lecturer/${id}`);
  return data;
};
