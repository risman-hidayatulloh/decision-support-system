import axios from 'axios';

export const processData = async (lecturer, criteria, student) => {
  const { data } = await axios.post('http://localhost:3000/api/process', {
    lecturer: lecturer.map((item) => item.id_lecturer),
    criteria: criteria.map((item) => item.id_criteria),
    student,
  });
  return data;
};

export const getProcess = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/api/process/${id}`);
  return data;
};
