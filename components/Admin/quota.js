import * as React from 'react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { getProcessQuota } from '../../lib/fetcher/process';
import { DataGrid } from '@mui/x-data-grid';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const columns = [
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
    field: 'totalAsFirstSupervisor',
    headerName: 'Pembimbing 1',
    width: 250,
  },
  {
    field: 'totalAsSecondSupervisor',
    headerName: 'Pembimbing 2',
    width: 250,
  },
];

const Quota = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [pageSize, setPageSize] = React.useState(10);

  const { data } = useSWR('/api/process', getProcessQuota);
  mutate('/api/process', getProcessQuota);

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Kuota Pembimbing
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
              <Typography>Hasil Kuota Pembimbing</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ height: 530, width: '100%' }}>
                <DataGrid
                  rows={data ? data : []}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  disableSelectionOnClick
                  getRowId={(row) => row.lecturer.id_lecturer}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Typography>
    </>
  );
};

export default Quota;
