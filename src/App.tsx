import Bed from "@src/bed/Bed";
import { createStyles } from "@src/utils/utils";
import { Reset } from "styled-reset";

function App() {
  return (
    <div css={styles.container}>
      <Reset />
      <Bed />
      <Bed />
      <Bed />
      <Bed />
    </div>
  );
}

const styles = createStyles({
  container: {
    padding: 24,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
});

export default App;
