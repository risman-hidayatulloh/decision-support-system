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
    width: 210,
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
    field: 'edit',
    headerName: 'Edit',
    renderCell: (cellValues) => {
      const router = useRouter();

      return (
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
              deleteDetail_Criteria(cellValues.id);
              // console.log('test1');
              // console.log(cellValues.id);
              // console.log(cellValues.row.id_criteria);
              mutate(
                `/api/criteria/${cellValues.row.id_criteria}/detail`,
                getDetailByIdCriteria(cellValues.id)
              );
              console.log('test2');
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
                Tambah Detail Kriteria
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
