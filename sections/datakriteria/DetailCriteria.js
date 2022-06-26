import { TextField, Box, Button, Container } from '@mui/material';

const DetailCriteria = () => {
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
      >
        <TextField
          id="description"
          label="Keterangan"
          variant="standard"
          fullWidth
        />
        <TextField id="fuzzy" label="Fuzzy" variant="standard" fullWidth />
        <TextField
          id="variable"
          label="Variabel"
          variant="standard"
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth>
          Tambahkan
        </Button>
      </Box>
    </Container>
  );
};

export default DetailCriteria;
