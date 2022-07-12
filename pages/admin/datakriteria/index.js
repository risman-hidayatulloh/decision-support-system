import * as React from 'react';
import Button from '@mui/material/Button';
import LayoutAdmin from '/components/Layout/Admin';
import { DataGrid } from '@mui/x-data-grid';
import { deleteCriteria, getCriterias } from '../../../lib/fetcher/criteria';
import { useRouter } from 'next/router';
import AddCriteria from '../../../sections/criteria/AddCriteria';
import EditCriteria from '../../../sections/criteria/EditCriteria';
import useSWR, { useSWRConfig } from 'swr';
import { Box } from '@mui/material';

const columns = [
  {
    field: 'code_criteria',
    headerName: 'Kode Kriteria',
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
    field: 'action',
    headerName: 'Aksi',
    renderCell: (cellValues) => {
      const router = useRouter();
      const { mutate } = useSWRConfig();
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              router.push(`/admin/datakriteria?edit=${cellValues.id}`)
            }
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              router.push(`/admin/datakriteria/${cellValues.id}/detail`);
            }}
          >
            Detail
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              try {
                deleteCriteria(cellValues.id);
                mutate('/api/criteria', getCriterias);
                router.push('/admin/datakriteria');
                //window.location.reload();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Delete
          </Button>
        </Box>
      );
    },
    width: 320,
  },
];

const DataKriteria = () => {
  const router = useRouter();
  const { edit, add } = router.query;
  const [pageSize, setPageSize] = React.useState(10);

  const { data } = useSWR('/api/criteria', getCriterias);

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
                Add Criteria
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
