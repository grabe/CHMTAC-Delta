// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5733", // Your custom primary color
    },
    secondary: {
      main: "#4caf50", // Your custom secondary color
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f5f5f5", // Light gray background
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#607d8b", // Custom bluish-gray color for buttons
          color: "white", // Button text color
          "&:hover": {
            backgroundColor: "#455a64", // Darker shade for hover effect
          },
        },
      },
    },
  },
});

export default theme;
