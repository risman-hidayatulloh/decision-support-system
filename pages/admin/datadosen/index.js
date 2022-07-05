import { Typography } from '@mui/material';
import LayoutAdmin from '/components/Layout/Admin';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@material-ui/core';
import { deleteLecturer, getLecturers } from '../../../lib/fetcher/lecturer';
import AddLecturer from '../../../sections/lecturer/AddLecturer';
import EditLecturer from '../../../sections/lecturer/EditLecturer';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';

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
      const router = useRouter();
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(`/admin/datadosen?edit=${cellValues.id}`)}
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
            router.push(`/admin/datadosen/${cellValues.id}/detail`);
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
      const { mutate } = useSWRConfig();
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            try {
              deleteLecturer(cellValues.id);
              mutate('/api/lecturer', getLecturers);
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
  const router = useRouter();
  const { edit, add } = router.query;
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
                Tambah Dosen
              </Button>
              <div style={{ height: 640, width: '100%' }}>
                <DataGrid
                  rows={data ? data : []}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[]}
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
