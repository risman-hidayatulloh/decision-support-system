import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#0f52ba', //blue
    },
    secondary: {
      main: '#96ded1', //green
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
