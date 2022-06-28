import { Typography } from '@mui/material';
import LayoutAdmin from '/components/Layout/Admin';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@material-ui/core';
import useSWR from 'swr';
import { deleteStudent, getStudents } from '../../lib/fetcher/student';

const columns = [
  { field: 'nim', headerName: 'NIM', width: 80 },
  {
    field: 'name_student',
    headerName: 'Nama Mahasiswa',
    width: 200,
    editable: true,
  },
  {
    field: 'thesis_title',
    headerName: 'Judul Skripsi',
    width: 500,
    editable: true,
  },
  {
    field: 'expertise',
    headerName: 'Bidang Keahlian',
    width: 200,
    editable: true,
  },
  {
    field: 'document',
    headerName: 'File Proposal .pdf',
    width: 150,
    editable: true,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            handleClick(event, cellValues);
          }}
        >
          Edit
        </Button>
      );
    },
    width: 80,
    editable: true,
  },
  {
    field: 'detail',
    headerName: 'Detail',
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            handleClick(event, cellValues);
          }}
        >
          detail
        </Button>
      );
    },
    width: 80,
    editable: true,
  },
  {
    field: 'delete',
    headerName: 'Delete',
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            try {
              deleteStudent(cellValues.id);
              window.location.reload();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          delete
        </Button>
      );
    },
    width: 80,
    editable: true,
  },
];

const DataMahasiswa = () => {
  const { data } = useSWR('/api/student', getStudents);

  return (
    <>
      <LayoutAdmin pageTitle="Data Mahasiswa">
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={data ? data : []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[]}
            //checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.id_student}
          />
        </div>
      </LayoutAdmin>
    </>
  );
};

export default DataMahasiswa;
