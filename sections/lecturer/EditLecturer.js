import { TextField, Box, Button, Container } from '@mui/material';
import { editLecturer, getLecturer } from '../../lib/fetcher/lecturer';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const EditLecturer = () => {
  const router = useRouter();
  const { edit } = router.query;
  const { mutate } = useSWRConfig();

  const formik = useFormik({
    initialValues: {
      id_lecturer: 0,
      nip: '',
      name_lecturer: '',
      is_admin: '',
      expertise: '',
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

  const { setValues, setFieldValue } = formik;

  useEffect(() => {
    if (data) {
      //console.log(data);
      const { criteria_lecturer, id_user, ...tempValues } = data;
      //console.log(tempValues);
      setValues(tempValues);
    }
  }, [data]);

  const handleChange = (event) => {
    setFieldValue('is_admin', event.target.value);
  };

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

        <FormControl fullWidth>
          <InputLabel id="is_admin-select">Admin</InputLabel>
          <Select
            labelId="is_admin-select"
            id="demo-simple-select"
            value={formik.values.is_admin}
            label="is_admin"
            onChange={handleChange}
          >
            <MenuItem value={false}>False</MenuItem>
            <MenuItem value={true}>True</MenuItem>
          </Select>
        </FormControl>

        {/* <TextField
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
        /> */}

        <Button type="submit" variant="contained" fullWidth>
          Ubah
        </Button>
      </Box>
    </Container>
  );
};

export default EditLecturer;
