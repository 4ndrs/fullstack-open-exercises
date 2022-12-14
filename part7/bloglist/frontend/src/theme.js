import { red, blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e33b8f",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: blue.A200,
    },
  },
});

export default theme;
