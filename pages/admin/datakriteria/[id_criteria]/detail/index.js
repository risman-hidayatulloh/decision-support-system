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
import useSWR, { mutate } from 'swr';
import { useSWRConfig } from 'swr';

const columns = [
  //{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'description',
    headerName: 'Keterangan',
    width: 150,
    editable: true,
  },
  {
    field: 'fuzzy',
    headerName: 'Fuzzy',
    width: 150,
    editable: true,
  },
  {
    field: 'variable',
    headerName: 'Variabel',
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
    editable: true,
  },
  {
    field: 'delete',
    headerName: 'Delete',
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            try {
              deleteDetail_Criteria(cellValues.id);
              mutate(
                `/api/criteria/${cellValues.row.id_criteria}/detail`,
                getDetailByIdCriteria(cellValues.id)
              );
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

const DetailKriteria = () => {
  const router = useRouter();
  const { id_criteria, add, edit } = router.query;

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
      <LayoutAdmin pageTitle="Detail Kriteria">
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
                  pageSize={10}
                  rowsPerPageOptions={[]}
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

export default DetailKriteria;
