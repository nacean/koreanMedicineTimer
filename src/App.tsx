import Timer from "@src/timer/Timer";
import { createStyles } from "@src/utils/utils";
import { Reset } from "styled-reset";

function App() {
  return (
    <div css={styles.container}>
      <Reset />
      <Timer />
      <Timer />
      <Timer />
      <Timer />
    </div>
  );
}

const styles = createStyles({
  container: {
    padding: 24,
    display: "flex",
    gap: 12,
  },
});

export default App;
