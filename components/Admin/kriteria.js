import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getDetailByIdCriteria } from '../../lib/fetcher/detail_criteria';
import { getLecturers } from '../../lib/fetcher/lecturer';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Typography from '@mui/material/Typography';
import { getCriterias } from '../../lib/fetcher/criteria';
import { addCriteria_Lecturer } from '../../lib/fetcher/criteria_lecturer';
import { DataGrid } from '@mui/x-data-grid';
import { getProcess } from '../../lib/fetcher/process';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Kriteria = () => {
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
  //console.log(detail_criteria);
  //console.log('detail_criteria', detail_criteria);

  const [pageSize, setPageSize] = React.useState(10);
  const { mutate } = useSWRConfig();

  const addCriteriaLecturer = () => {
    try {
      addCriteria_Lecturer({
        id_lecturer: value.id_lecturer,
        id_detail_criteria: selectedDetailCriteria.id_detail_criteria,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns = [
    // { field: 'id_detail_criteria', headerName: 'ID', width: 100 },
    {
      field: 'name_criteria',
      headerName: 'Kriteria',
      valueGetter: (params) => {
        const { row } = params;
        return row.detail_criteria.criteria.name_criteria;
      },
      width: 250,
    },
    {
      field: 'description',
      headerName: 'Sub Kriteria',
      valueGetter: (params) => {
        const { row } = params;
        return row.detail_criteria.description;
      },
      width: 250,
    },
  ];

  const { data: process } = useSWR(
    value?.id_lecturer ? `/api/process/${value?.id_lecturer}` : null,
    () => getProcess(value?.id_lecturer)
  );
  //console.log('value', value?.id_lecturer);
  //console.log('get', process);

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Kriteria
        {/* input */}
        <>
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
                <TextField
                  {...params}
                  label="Input Nama Dosen Untuk Melihat Kriteria"
                />
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
          {/* <Box
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
          </Box> */}
        </>
        {/* output */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Hasil Kriteria</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ height: 530, width: '100%' }}>
              <DataGrid
                rows={process ? process : []}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                disableSelectionOnClick
                getRowId={(row) => row.id_criteria_lecturer}
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </Typography>
    </>
  );
};

export default Kriteria;
