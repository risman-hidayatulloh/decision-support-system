import { TextField, Box, Button, Container } from '@mui/material';
import { editStudent, getStudent } from '../../lib/fetcher/student';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import useSWR from 'swr';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

const EditMahasiswa = () => {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const { edit } = router.query;

  const formik = useFormik({
    initialValues: {
      id_student: 0,
      nim: '',
      name_student: '',
      thesis_title: '',
      expertise: '',
      document: '',
    },
    validationSchema: yup.object({
      nim: yup.string().required('NIM is required'),
      name_student: yup.string().required('Name is required'),
      thesis_title: yup.string().required('Thesis title is required'),
      expertise: yup.string().required('Expertise is required'),
      document: yup.string().required('Document is required'),
    }),
    onSubmit: async (values) => {
      try {
        await editStudent(values.id_student, values);
        router.back();
        mutate('/api/student');
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { data } = useSWR(edit ? `/api/student/${edit}` : null, () =>
    getStudent(edit)
  );

  const { setValues } = formik;

  useEffect(() => {
    if (data) {
      console.log(data);
      const { supervisor, id_user, ...tempValues } = data;
      console.log(tempValues);
      setValues(tempValues);
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
          id="nim"
          label="NIM"
          variant="standard"
          fullWidth
          value={formik.values.nim}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nim && Boolean(formik.errors.nim)}
          helperText={
            formik.touched.nim
              ? formik.errors.nim
                ? formik.errors.nim
                : ' '
              : ' '
          }
        />

        <TextField
          id="name_student"
          label="Nama Mahasiswa"
          variant="standard"
          fullWidth
          value={formik.values.name_student}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.name_student && Boolean(formik.errors.name_student)
          }
          helperText={
            formik.touched.name_student
              ? formik.errors.name_student
                ? formik.errors.name_student
                : ' '
              : ' '
          }
        />

        <TextField
          id="thesis_title"
          label="Judul Skripsi"
          variant="standard"
          fullWidth
          value={formik.values.thesis_title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.thesis_title && Boolean(formik.errors.thesis_title)
          }
          helperText={
            formik.touched.thesis_title
              ? formik.errors.thesis_title
                ? formik.errors.thesis_title
                : ' '
              : ' '
          }
        />

        <TextField
          id="expertise"
          label="Bidang Keahlian"
          variant="standard"
          fullWidth
          value={formik.values.expertise}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.expertise && Boolean(formik.errors.expertise)}
          helperText={
            formik.touched.expertise
              ? formik.errors.expertise
                ? formik.errors.expertise
                : ' '
              : ' '
          }
        />

        <TextField
          id="document"
          label="File Dokumen"
          variant="standard"
          fullWidth
          value={formik.values.document}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.document && Boolean(formik.errors.document)}
          helperText={
            formik.touched.document
              ? formik.errors.document
                ? formik.errors.document
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

export default EditMahasiswa;
