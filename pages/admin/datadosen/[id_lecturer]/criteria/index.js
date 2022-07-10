import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import LayoutAdmin from '/components/Layout/Admin';
import {
  getCriteriaByIdLecturer,
  deleteCriteria_Lecturer,
} from '../../../../../lib/fetcher/criteria_lecturer';
import EditCriteria from '../../../../../sections/lecturercriteria/EditCriteriaLecturer';
import useSWR, { useSWRConfig } from 'swr';

// const columns = [
//   { field: 'id', headerName: 'Nama Dosen', width: 150 },
//   {
//     field: 'JabatanFungsional',
//     headerName: 'Jabatan Fungsional',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'KualifikasiAkademik',
//     headerName: 'Kualifikasi Akademik',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'Kepakaran_BidangKeahlian',
//     headerName: 'Kepakaran Bidang Keahlian',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'JumlahMahasiswaBimbingan',
//     headerName: 'Jumlah Mahasiswa Bimbingan',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'Pangkat_Golongan',
//     headerName: 'Pangkat Golongan',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'LintasBidangKeahlian',
//     headerName: 'Lintas Bidang Keahlian',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'LamaMengajar',
//     headerName: 'Lama Mengajar',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'Penelitian',
//     headerName: 'Penelitian',
//     width: 150,
//     editable: true,
//   },
// ];

// const rows = [
//   {
//     id: 'Asep Wahyudin',
//     JabatanFungsional: 'Lektor',
//     KualifikasiAkademik: 'Doktor',
//     Kepakaran_BidangKeahlian: 'RPL dan Manajemen Informasi',
//     JumlahMahasiswaBimbingan: '0',
//     Pangkat_Golongan: 'Penata Tingkat I / IIId',
//     LintasBidangKeahlian: 'Kompetensi 1-5',
//     LamaMengajar: 'Lama',
//     Penelitian: 'Ketua',
//   },
//   {
//     id: 'Eddy Prasetyo Nugroho',
//     JabatanFungsional: 'Dosen',
//     KualifikasiAkademik: 'S1',
//     Kepakaran_BidangKeahlian: 'Kepakaran',
//     JumlahMahasiswaBimbingan: '10',
//     Pangkat_Golongan: 'Pangkat',
//     LintasBidangKeahlian: 'Lintas',
//     LamaMengajar: 'Lama',
//     Penelitian: 'Penelitian',
//   },
//   {
//     id: 'Herbert Siregar',
//     JabatanFungsional: 'Dosen',
//     KualifikasiAkademik: 'S1',
//     Kepakaran_BidangKeahlian: 'Kepakaran',
//     JumlahMahasiswaBimbingan: '10',
//     Pangkat_Golongan: 'Pangkat',
//     LintasBidangKeahlian: 'Lintas',
//     LamaMengajar: 'Lama',
//     Penelitian: 'Penelitian',
//   },
//   {
//     id: 'Lala Septem Riza',
//     JabatanFungsional: 'Dosen',
//     KualifikasiAkademik: 'S1',
//     Kepakaran_BidangKeahlian: 'Kepakaran',
//     JumlahMahasiswaBimbingan: '10',
//     Pangkat_Golongan: 'Pangkat',
//     LintasBidangKeahlian: 'Lintas',
//     LamaMengajar: 'Lama',
//     Penelitian: 'Penelitian',
//   },
//   {
//     id: 'Muhammad Nursalman',
//     JabatanFungsional: 'Dosen',
//     KualifikasiAkademik: 'S1',
//     Kepakaran_BidangKeahlian: 'Kepakaran',
//     JumlahMahasiswaBimbingan: '10',
//     Pangkat_Golongan: 'Pangkat',
//     LintasBidangKeahlian: 'Lintas',
//     LamaMengajar: 'Lama',
//     Penelitian: 'Penelitian',
//   },
// ];

const columns = [
  // { field: 'id_lecturer', headerName: 'ID Lecturer', width: 100 },
  {
    field: 'name_criteria',
    headerName: 'Kriteria',
    valueGetter: (params) => {
      const { row } = params;
      return row.detail_criteria.criteria.name_criteria;
    },
    width: 210,
  },
  {
    field: 'description',
    headerName: 'Sub Kriteria',
    valueGetter: (params) => {
      const { row } = params;
      return row.detail_criteria.description;
    },
    width: 200,
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
            router.push`/admin/datadosen/${cellValues.row.id_lecturer}/detail?edit=${cellValues.id}`()
          }
        >
          Edit
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
              deleteCriteria_Lecturer(cellValues.id);
              mutate(
                `/api/lecturer/${cellValues.row.id_lecturer}/criteria`,
                getCriteriaByIdLecturer(cellValues.id)
              );

              console.log('id', cellValues.id);
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

const Criteria = () => {
  const router = useRouter();
  const { id_lecturer, add, edit } = router.query;
  const [pageSize, setPageSize] = React.useState(10);

  const { data } = useSWR(
    id_lecturer ? `/api/lecturer/${id_lecturer}/criteria` : null,
    () => getCriteriaByIdLecturer(id_lecturer)
  );
  console.log(data);
  const { mutate } = useSWRConfig(useSWR);
  mutate(
    `/api/lecturer/${id_lecturer}/criteria`,
    getCriteriaByIdLecturer(id_lecturer)
  );

  return (
    <>
      <LayoutAdmin pageTitle="Data Dosen > Criteria">
        <>
          <Box sx={{ height: 640, width: '100%' }}>
            <DataGrid
              rows={data ? data : []}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              //checkboxSelection
              disableSelectionOnClick
              getRowId={(row) => row.id_criteria_lecturer}
            />
          </Box>
        </>
      </LayoutAdmin>
    </>
  );
};

export default Criteria;
