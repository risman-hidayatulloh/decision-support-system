import * as React from 'react';
import { useRouter } from 'next/router';
import LayoutAdmin from '/components/Layout/Admin';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { deleteStudent, getStudents } from '../../lib/fetcher/student';
import AddMahasiswa from '../../sections/student/AddMahasiswa';
import EditMahasiswa from '../../sections/student/EditMahasiswa';
import useSWR, { useSWRConfig } from 'swr';

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
    headerName: 'File Dokument .pdf',
    width: 150,
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
            router.push(`/admin/datamahasiswa?edit=${cellValues.id}`)
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
    field: 'supervisor',
    headerName: 'Supervisor',
    renderCell: (cellValues) => {
      const router = useRouter();
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push(`/admin/datamahasiswa/${cellValues.id}/supervisor`);
          }}
        >
          Supervisor
        </Button>
      );
    },
    width: 120,
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
      );
    },
    width: 80,
    editable: true,
  },
];

const DataMahasiswa = () => {
  const router = useRouter();
  const { add, edit } = router.query;
  const { data } = useSWR('/api/student', getStudents);
  const { mutate } = useSWRConfig();
  mutate('/api/student', getStudents);

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
                  pageSize={10}
                  rowsPerPageOptions={[]}
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
