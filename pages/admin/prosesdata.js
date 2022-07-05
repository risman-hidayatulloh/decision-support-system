import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LayoutAdmin from '/components/Layout/Admin';
import Button from '@mui/material/Button';

const currencies = [
  {
    value: '0',
    label: '',
  },
  {
    value: '1',
    label: 'Risman Hidayatulloh',
  },
  {
    value: '2',
    label: 'Gugum Gumelar',
  },
  {
    value: '3',
    label: 'Muhammad Rafif',
  },
  {
    value: '4',
    label: 'Rifqi Adi',
  },
];

const ProsesData = () => {
  //select
  const [currency, setCurrency] = React.useState('EUR');
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  //checkbox
  const [checked, setChecked] = React.useState([true, false]);
  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };
  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };
  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Jabatan Fungsional"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Kualifikasi Akademik"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <>
      <LayoutAdmin pageTitle="Proses Data">
        <>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              height: '75%',
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Nama Mahasiswa"
                value={currency}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select your student"
              >
                {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: 3,
              height: '50%',
            }}
          >
            <div>
              <FormControlLabel
                label="Select All Criteria"
                control={
                  <Checkbox
                    checked={checked[0] && checked[1]}
                    indeterminate={checked[0] !== checked[1]}
                    onChange={handleChange1}
                  />
                }
              />
              {children}
            </div>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: 3,
              width: '10%',
            }}
          >
            <Button variant="contained">Proses</Button>
          </Box>
        </>
      </LayoutAdmin>
    </>
  );
};

export default ProsesData;
