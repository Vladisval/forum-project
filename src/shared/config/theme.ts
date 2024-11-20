import { createTheme } from "@mui/material/styles";
import { grey, orange, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: orange[800],
    },
    background: {
      default: grey[200],
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h1: { fontSize: "2.5rem" },
    body1: { fontSize: "1rem" },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: 'orange',
          '&.Mui-selected': {
            // backgroundColor: 'black',
            // color: 'black',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "40px",
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: "40px",
          padding: "10px",
        },
        select: {
          padding: "2px",
        }
      }
    },

  },

});