import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepPurple, amber, green } from "@mui/material/colors";

// Create a theme instance.
let theme = createTheme({
    palette: {
        primary: green,
        secondary: amber,
    },
});

theme = responsiveFontSizes(theme);

export default theme;
