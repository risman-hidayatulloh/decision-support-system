import {
  Box,
  Card,
  Typography,
  Button,
  Divider,
  TextField,
} from '@mui/material';

const Login = ({ pageTitel }) => {
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
            label="NIM"
            type="nim"
            variant="standard"
            fullWidth
            name="nim"
            id="nim"
          />

          <TextField
            label="Password"
            variant="standard"
            type="password"
            fullWidth
            name="password"
            id="password"
          />

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
      </Box>
    </Box>
  );

  //<Box sx={{ backgroundColor: 'primary.main' }}></Box>;
};

export default Login;
