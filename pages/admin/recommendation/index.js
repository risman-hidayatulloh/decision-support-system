import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import LayoutAdmin from '/components/Layout/Admin';
import useSWR, { useSWRConfig } from 'swr';
import { getResults } from '../../../lib/fetcher/result';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const columns = [
  {
    field: 'name_student',
    headerName: 'Nama Mahasiswa',
    valueGetter: (params) => {
      const { row } = params;

      return row.student.name_student;
    },
    width: 200,
  },
  {
    field: 'name_lectur_pem1',
    headerName: 'Pembimbing 1',
    valueGetter: (params) => {
      const { row } = params;
      return row.first_supervisor.name_lecturer;
    },
    width: 230,
  },
  {
    field: 'name_lecturer_pem2',
    headerName: 'Pembimbing 2',
    valueGetter: (params) => {
      const { row } = params;
      return row.second_supervisor.name_lecturer;
    },
    width: 230,
  },
];

const Recommendation = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = React.useState(10);

  const { data } = useSWR('/api/result', getResults);

  console.log(data);

  return (
    <>
      <LayoutAdmin pageTitle="Hasil Rekomendasi">
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={16}>
                {/* <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Berdasarkan Sistem</Typography>
                  </AccordionSummary>
                  <AccordionDetails> */}
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
                    getRowId={(row) => row.student.id_student}
                  />
                </Box>
                {/* </AccordionDetails>
                </Accordion> */}
              </Grid>
              {/* <Grid item xs={8}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Berdasarkan Dataset</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ height: 640, width: '100%' }}>
                      <DataGrid
                        rows={data ? data : []}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        //checkboxSelection
                        disableSelectionOnClick
                        getRowId={(row) => row.student.id_student}
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid> */}
            </Grid>
          </Box>
        </>
      </LayoutAdmin>
    </>
  );
};

export default Recommendation;
