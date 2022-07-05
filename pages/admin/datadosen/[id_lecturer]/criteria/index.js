import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import LayoutAdmin from '/components/Layout/Admin';

const columns = [
  { field: 'id', headerName: 'Nama Dosen', width: 150 },
  {
    field: 'JabatanFungsional',
    headerName: 'Jabatan Fungsional',
    width: 150,
    editable: true,
  },
  {
    field: 'KualifikasiAkademik',
    headerName: 'Kualifikasi Akademik',
    width: 150,
    editable: true,
  },
  {
    field: 'Kepakaran_BidangKeahlian',
    headerName: 'Kepakaran Bidang Keahlian',
    width: 150,
    editable: true,
  },
  {
    field: 'JumlahMahasiswaBimbingan',
    headerName: 'Jumlah Mahasiswa Bimbingan',
    width: 150,
    editable: true,
  },
  {
    field: 'Pangkat_Golongan',
    headerName: 'Pangkat Golongan',
    width: 150,
    editable: true,
  },
  {
    field: 'LintasBidangKeahlian',
    headerName: 'Lintas Bidang Keahlian',
    width: 150,
    editable: true,
  },
  {
    field: 'LamaMengajar',
    headerName: 'Lama Mengajar',
    width: 150,
    editable: true,
  },
  {
    field: 'Penelitian',
    headerName: 'Penelitian',
    width: 150,
    editable: true,
  },
];

const rows = [
  {
    id: 'Asep Wahyudin',
    JabatanFungsional: 'Lektor',
    KualifikasiAkademik: 'Doktor',
    Kepakaran_BidangKeahlian: 'RPL dan Manajemen Informasi',
    JumlahMahasiswaBimbingan: '0',
    Pangkat_Golongan: 'Penata Tingkat I / IIId',
    LintasBidangKeahlian: 'Kompetensi 1-5',
    LamaMengajar: 'Lama',
    Penelitian: 'Ketua',
  },
  {
    id: 'Eddy Prasetyo Nugroho',
    JabatanFungsional: 'Dosen',
    KualifikasiAkademik: 'S1',
    Kepakaran_BidangKeahlian: 'Kepakaran',
    JumlahMahasiswaBimbingan: '10',
    Pangkat_Golongan: 'Pangkat',
    LintasBidangKeahlian: 'Lintas',
    LamaMengajar: 'Lama',
    Penelitian: 'Penelitian',
  },
  {
    id: 'Herbert Siregar',
    JabatanFungsional: 'Dosen',
    KualifikasiAkademik: 'S1',
    Kepakaran_BidangKeahlian: 'Kepakaran',
    JumlahMahasiswaBimbingan: '10',
    Pangkat_Golongan: 'Pangkat',
    LintasBidangKeahlian: 'Lintas',
    LamaMengajar: 'Lama',
    Penelitian: 'Penelitian',
  },
  {
    id: 'Lala Septem Riza',
    JabatanFungsional: 'Dosen',
    KualifikasiAkademik: 'S1',
    Kepakaran_BidangKeahlian: 'Kepakaran',
    JumlahMahasiswaBimbingan: '10',
    Pangkat_Golongan: 'Pangkat',
    LintasBidangKeahlian: 'Lintas',
    LamaMengajar: 'Lama',
    Penelitian: 'Penelitian',
  },
  {
    id: 'Muhammad Nursalman',
    JabatanFungsional: 'Dosen',
    KualifikasiAkademik: 'S1',
    Kepakaran_BidangKeahlian: 'Kepakaran',
    JumlahMahasiswaBimbingan: '10',
    Pangkat_Golongan: 'Pangkat',
    LintasBidangKeahlian: 'Lintas',
    LamaMengajar: 'Lama',
    Penelitian: 'Penelitian',
  },
];

const Criteria = () => {
  return (
    <>
      <LayoutAdmin pageTitle="Data Dosen > Criteria">
        <>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </>
      </LayoutAdmin>
    </>
  );
};

export default Criteria;
