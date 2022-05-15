import * as React from 'react';
import LayoutUsers from '/components/Layout/Users';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'NIM', width: 80 },
  {
    field: 'judul',
    headerName: 'Judul Skripsi',
    width: 500,
    editable: true,
  },
  {
    field: 'bidang',
    headerName: 'Bidang Keahlian',
    width: 200,
    editable: true,
  },
  {
    field: 'fileproposal',
    headerName: 'File Proposal .pdf',
    width: 150,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 80,
    editable: true,
  },
];

const rows = [
  {
    id: 1602474,
    judul: 'Sistem Otomatis Selesai Skripsi',
    bidang: 'Rekayasa Perangkat Lunak',
    fileproposal: 'filesso.pdf',
    action: 'o x',
  },
];

export default function DataGridDemo() {
  return (
    <LayoutUsers pageTitle="Home">
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </LayoutUsers>
  );
}
