import { TextField, Box, Button, Container } from '@mui/material';
import {
  editCriteria_Lecturer,
  getCriteria_Lecturer,
} from '../../lib/fetcher/criteria_lecturer';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import useSWR from 'swr';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

const EditCriteriaLecturer = () => {
  const router = useRouter();
  const { edit } = router.query;
  const { mutate } = useSWRConfig();

  const formik = useFormik({
    initialValues: {
      id_criteria_lecturer: 0,
      id_detail_criteria: 0,
      id_lecturer: 0,
    },
    validationSchema: yup.object({
      id_detail_criteria: yup.number().required('Detail harus diisi'),
      id_lecturer: yup.number().required('Dosen harus diisi'),
    }),
    onSubmit: async (values) => {
      try {
        await editCriteria_Lecturer(values.id_criteria_lecturer, values);
        router.back();
        mutate('/api/criteria_lecturer');
      } catch (error) {
        console.log(error);
      }
      console.log('values', values);
    },
  });

  const { data } = useSWR(
    edit ? `/api/criteria_lecturer/${edit}/criteria?${edit}` : null,
    () => getCriteria_Lecturer(edit)
  );

  const { setValues } = formik;

  useEffect(() => {
    if (data) {
      setValues(data);
      console.log('data', data);
    }
  }, [data]);

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        tes
      </Box>
    </Container>
  );
};

export default EditCriteriaLecturer;
