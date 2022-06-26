import axios from 'axios';

export const getLecturers = async () => {
  const { data } = await axios.get('http://localhost:3000/api/lecturer');
  return data;
};

export const editLecturer = async (id, payload) => {
  const { data } = await axios.put(
    `http://localhost:3000/api/lecturer/${id}`,
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
