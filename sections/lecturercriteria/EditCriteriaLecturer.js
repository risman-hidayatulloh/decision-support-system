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
      detail_criteria: null,
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
    },
  });

  const { data } = useSWR(edit ? `/api/criteria_lecturer/${edit}` : null, () =>
    getCriteria_Lecturer(edit)
  );

  const { setValues } = formik;

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  if (
    formik.values.detail_criteria &&
    formik.values.detail_criteria.description
  )
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
          <TextField
            id="description"
            label="Keterangan"
            variant="standard"
            fullWidth
            value={formik.values.detail_criteria?.description}
            onChange={(e) => {
              formik.setFieldValue('detail_criteria', {
                ...formik.values.detail_criteria,
                description: e.target.value,
              });
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.detail_criteria?.description &&
              Boolean(formik.errors.detail_criteria?.description)
            }
            helperText={
              formik.touched.detail_criteria?.description
                ? formik.errors.detail_criteria?.description
                  ? formik.errors.detail_criteria?.description
                  : ' '
                : ' '
            }
          />

          <Button type="submit" variant="contained" fullWidth>
            Ubah
          </Button>
        </Box>
      </Container>
    );

  return null;
};

export default EditCriteriaLecturer;
