import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6", //blue
    },
    secondary: {
      main: "#19857b", //green
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;