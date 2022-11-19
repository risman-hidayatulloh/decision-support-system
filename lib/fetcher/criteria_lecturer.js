import axios from 'axios';
import { toast } from 'react-toastify';

export const getCriteria_Lecturers = async () => {
  const { data } = await axios.get(
    'https://decision-support-system-risman.vercel.app/api/criteria_lecturer'
  );
  return data;
};

export const editCriteria_Lecturer = async (id, payload) => {
  const { data } = await axios.patch(
    `https://decision-support-system-risman.vercel.app/api/criteria_lecturer/${id}`,
    payload
  );
  return data;
};

export const deleteCriteria_Lecturer = async (id) => {
  const { data } = await axios.delete(
    `https://decision-support-system-risman.vercel.app/api/criteria_lecturer/${id}`
  );
  return data;
};

export const getCriteria_Lecturer = async (id) => {
  const { data } = await axios.get(
    `https://decision-support-system-risman.vercel.app/api/criteria_lecturer/${id}`
  );

  return data;
};

export const getCriteriaByIdLecturer = async (id) => {
  const { data } = await axios.get(
    `https://decision-support-system-risman.vercel.app/api/lecturer/${id}/criteria`
  );
  return data;
};

export const addCriteria_Lecturer = async (payload) => {
  try {
    const { data } = await axios.post(
      `https://decision-support-system-risman.vercel.app/api/criteria_lecturer`,
      payload
    );
    toast.success('Berhasil di tambahkan');

    return data;
  } catch (error) {
    toast.error('Gagal, Data Sudah Ada');
  }
};
