import { TextField, Box, Button, Container } from '@mui/material';
import { editCriteria, getCriteria } from '../../lib/fetcher/criteria';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const EditCriteria = () => {
  const router = useRouter();
  const { edit } = router.query;
  const { mutate } = useSWRConfig();

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

  const { setValues, setFieldValue } = formik;

  useEffect(() => {
    if (data) {
      //console.log(data);
      const { detail_criteria, ...tempValues } = data;
      //console.log(tempValues);
      setValues(tempValues);
    }
  }, [data]);

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
