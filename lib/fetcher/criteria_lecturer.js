import axios from 'axios';

export const getCriteria_Lecturers = async () => {
  const { data } = await axios.get(
    'http://localhost:3000/api/criteria_lecturer'
  );
  return data;
};

export const getCriteriaByIdLecturer = async (id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/lecturer/${id}/criteria`
  );
  return data;
};
