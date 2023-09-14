import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
    },
    background: {
      default: "#000", // Background color for light mode
      paper: "#000", // Background color for components
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ddd",
    },
    background: {
      default: "#FFFFFF", // Background color for light mode
      paper: "#F5F5F5", // Background color for components
    },
  },
});
