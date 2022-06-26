import axios from 'axios';

export const getStudents = async () => {
  const { data } = await axios.get('http://localhost:3000/api/student');
  return data;
};

export const editStudent = async (id, payload) => {
  const { data } = await axios.put(
    `http://localhost:3000/api/student/${id}`,
    payload
  );
  return data;
};

export const deleteStudent = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:3000/api/student/${id}`
  );
  return data;
};
