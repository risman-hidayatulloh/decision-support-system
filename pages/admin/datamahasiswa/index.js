import * as React from 'react';
import { useRouter } from 'next/router';
import LayoutAdmin from '/components/Layout/Admin';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { deleteStudent, getStudents } from '../../../lib/fetcher/student';
import AddMahasiswa from '../../../sections/student/AddMahasiswa';
import EditMahasiswa from '../../../sections/student/EditMahasiswa';
import useSWR, { useSWRConfig } from 'swr';
import { Box } from '@mui/material';

const columns = [
  { field: 'nim', headerName: 'NIM', width: 80 },
  {
    field: 'name_student',
    headerName: 'Nama Mahasiswa',
    width: 200,
  },
  {
    field: 'thesis_title',
    headerName: 'Judul Skripsi',
    width: 1000,
    editable: true,
  },
  {
    field: 'expertise',
    headerName: 'Bidang Keahlian',
    width: 220,
  },
  // {
  //   field: 'document',
  //   headerName: 'File Dokument .pdf',
  //   width: 150,
  //   editable: true,
  // },
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
              router.push(`/admin/datamahasiswa?edit=${cellValues.id}`)
            }
          >
            Edit
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            // onClick={() => {
            //   router.push(`/admin/datamahasiswa/${cellValues.id}/supervisor`);
            // }}
          >
            Supervisor
          </Button> */}

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              try {
                deleteStudent(cellValues.id);
                mutate('/api/student', getStudents);
                window.location.reload();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            delete
          </Button>
        </Box>
      );
    },
    width: 320,
  },
];

const DataMahasiswa = () => {
  const router = useRouter();
  const { add, edit } = router.query;
  const [pageSize, setPageSize] = React.useState(10);

  const { data } = useSWR('/api/student', getStudents);

  return (
    <>
      <LayoutAdmin pageTitle="Data Mahasiswa">
        <>
          {add ? (
            <AddMahasiswa />
          ) : edit ? (
            <EditMahasiswa />
          ) : (
            <>
              {/* <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => router.push('/admin/datamahasiswa?add=true')}
              >
                Tambah Mahasiswa
              </Button> */}
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
                  getRowId={(row) => row.id_student}
                />
              </div>
            </>
          )}
        </>
      </LayoutAdmin>
    </>
  );
};

export default DataMahasiswa;
