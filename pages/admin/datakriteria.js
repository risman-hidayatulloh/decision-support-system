import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import LayoutAdmin from '/components/Layout/Admin';
import { DataGrid } from '@mui/x-data-grid';
//import { Button } from '@material-ui/core';
import useSWR from 'swr';
import { deleteCriteria, getCriterias } from '../../lib/fetcher/criteria';
import { useRouter } from 'next/router';
import AddCriteria from '../../sections/datakriteria/AddCriteria';
import EditCriteria from '../../sections/datakriteria/EditCriteria';
import DetailCriteria from '../../sections/detailkriteria/DetailCriteria';
import { useSWRConfig } from 'swr';

const columns = [
  {
    field: 'code_criteria',
    headerName: 'Code Kriteria',
    width: 100,
    editable: true,
  },
  {
    field: 'name_criteria',
    headerName: 'Nama Kriteria',
    width: 250,
    editable: true,
  },
  {
    field: 'attribute',
    headerName: 'Attribute',
    width: 100,
    editable: true,
  },
  {
    field: 'weight',
    headerName: 'Bobot',
    width: 100,
    editable: true,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    renderCell: (cellValues) => {
      const router = useRouter();

      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            router.push(`/admin/datakriteria?edit=${cellValues.id}`)
          }
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
      const router = useRouter();
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push(`/admin/datakriteria?detail=${cellValues.id}`);
          }}
        >
          Detail
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
              deleteCriteria(cellValues.id);
              window.location.reload();
              //mutate('/api/criteria', getCriterias, false);
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

const DataKriteria = () => {
  const router = useRouter();
  const { detail, edit, add } = router.query;

  const { data } = useSWR('/api/criteria', getCriterias);
  const { mutate } = useSWRConfig();
  mutate('/api/criteria', getCriterias, false);

  return (
    <>
      <LayoutAdmin pageTitle="Data Kriteria">
        {add ? (
          <AddCriteria />
        ) : edit ? (
          <EditCriteria />
        ) : detail ? (
          <DetailCriteria />
        ) : (
          <>
            <Button
              variant="contained"
              sx={{ mb: 2 }}
              onClick={() => router.push('/admin/datakriteria?add=true')}
            >
              Tambah Kriteria
            </Button>
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={data ? data : []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[]}
                disableSelectionOnClick
                getRowId={(row) => row.id_criteria}
              />
            </div>
          </>
        )}
      </LayoutAdmin>
    </>
  );
};

export default DataKriteria;
