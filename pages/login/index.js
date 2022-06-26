import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { SignInResponse } from 'next-auth/react';
import {
  Box,
  Card,
  Typography,
  Button,
  Divider,
  TextField,
  Alert,
} from '@mui/material';

import { Form, useFormik } from 'formik';
import * as yup from 'yup';

const Login = () => {
  const router = useRouter();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      emailnim: '',
      password: '',
    },
    validationSchema: yup.object({
      emailnim: yup.string().required('Email/NIM is required'),
      password: yup
        .string()
        // .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      const { emailnim, password } = values;

      console.log(emailnim, password);

      const signInResult = await signIn('credentials', {
        emailnim,
        password,
        redirect: false,
      });

      if (signInResult) {
        const { error } = signInResult;
        if (error) {
          setLoginErrorMessage(error);
        } else {
          router.push('/redirect');
        }
      }
    },
  });

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'primary.main',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Card
            sx={{
              p: 4,
              width: {
                xs: '100%',
                md: '400px',
              },
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              boxShadow: 4,
            }}
          >
            <Typography sx={{ textAlign: 'center' }}>
              <Typography>SPK PENENTUAN DOSEN PEMBIMBING SKRIPSI</Typography>
              <Typography>ILMU KOMPUTER - FPMIPA</Typography>
              <Typography>UNIVERSITAS PENDIDIKAN INDONESIA</Typography>
            </Typography>

            <Divider variant="middle" />

            <TextField
              fullWidth
              id="emailnim"
              name="emailnim"
              label="Email/NIM"
              type="emailnim"
              variant="standard"
              value={formik.values.emailnim}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.emailnim && Boolean(formik.errors.emailnim)}
              helperText={
                formik.touched.emailnim
                  ? formik.errors.emailnim
                    ? formik.errors.emailnim
                    : ' '
                  : ' '
              }
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="standard"
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

            {loginErrorMessage && (
              <Alert severity="warning">{loginErrorMessage}</Alert>
            )}

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Box>
  );

  //<Box sx={{ backgroundColor: 'primary.main' }}></Box>;
};

export default Login;
