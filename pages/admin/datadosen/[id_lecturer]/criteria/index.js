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
import AddCriteria from '../../../../../sections/lecturercriteria/AddCriteriaLecturer';
import EditCriteria from '../../../../../sections/lecturercriteria/EditCriteriaLecturer';
import useSWR, { useSWRConfig } from 'swr';

const columns = [
  // { field: 'id_lecturer', headerName: 'ID Lecturer', width: 100 },
  {
    field: 'name_criteria',
    headerName: 'Kriteria',
    valueGetter: (params) => {
      const { row } = params;
      return row.detail_criteria.criteria.name_criteria;
    },
    width: 230,
  },
  {
    field: 'description',
    headerName: 'Sub Kriteria',
    valueGetter: (params) => {
      const { row } = params;
      return row.detail_criteria.description;
    },
    width: 250,
  },
  // {
  //   field: 'action',
  //   headerName: 'Aksi',
  //   renderCell: (cellValues) => {
  //     const router = useRouter();
  //     const { mutate } = useSWRConfig();
  //     return (
  //       <Box sx={{ display: 'flex', gap: 1 }}>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={() =>
  //             router.push(
  //               `/admin/datadosen/${cellValues.row.id_lecturer}/criteria?edit=${cellValues.id}`
  //             )
  //           }
  //         >
  //           Edit
  //         </Button>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={() => {
  //             try {
  //               deleteCriteria_Lecturer(cellValues.id);
  //               console.log('delete', cellValues.id);
  //               mutate(
  //                 `/api/lecturer/${cellValues.row.id_lecturer}/criteria`,
  //                 getCriteriaByIdLecturer(cellValues.id)
  //               );
  //             } catch (error) {
  //               console.log(error);
  //             }
  //           }}
  //         >
  //           Delete
  //         </Button>
  //       </Box>
  //     );
  //   },
  //   width: 180,
  // },
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
          {add ? (
            <AddCriteria />
          ) : edit ? (
            <EditCriteria />
          ) : (
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
          )}
        </>
      </LayoutAdmin>
    </>
  );
};

export default Criteria;
