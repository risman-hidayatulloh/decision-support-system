import * as React from 'react';
import Button from '@mui/material/Button';
import LayoutAdmin from '/components/Layout/Admin';
import { DataGrid } from '@mui/x-data-grid';
import { deleteCriteria, getCriterias } from '../../../lib/fetcher/criteria';
import { useRouter } from 'next/router';
import AddCriteria from '../../../sections/criteria/AddCriteria';
import EditCriteria from '../../../sections/criteria/EditCriteria';
import useSWR, { useSWRConfig } from 'swr';

const columns = [
  {
    field: 'code_criteria',
    headerName: 'Code Kriteria',
    width: 100,
  },
  {
    field: 'name_criteria',
    headerName: 'Nama Kriteria',
    width: 250,
  },
  {
    field: 'attribute',
    headerName: 'Attribute',
    width: 100,
  },
  {
    field: 'weight',
    headerName: 'Bobot',
    width: 100,
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
            router.push(`/admin/datakriteria/${cellValues.id}/detail`);
          }}
        >
          Detail
        </Button>
      );
    },
    width: 80,
  },
  {
    field: 'delete',
    headerName: 'Delete',
    renderCell: (cellValues) => {
      const { mutate } = useSWRConfig();
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            try {
              deleteCriteria(cellValues.id);
              mutate('/api/criteria', getCriterias);
              //window.location.reload();
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
  },
];

const DataKriteria = () => {
  const router = useRouter();
  const { edit, add } = router.query;
  const [pageSize, setPageSize] = React.useState(10);

  const { data } = useSWR('/api/criteria', getCriterias);
  //const { mutate } = useSWRConfig();
  //mutate('/api/criteria', getCriterias);

  return (
    <>
      <LayoutAdmin pageTitle="Data Kriteria">
        <>
          {add ? (
            <AddCriteria />
          ) : edit ? (
            <EditCriteria />
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => router.push('/admin/datakriteria?add=true')}
              >
                Tambah Kriteria
              </Button>
              <div style={{ height: 640, width: '100%' }}>
                <DataGrid
                  rows={data ? data : []}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  disableSelectionOnClick
                  getRowId={(row) => row.id_criteria}
                />
              </div>
            </>
          )}
        </>
      </LayoutAdmin>
    </>
  );
};

export default DataKriteria;
