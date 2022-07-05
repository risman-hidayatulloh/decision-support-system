import { TextField, Box, Button, Container } from '@mui/material';
import { editCriteria, getCriteria } from '../../lib/fetcher/criteria';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import useSWR from 'swr';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

const EditCriteria = () => {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const { edit } = router.query;

  const formik = useFormik({
    initialValues: {
      id_criteria: 0,
      code_criteria: '',
      attribute: '',
      name_criteria: '',
      weight: 0,
    },
    validationSchema: yup.object({
      attribute: yup.string().required('Attribute is required'),
      name_criteria: yup.string().required('Name is required'),
      weight: yup.number().required('Weight is required'),
    }),
    onSubmit: async (values) => {
      try {
        await editCriteria(values.id_criteria, values);
        router.back();
        mutate('/api/criteria');
      } catch (error) {
        console.log(error);
      }
      console.log(values);
    },
  });

  const { data } = useSWR(edit ? `/api/criteria/${edit}` : null, () =>
    getCriteria(edit)
  );

  const { setValues } = formik;

  useEffect(() => {
    if (data) {
      setValues(data);
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
        <TextField
          id="name_criteria"
          label="Nama Kriteria"
          variant="standard"
          fullWidth
          value={formik.values.name_criteria}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.name_criteria && Boolean(formik.errors.name_criteria)
          }
          helperText={
            formik.touched.name_criteria
              ? formik.errors.name_criteria
                ? formik.errors.name_criteria
                : ' '
              : ' '
          }
        />

        <TextField
          id="attribute"
          label="Attribute"
          variant="standard"
          fullWidth
          value={formik.values.attribute}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.attribute && Boolean(formik.errors.attribute)}
          helperText={
            formik.touched.attribute
              ? formik.errors.attribute
                ? formik.errors.attribute
                : ' '
              : ' '
          }
        />

        <TextField
          id="weight"
          label="Bobot"
          variant="standard"
          fullWidth
          type="number"
          value={formik.values.weight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.weight && Boolean(formik.errors.weight)}
          helperText={
            formik.touched.weight
              ? formik.errors.weight
                ? formik.errors.weight
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
};

export default EditCriteria;
