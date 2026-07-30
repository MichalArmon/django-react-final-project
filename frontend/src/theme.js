// src/theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

/* ------------------------------
   בסיס טיפוגרפי משותף
-------------------------------- */
const baseTypography = {
  fontFamily: `"Wix Madefor Display", system-ui, "Segoe UI", Arial, sans-serif`,
};

/* ------------------------------
   🎨 Resort Theme – חמים ואלגנטי
-------------------------------- */
let themeResort = createTheme({
  typography: baseTypography,
  palette: {
    mode: "light",
    primary: { main: "#6D3FC0" }, // חום־זהוב טבעי
    secondary: { main: "#F28C28" },
    background: { default: "#FBF8F3" },
  },
});
themeResort = responsiveFontSizes(themeResort);

export default themeResort;
