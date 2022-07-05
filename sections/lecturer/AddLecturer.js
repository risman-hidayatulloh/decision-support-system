import { TextField, Box, Button, Container } from '@mui/material';
import { addLecturer } from '../../lib/fetcher/lecturer';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useSWR, { useSWRConfig } from 'swr';

const AddLecturer = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const formik = useFormik({
    initialValues: {
      nip: '',
      name_lecturer: '',
      is_admin: false,
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      nip: yup.string().required('NIP is required'),
      name_lecturer: yup.string().required('Name is required'),
    }),
    onSubmit: async (values) => {
      try {
        await addLecturer(values);
        router.back();
        mutate('/api/lecturer');
      } catch (error) {
        console.log(error);
      }
      console.log(values);
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
        <TextField
          id="email"
          label="Email"
          variant="standard"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email
              ? formik.errors.email
                ? formik.errors.email
                : ' '
              : ' '
          }
        />

        <TextField
          id="password"
          label="Password"
          variant="standard"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            formik.touched.password
              ? formik.errors.password
                ? formik.errors.password
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

export default AddLecturer;
