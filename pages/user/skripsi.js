import * as React from 'react';
import LayoutUsers from '/components/Layout/Users';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@material-ui/core';

const columns = [
  { field: 'id', headerName: 'NIM', width: 80 },
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
    field: 'action',
    headerName: 'Action',
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
];

const rows = [
  {
    id: 1602474,
    thesis_title: 'Sistem Otomatis Selesai Skripsi',
    expertise: 'Rekayasa Perangkat Lunak',
    document: 'filesso.pdf',
  },
];

export default function skripsi() {
  return (
    <LayoutUsers pageTitle="Home">
      <div style={{ height: 200, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[]}
          //checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </LayoutUsers>
  );
}
