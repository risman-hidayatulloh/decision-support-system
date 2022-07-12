import * as React from 'react';
import LayoutAdmin from '/components/Layout/Admin';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { deleteLecturer, getLecturers } from '../../../lib/fetcher/lecturer';
import AddLecturer from '../../../sections/lecturer/AddLecturer';
import EditLecturer from '../../../sections/lecturer/EditLecturer';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { Box } from '@mui/material';

const columns = [
  { field: 'nip', headerName: 'NIP/NIDN', width: 200 },
  {
    field: 'name_lecturer',
    headerName: 'Nama Dosen',
    width: 230,
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
              router.push(`/admin/datadosen?edit=${cellValues.id}`)
            }
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              router.push(`/admin/datadosen/${cellValues.id}/criteria`);
            }}
          >
            Criteria
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              try {
                deleteLecturer(cellValues.id);
                mutate('/api/lecturer', getLecturers);
                router.push('/admin/datadosen');
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
    width: 280,
  },
];

const DataDosen = () => {
  const router = useRouter();
  const { edit, add } = router.query;
  const [pageSize, setPageSize] = React.useState(10);

  const { data } = useSWR('/api/lecturer', getLecturers);
  return (
    <>
      <LayoutAdmin pageTitle="Data Dosen">
        <>
          {add ? (
            <AddLecturer />
          ) : edit ? (
            <EditLecturer />
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => router.push('/admin/datadosen?add=true')}
              >
                Add Lecturer
              </Button>
              <div style={{ height: 640, width: '100%' }}>
                <DataGrid
                  rows={data ? data : []}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  //checkboxSelection
                  disableSelectionOnClick
                  getRowId={(row) => row.id_lecturer}
                />
              </div>
            </>
          )}
        </>
      </LayoutAdmin>
    </>
  );
};

export default DataDosen;
