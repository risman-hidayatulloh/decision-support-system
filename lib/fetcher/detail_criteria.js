import axios from 'axios';

export const getDetail_Criterias = async () => {
  const { data } = await axios.get('http://localhost:3000/api/detail_criteria');
  return data;
};

export const editDetail_Criteria = async (id, payload) => {
  const { data } = await axios.patch(
    `http://localhost:3000/api/detail_criteria/${id}`,
    payload
  );
  return data;
};

export const deleteDetail_Criteria = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:3000/api/detail_criteria/${id}`
  );
  //console.log(data);
  return data;
};

export const getDetailCriteria = async (id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/detail_criteria/${id}`
  );

  return data;
};

export const getDetailByIdCriteria = async (id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/criteria/${id}/detail`
  );
  return data;
};

export const addDetail_Criteria = async (id, payload) => {
  const { data } = await axios.post(
    `http://localhost:3000/api/criteria/${id}/detail`,
    payload
  );

  return data;
};
