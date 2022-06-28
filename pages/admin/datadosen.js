import { Typography } from '@mui/material';
import LayoutAdmin from '/components/Layout/Admin';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@material-ui/core';
import useSWR from 'swr';
import { deleteLecturer, getLecturers } from '../../lib/fetcher/lecturer';

const columns = [
  { field: 'nip', headerName: 'NIP', width: 200 },
  {
    field: 'name_lecturer',
    headerName: 'Nama Dosen',
    width: 200,
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
              deleteLecturer(cellValues.id);
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

const DataDosen = () => {
  const { data } = useSWR('/api/lecturer', getLecturers);
  return (
    <>
      <LayoutAdmin pageTitle="Data Dosen">
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={data ? data : []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[]}
            //checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.id_lecturer}
          />
        </div>
      </LayoutAdmin>
    </>
  );
};

export default DataDosen;
