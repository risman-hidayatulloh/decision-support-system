import axios from 'axios';

export const getCriteria_Lecturers = async () => {
  const { data } = await axios.get(
    'http://localhost:3000/api/criteria_lecturer'
  );
  return data;
};

export const editCriteria_Lecturer = async (id, payload) => {
  const { data } = await axios.patch(
    `http://localhost:3000/api/criteria_lecturuer/${id}`,
    payload
  );
  return data;
};

export const deleteCriteria_Lecturer = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:3000/api/criteria_lecturuer/${id}`
  );
  return data;
};

export const getCriteria_Lecturer = async (id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/criteria_lecturuer/${id}`
  );

  return data;
};

export const getCriteriaByIdLecturer = async (id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/lecturer/${id}/criteria`
  );
  return data;
};

export const addCriteria_Lecturer = async (payload) => {
  const { data } = await axios.post(
    `http://localhost:3000/api/criteria_lecturer`,
    payload
  );

  return data;
};