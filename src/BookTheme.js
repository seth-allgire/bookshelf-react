import { createTheme } from "@mui/material";

const BookTheme = createTheme({
  palette: {
    primary: {
      main: "#1a6a86",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1a6986bb",
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
        containedPrimary: {
          marginLeft: "5px",
          marginTop: "18px",
          backgroundColor: "#1a6a86",
          textTransform: "none",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#1a6986bb",
          },
        },
        containedSecondary: {
          color: "#ffffff",
          fontSize: "12px",
          textTransform: "none",
          marginRight: "5px",
          marginTop: "15px",
          marginBottom: 2,
          backgroundColor: "#1a6a86",
          "&:hover": {
            backgroundColor: "#1a6986bb",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          margin: 1,
          backgroundColor: "#1a6a86",
        },
      },
    },
  },
});

export default BookTheme;
