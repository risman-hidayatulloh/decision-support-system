import { TextField, Box, Button, Container } from '@mui/material';
import { editLecturer, getLecturer } from '../../lib/fetcher/lecturer';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import useSWR from 'swr';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

const EditLecturer = () => {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const { edit } = router.query;

  const formik = useFormik({
    initialValues: {
      id_lecturer: 0,
      nip: '',
      name_lecturer: '',
      is_admin: '',
    },
    validationSchema: yup.object({
      nip: yup.string().required('NIP is required'),
      name_lecturer: yup.string().required('Name is required'),
    }),
    onSubmit: async (values) => {
      try {
        await editLecturer(values.id_lecturer, values);
        router.back();
        mutate('/api/lecturer');
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { data } = useSWR(edit ? `/api/lecturer/${edit}` : null, () =>
    getLecturer(edit)
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
          id="nip"
          label="NIP/NIDN"
          variant="standard"
          fullWidth
          value={formik.values.nip}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nip && Boolean(formik.errors.nip)}
          helperText={
            formik.touched.nip
              ? formik.errors.nip
                ? formik.errors.nip
                : ' '
              : ' '
          }
        />

        <TextField
          id="name_lecturer"
          label="Nama Dosen"
          variant="standard"
          fullWidth
          value={formik.values.name_lecturer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.name_lecturer && Boolean(formik.errors.name_lecturer)
          }
          helperText={
            formik.touched.name_lecturer
              ? formik.errors.name_lecturer
                ? formik.errors.name_lecturer
                : ' '
              : ' '
          }
        />

        <TextField
          id="is_admin"
          label="Admin"
          variant="standard"
          fullWidth
          value={formik.values.is_admin}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.is_admin && Boolean(formik.errors.is_admin)}
          helperText={
            formik.touched.is_admin
              ? formik.errors.is_admin
                ? formik.errors.is_admin
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

export default EditLecturer;
