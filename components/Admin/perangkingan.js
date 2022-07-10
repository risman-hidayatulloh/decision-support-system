import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getStudents } from '../../lib/fetcher/student';
import { getLecturers } from '../../lib/fetcher/lecturer';
import useSWR from 'swr';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Typography from '@mui/material/Typography';
import { getCriterias } from '../../lib/fetcher/criteria';
import { processData } from '../../lib/fetcher/process';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const Perangkingan = ({ setFinalData, setStudent }) => {
  const { data: student } = useSWR('/api/student', getStudents);
  const { data: lecturer } = useSWR('/api/lecturer', getLecturers);
  const { data: criteria } = useSWR('/api/criteria', getCriterias);

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const [selectedLecturers, setSelectedLecturer] = React.useState([]);
  const [inputLecturer, setInputLecturer] = React.useState('');

  const [selectedCriteria, setSelectedCriteria] = React.useState([]);
  const [inputCriteria, setInputCriteria] = React.useState('');

  const handleProcess = async () => {
    try {
      const response = await processData(selectedLecturers, selectedCriteria);
      setFinalData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Proses Perangkingan
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
              setStudent(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={student ? student : []}
            sx={{ width: '40%' }}
            renderInput={(params) => (
              <TextField {...params} label="Mahasiswa" />
            )}
            getOptionLabel={(option) =>
              option.nim +
              ' ' +
              option.name_student +
              ' ' +
              '[' +
              option.expertise +
              ']'
            }
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id_student}>
                  [{option.expertise}] {option.nim} {option.name_student}
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
            multiple
            id="checkboxes-tags-demo"
            options={lecturer ? lecturer : []}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name_lecturer}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name_lecturer}
              </li>
            )}
            style={{ width: '100%' }}
            renderInput={(params) => (
              <TextField {...params} label="Dosen" placeholder="Dosen" />
            )}
            value={selectedLecturers}
            onChange={(event, newValue) => {
              setSelectedLecturer(newValue);
            }}
            inputValue={inputLecturer}
            onInputChange={(event, newInputValue) => {
              setInputLecturer(newInputValue);
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
            multiple
            id="criteria-auto-complete"
            options={criteria ? criteria : []}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name_criteria}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name_criteria}
              </li>
            )}
            style={{ width: '100%' }}
            renderInput={(params) => (
              <TextField {...params} label="Kriteria" placeholder="Kriteria" />
            )}
            value={selectedCriteria}
            onChange={(event, newValue) => {
              setSelectedCriteria(newValue);
            }}
            inputValue={inputCriteria}
            onInputChange={(event, newInputValue) => {
              setInputCriteria(newInputValue);
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
          <Button onClick={handleProcess} variant="contained">
            Proses
          </Button>
        </Box>
      </Typography>
    </>
  );
};

export default Perangkingan;
