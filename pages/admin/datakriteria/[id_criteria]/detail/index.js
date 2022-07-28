import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import LayoutAdmin from '/components/Layout/Admin';
import {
  getDetailByIdCriteria,
  deleteDetail_Criteria,
} from '../../../../../lib/fetcher/detail_criteria';
import EditDetail from '../../../../../sections/criteriadetail/EditDetailCriteria';
import AddDetail from '../../../../../sections/criteriadetail/AddDetailCriteria';
import useSWR, { useSWRConfig } from 'swr';

const columns = [
  //{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'description',
    headerName: 'Keterangan',
    width: 230,
  },
  {
    field: 'fuzzy',
    headerName: 'Fuzzy',
    width: 100,
  },
  {
    field: 'variable',
    headerName: 'Variabel',
    width: 200,
  },
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
              router.push(
                `/admin/datakriteria/${cellValues.row.id_criteria}/detail?edit=${cellValues.id}`
              )
            }
          >
            Edit
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => {
              deleteDetail_Criteria(cellValues.id);
              mutate(
                `/api/criteria/${cellValues.row.id_criteria}/detail`,
                getDetailByIdCriteria(cellValues.id)
              );
            }}
          >
            Delete
          </Button> */}
        </Box>
      );
    },
    width: 190,
  },
];

const Detail = () => {
  const router = useRouter();
  const { id_criteria, add, edit } = router.query;
  const [pageSize, setPageSize] = React.useState(10);

  const { data } = useSWR(
    id_criteria ? `/api/criteria/${id_criteria}/detail` : null,
    () => getDetailByIdCriteria(id_criteria)
  );
  const { mutate } = useSWRConfig();
  mutate(
    `/api/criteria/${id_criteria}/detail`,
    getDetailByIdCriteria(id_criteria)
  );

  return (
    <>
      <LayoutAdmin pageTitle="Data Kriteria > Detail">
        <>
          {add ? (
            <AddDetail />
          ) : edit ? (
            <EditDetail />
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() =>
                  router.push(
                    `/admin/datakriteria/${id_criteria}/detail?add=true`
                  )
                }
              >
                Add Detail Criteria
              </Button>
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
                  getRowId={(row) => row.id_detail_criteria}
                />
              </Box>
            </>
          )}
        </>
      </LayoutAdmin>
    </>
  );
};

export default Detail;
