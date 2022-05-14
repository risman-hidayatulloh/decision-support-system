import * as React from 'react';
import LayoutAdmin from '../components/Layout/Admin';
import { Container, Box, Typography } from '@mui/material';

export default function Index() {
  return (
    <LayoutAdmin>
      <Container>
        <Box>
          <Typography>mangats</Typography>
        </Box>
      </Container>
    </LayoutAdmin>
  );
}
