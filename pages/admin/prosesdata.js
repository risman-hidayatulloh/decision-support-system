import * as React from 'react';
import LayoutAdmin from '/components/Layout/Admin';
import Perangkingan from '/components/Admin/perangkingan';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getDetailByIdCriteria } from '../../lib/fetcher/detail_criteria';
import { getLecturers } from '../../lib/fetcher/lecturer';
import useSWR from 'swr';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Typography from '@mui/material/Typography';
import { getCriterias } from '../../lib/fetcher/criteria';
import { addCriteria_Lecturer } from '../../lib/fetcher/criteria_lecturer';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProsesData = () => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const [selectedCriteria, setSelectedCriteria] = React.useState(null);
  const [inputCriteria, setInputCriteria] = React.useState('');

  const [selectedDetailCriteria, setSelectedDetailCriteria] =
    React.useState(null);
  const [inputDetailCriteria, setInputDetailCriteria] = React.useState('');

  const { data: lecturer } = useSWR('/api/lecturer', getLecturers);
  const { data: criteria } = useSWR('/api/criteria', getCriterias);
  const { data: detail_criteria } = useSWR(
    selectedCriteria?.id_criteria
      ? `/api/criteria/${selectedCriteria.id_criteria}/detail`
      : null,
    () => getDetailByIdCriteria(selectedCriteria.id_criteria)
  );

  const addCriteriaLecturer = () => {
    addCriteria_Lecturer({
      id_lecturer: value.id_lecturer,
      id_detail_criteria: selectedDetailCriteria.id_detail_criteria,
    });
  };

  return (
    <>
      <LayoutAdmin pageTitle="Proses Data">
        <>
          <Typography variant="h6" gutterBottom component="div">
            Proses Kriteria
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 3,
              }}
            >
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={lecturer ? lecturer : []}
                sx={{ width: '40%' }}
                renderInput={(params) => (
                  <TextField {...params} label="Dosen" />
                )}
                getOptionLabel={(option) => option.name_lecturer}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id_lecturer}>
                      {option.name_lecturer}
                    </li>
                  );
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 3,
              }}
            >
              <Autocomplete
                value={selectedCriteria}
                onChange={(event, newValue) => {
                  setSelectedCriteria(newValue);
                }}
                inputValue={inputCriteria}
                onInputChange={(event, newInputValue) => {
                  setInputCriteria(newInputValue);
                }}
                id="criteria-select"
                options={criteria ? criteria : []}
                sx={{ width: '40%' }}
                renderInput={(params) => (
                  <TextField {...params} label="Kriteria" />
                )}
                getOptionLabel={(option) => option.name_criteria}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id_criteria}>
                      {option.name_criteria}
                    </li>
                  );
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 3,
              }}
            >
              <Autocomplete
                value={selectedDetailCriteria}
                onChange={(event, newValue) => {
                  setSelectedDetailCriteria(newValue);
                }}
                inputValue={inputDetailCriteria}
                onInputChange={(event, newInputValue) => {
                  setInputDetailCriteria(newInputValue);
                }}
                id="criteria-detail-select"
                options={detail_criteria ? detail_criteria : []}
                sx={{ width: '40%' }}
                renderInput={(params) => (
                  <TextField {...params} label="Detail Kriteria" />
                )}
                getOptionLabel={(option) => option.description}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id_detail_criteria}>
                      {option.description}
                    </li>
                  );
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 3,
                width: '10%',
              }}
            >
              <Button variant="contained" onClick={addCriteriaLecturer}>
                Simpan
              </Button>
            </Box>
          </Typography>

          {/* <Perangkingan /> */}
        </>
      </LayoutAdmin>
    </>
  );
};

export default ProsesData;
