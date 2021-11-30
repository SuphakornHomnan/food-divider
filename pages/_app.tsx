import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { StateProvider } from "../src/hooks/context";

const theme = createTheme({
  palette: {},
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: "1px 1px 20px #ececec",
          padding: "1rem",
        },
      },
    },
  },
  typography: {
    fontFamily: ['"Prompt"', '"sans-serif"'].join(","),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StateProvider>
  );
}

export default MyApp;
