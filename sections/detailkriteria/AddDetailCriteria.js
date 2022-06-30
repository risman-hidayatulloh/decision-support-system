import { TextField, Box, Button, Container } from '@mui/material';
import { addDetail_Criteria } from '../../lib/fetcher/detail_criteria';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import useSWR from 'swr';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

const AddDetailCriteria = () => {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const { id_criteria } = router.query;

  const formik = useFormik({
    initialValues: {
      description: '',
      fuzzy: 0,
      variable: '',
    },
    validationSchema: yup.object({
      description: yup.string().required('Keterangan harus diisi'),
      fuzzy: yup.number().required('Fuzzy harus diisi'),
      variable: yup.string().required('Variabel harus diisi'),
    }),
    onSubmit: async (values) => {
      try {
        await addDetail_Criteria(id_criteria, values);
        router.back();
        mutate(`/api/criteria/${id_criteria}/detail`);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
      }
      console.log(id_kriteria, values);
    },
  });

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
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={
            formik.touched.description
              ? formik.errors.description
                ? formik.errors.description
                : ' '
              : ' '
          }
        />
        <TextField
          id="fuzzy"
          label="Fuzzy"
          variant="standard"
          fullWidth
          type="number"
          step="any"
          value={formik.values.fuzzy}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fuzzy && Boolean(formik.errors.fuzzy)}
          helperText={
            formik.touched.fuzzy
              ? formik.errors.fuzzy
                ? formik.errors.fuzzy
                : ' '
              : ' '
          }
        />
        <TextField
          id="variable"
          label="Variabel"
          variant="standard"
          fullWidth
          value={formik.values.variable}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.variable && Boolean(formik.errors.variable)}
          helperText={
            formik.touched.variable
              ? formik.errors.variable
                ? formik.errors.variable
                : ' '
              : ' '
          }
        />
        <Button type="submit" variant="contained" fullWidth>
          Tambahkan
        </Button>
      </Box>
    </Container>
  );
};

export default AddDetailCriteria;
