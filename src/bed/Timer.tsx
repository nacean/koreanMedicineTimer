import { Button } from "@mui/material";
import { getClockFromNumber } from "@src/utils/timeUtils";
import { createStyles } from "@src/utils/utils";
import { FC } from "react";

interface Props {
  isRunning: boolean;
  time: number;
  handleTimerUpDown: (num: number) => void;
}

const Timer: FC<Props> = ({ isRunning, time, handleTimerUpDown }) => {
  return (
    <div css={styles.clockContainer}>
      <div css={styles.clock} style={{ color: isRunning ? "red" : "black" }}>
        {getClockFromNumber(time)}
      </div>
      <div css={styles.clockButtonContainer}>
        <Button
          size="small"
          variant="outlined"
          css={styles.clockAdjustButton}
          onClick={() => {
            handleTimerUpDown(60);
          }}
        >
          +
        </Button>
        <Button
          size="small"
          variant="outlined"
          css={styles.clockAdjustButton}
          color="warning"
          onClick={() => {
            handleTimerUpDown(-60);
          }}
        >
          -
        </Button>
      </div>
      <div
        css={styles.timeStateContainer}
        style={{ color: isRunning ? "red" : "black" }}
      >
        {isRunning ? "치료중" : "대기중"}
      </div>
    </div>
  );
};

const styles = createStyles({
  clockContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clock: {
    width: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    paddingBlock: 8,
    paddingInline: 10,
    borderRadius: 4,
    fontSize: 44,
  },
  clockButtonContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 2,
  },
  clockAdjustButton: {
    minWidth: 0,
    width: 30,
    height: 30,
  },
  timeStateContainer: {
    width: 80,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: 4,
    fontSize: 22,
  },
});

export default Timer;
