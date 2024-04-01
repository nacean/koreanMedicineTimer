import { Reset } from "styled-reset";

import RoomList from "@src/room/RoomList";
import { createStyles } from "@src/utils/utils";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div css={styles.container}>
      <Reset />
      <SnackbarProvider />
      <RoomList />
    </div>
  );
}

const styles = createStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
});

export default App;
