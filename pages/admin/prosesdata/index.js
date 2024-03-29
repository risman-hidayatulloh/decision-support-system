import * as React from 'react';
import LayoutAdmin from '/components/Layout/Admin';
import Perangkingan from '/components/Admin/perangkingan';
import Kriteria from '/components/Admin/kriteria';
import Quota from '/components/Admin/quota';
import create from 'zustand';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { addResult, getStudentResult } from '../../../lib/fetcher/result';
import { toast } from 'react-toastify';

const useSupervisorStore = create((set) => ({
  first: null,
  second: null,
  setFirstSupervisor: (first) => set(() => ({ first })),
  setSecondSupervisor: (second) => set(() => ({ second })),
}));

const columns = [
  {
    field: 'rank',
    headerName: 'Ranking',
    width: 250,
  },
  {
    field: 'lecturer',
    headerName: 'Nama Dosen',
    valueGetter: (params) => {
      const { row } = params;
      return row.lecturer.name_lecturer;
    },
    width: 250,
  },
  {
    field: 'total_saw',
    headerName: 'Skor',
    width: 250,
  },
  // {
  //   field: 'totalAsFirstSupervisor',
  //   headerName: 'Total Menjadi Pembimbing 1',
  //   width: 250,
  // },
  // {
  //   field: 'totalAsSecondSupervisor',
  //   headerName: 'Total Menjadi Pembimbing 2',
  //   width: 250,
  // },
  {
    field: 'action',
    headerName: 'Aksi',
    renderCell: (params) => {
      const { setFirstSupervisor, setSecondSupervisor } = useSupervisorStore(
        (state) => ({
          ...state,
        })
      );

      return (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={() => {
              setFirstSupervisor({
                id_lecturer: params.row.lecturer.id_lecturer,
                name_lecturer: params.row.lecturer.name_lecturer,
                score: params.row.total_saw,
                rank: params.row.rank,
              });
            }}
            variant="contained"
            color="primary"
            size="small"
          >
            Jadikan Sebagai Pembimbing 1
          </Button>
          <Button
            onClick={() => {
              setSecondSupervisor({
                id_lecturer: params.row.lecturer.id_lecturer,
                name_lecturer: params.row.lecturer.name_lecturer,
                score: params.row.total_saw,
                rank: params.row.rank,
              });
            }}
            variant="contained"
            color="primary"
            size="small"
          >
            Jadikan Sebagai Pembimbing 2
          </Button>
        </Box>
      );
    },
    width: 500,
  },
];

const ProsesData = () => {
  const router = useRouter();

  const [student, setStudent] = React.useState(null);
  const [pageSize, setPageSize] = React.useState(10);
  const [finalData, setFinalData] = React.useState(null);

  const { data } = useSWR(
    student
      ? `http://localhost:3000/api/student/${student.id_student}/result`
      : null,
    () => getStudentResult(student.id_student)
  );

  const { first, second } = useSupervisorStore((state) => ({
    ...state,
  }));

  const handleSubmit = async () => {
    try {
      await addResult([
        {
          ranking_results: 1,
          id_student: student.id_student,
          score: first?.score,
          id_supervisor: first?.id_lecturer,
        },
        {
          ranking_results: 2,
          id_student: student.id_student,
          score: second?.score,
          id_supervisor: second?.id_lecturer,
        },
      ]);
    } catch (error) {
      toast(error.message);
    }
  };

  const { mutate } = useSWRConfig();
  mutate('/api/process');

  return (
    <>
      <LayoutAdmin pageTitle="Proses Penentuan Pembimbing Skripsi">
        <>
          <Kriteria />

          <Perangkingan setFinalData={setFinalData} setStudent={setStudent} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 3,
              gap: 2,
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Hasil Perangkingan</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ height: 310, width: '100%' }}>
                  <DataGrid
                    rows={finalData ? finalData : []}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    disableSelectionOnClick
                    getRowId={(row) => row.lecturer.id_lecturer}
                  />
                </div>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Typography>
                    Pembimbing 1 : {first?.name_lecturer}{' '}
                  </Typography>
                  <Typography>
                    Pembimbing 2 : {second?.name_lecturer}{' '}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      disabled={data?.length !== 0}
                    >
                      Submit
                    </Button>
                    {data?.length !== 0 && data !== undefined && (
                      <Typography>Hasil telah ada</Typography>
                    )}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Quota />
        </>
      </LayoutAdmin>
    </>
  );
};

export default ProsesData;
