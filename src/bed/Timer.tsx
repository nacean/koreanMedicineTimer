import { Button } from "@mui/material";
import { getClockFromNumber } from "@src/utils/timeUtils";
import { createStyles } from "@src/utils/utils";
import { FC } from "react";

interface Props {
  isRunning: boolean;
  time: number | null;
  handleTimerUpDown: (num: number) => void;
}

const Timer: FC<Props> = ({ isRunning, time, handleTimerUpDown }) => {
  const getBackgroundByTime = () => {
    if (time === null) {
      return undefined;
    }
    if (time === 0) {
      return "red";
    }
    if (time <= 60) {
      return "yellow";
    }

    return undefined;
  };

  const getTherapyState = () => {
    if (time !== null) {
      if (time === 0) {
        return "완료";
      } else {
        if (isRunning) {
          return "치료중";
        } else {
          return "대기중";
        }
      }
    }

    return null;
  };

  return (
    <div css={styles.clockContainer}>
      <div
        css={styles.clock}
        style={{
          color: isRunning ? "red" : "black",
          backgroundColor: getBackgroundByTime(),
        }}
      >
        {time !== null && getClockFromNumber(time)}
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
        style={{
          color: isRunning ? "red" : "black",
          backgroundColor: getBackgroundByTime(),
        }}
      >
        {getTherapyState()}
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
    width: 152,
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    paddingTop: 12,
    paddingBottom: 6,
    paddingInline: 10,
    borderRadius: 4,
    fontSize: 60,
    fontWeight: 600,
  },
  clockButtonContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 2,
  },
  clockAdjustButton: {
    backgroundColor: "#fff",
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
    fontSize: 28,
    fontWeight: 700,
  },
});

export default Timer;
