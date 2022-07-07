import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import LayoutAdmin from '/components/Layout/Admin';
import { getSupervisorByIdStudent } from '../../../../../lib/fetcher/supervisor';
import useSWR, { useSWRConfig } from 'swr';

const columns = [
  //{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'supervisor1',
    headerName: 'Pembimbing 1',
    width: 230,
  },
  {
    field: 'supervisor2',
    headerName: 'Pembimbing 2',
    width: 230,
  },
];

const Supervisor = () => {
  const router = useRouter();
  const { id_student } = router.query;
  const [pageSize, setPageSize] = React.useState(1);

  const { data } = useSWR(
    id_student ? `/api/student/${id_student}/supervisor` : null,
    () => getSupervisorByIdStudent(id_student)
  );

  //console.log(data);

  return (
    <>
      <LayoutAdmin pageTitle="Data Mahasiswa > Supervisor">
        <>
          <Box sx={{ height: 170, width: '100%' }}>
            <DataGrid
              rows={data ? data : []}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[1]}
              pagination
              //checkboxSelection
              disableSelectionOnClick
              getRowId={(row) => row.id_supervisor}
            />
          </Box>
        </>
      </LayoutAdmin>
    </>
  );
};

export default Supervisor;
