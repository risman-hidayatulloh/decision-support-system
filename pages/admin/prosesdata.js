import * as React from 'react';
import LayoutAdmin from '/components/Layout/Admin';
import Perangkingan from '/components/Admin/perangkingan';
import Kriteria from '/components/Admin/kriteria';
import create from 'zustand';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { processData } from '../../lib/fetcher/process';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { addResult } from '../../lib/fetcher/result';

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

  const { first, second } = useSupervisorStore((state) => ({
    ...state,
  }));

  const handleSubmit = async () => {
    try {
      await addResult([
        {
          ranking_results: first?.rank,
          id_student: student.id_student,
          score: first?.score,
          id_supervisor: first?.id_lecturer,
        },
        {
          ranking_results: second?.rank,
          id_student: student.id_student,
          score: second?.score,
          id_supervisor: second?.id_lecturer,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LayoutAdmin pageTitle="Proses Data">
        <>
          <Kriteria />

          <Perangkingan setFinalData={setFinalData} setStudent={setStudent} />

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Hasil Perangkingan</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ height: 300, width: '100%' }}>
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
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
              >
                <Typography>Pembimbing 1 : {first?.name_lecturer} </Typography>
                <Typography>Pembimbing 2 : {second?.name_lecturer} </Typography>
                <Box>
                  <Button onClick={handleSubmit} variant="contained">
                    Submit
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </>
      </LayoutAdmin>
    </>
  );
};

export default ProsesData;
