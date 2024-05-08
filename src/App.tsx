import { Reset } from "styled-reset";

import RoomList from "@src/room/RoomList";
import { createStyles } from "@src/utils/utils";
import { SnackbarProvider } from "notistack";
import { createGlobalStyle } from "styled-components";
import AppleSDGothicNeoM from "@src/fonts/AppleSDGothicNeoM.ttf";
import { ThemeProvider, createTheme } from "@mui/material";

const GloabalStyle = createGlobalStyle`
  @font-face {
    font-family: 'AppleSDGothicNeoM';
    src: local('AppleSDGothicNeoM'), url(${AppleSDGothicNeoM}) format('truetype');
  }
`;

const THEME = createTheme({
  typography: {
    fontFamily: "AppleSDGothicNeoM",
  },
});

function App() {
  return (
    <div css={styles.container}>
      <Reset />
      <GloabalStyle />
      <SnackbarProvider />
      <ThemeProvider theme={THEME}>
        <RoomList />
      </ThemeProvider>
    </div>
  );
}

const styles = createStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    fontFamily: "AppleSDGothicNeoM",
  },
});

export default App;
