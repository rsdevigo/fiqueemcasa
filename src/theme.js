import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#32A041"
    },
    secondary: {
      main: "#006837"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#32A041"
    },
    text: {
      primary: "#ffffff",
      contrastText: "#ffcc00"
    }
  },
  typography: {},
  spacing: 4
});

export default theme;
