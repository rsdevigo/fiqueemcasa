import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: "#32A041"
      main: "#1565c0",
      light: "#5e92f3",
      dark: "#003c8f"
    },
    secondary: {
      // main: "#006837"
      main: "#82b1ff",
      light: "#b6e3ff",
      dark: "#4d82cb"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#EFEFEF"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      contrastText: "#ffcc00"
    }
  },
  typography: {},
  spacing: 4
});

export default theme;
