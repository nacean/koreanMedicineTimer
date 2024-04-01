import { Reset } from "styled-reset";

import RoomList from "@src/room/RoomList";
import { createStyles } from "@src/utils/utils";

function App() {
  return (
    <div css={styles.container}>
      <Reset />
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
