import { TextField, Box, Button, Container } from '@mui/material';
import { addCriteria } from '../../lib/fetcher/criteria';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useSWR, { useSWRConfig } from 'swr';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const AddCriteria = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const formik = useFormik({
    initialValues: {
      code_criteria: '',
      attribute: 'benefit',
      name_criteria: '',
      weight: 0,
    },
    validationSchema: yup.object({
      code_criteria: yup.string().required('Code is required'),
      attribute: yup.string().required('Attribute is required'),
      name_criteria: yup.string().required('Name is required'),
      weight: yup.number().required('Weight is required'),
    }),
    onSubmit: async (values) => {
      try {
        await addCriteria(values);
        router.back();
        mutate('/api/criteria');
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
      }
    },
  });
  const { setFieldValue } = formik;

  const handleChange = (event) => {
    setFieldValue('attribute', event.target.value);
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
          id="code_criteria"
          label="Kode Kriteria"
          variant="standard"
          fullWidth
          value={formik.values.code_criteria}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.code_criteria && Boolean(formik.errors.code_criteria)
          }
          helperText={
            formik.touched.code_criteria
              ? formik.errors.code_criteria
                ? formik.errors.code_criteria
                : ' '
              : ' '
          }
        />
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
        {/* <TextField
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
        /> */}
        <FormControl fullWidth>
          <InputLabel id="attribute-select">Attribute</InputLabel>
          <Select
            labelId="attribute-select"
            id="demo-simple-select"
            value={formik.values.attribute}
            label="Attribute"
            onChange={handleChange}
          >
            <MenuItem value={'benefit'}>Benefit</MenuItem>
            <MenuItem value={'cost'}>Cost</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="weight"
          label="Bobot"
          variant="standard"
          fullWidth
          type="number"
          step="any"
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
          Tambahkan
        </Button>
      </Box>
    </Container>
  );
};

export default AddCriteria;
