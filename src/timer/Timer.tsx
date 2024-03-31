import { Button, Paper, TextField } from "@mui/material";
import { getClockFromNumber } from "@src/utils/timeUtils";
import { createStyles } from "@src/utils/utils";
import { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  console.log(isRunning);

  useEffect(() => {
    let intervalId = 0;

    if (isRunning && time >= 1) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      clearInterval(intervalId);
    } else {
      setIsRunning(false);
      clearInterval(intervalId);
    }

    return () => {
      if (time < 1) {
        setIsRunning(false);
      }
      clearInterval(intervalId);
    };
  }, [isRunning, time]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
  };

  const handleTimerUpDown = (num: number) => {
    if (time + num < 0) {
      setTime(0);
    } else {
      setTime(time + num);
    }
  };

  return (
    <Paper elevation={2} css={styles.container}>
      <div css={styles.infoContainer}>
        <TextField label="배드명" size="small" />
        <TextField label="환자정보" size="small" />
      </div>
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
      <div>중간에 들어갈 항목 들 ex.침, 물리치료, 핫팩...</div>
      <div css={styles.timeModifyButtonContainer}>
        <Button
          variant="contained"
          color={isRunning ? "inherit" : "primary"}
          onClick={isRunning ? handlePause : handleStart}
          disabled={time < 1}
          size="large"
          css={{ flex: 1 }}
        >
          {isRunning ? "정지" : "시작"}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleReset}
          size="large"
          css={{ flex: 1 }}
        >
          초기화
        </Button>
      </div>
    </Paper>
  );
};

const styles = createStyles({
  container: {
    width: 240,
    height: 300,
    paddingTop: 4,
    paddingBottom: 2,
    paddingInline: 2,

    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  clockContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    paddingBlock: 2,
    paddingInline: 10,
    borderRadius: 4,
    fontSize: 40,
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
    width: 22,
    height: 22,
  },
  timeStateContainer: {
    width: 76,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: 4,
    fontSize: 22,
  },
  timeModifyButtonContainer: {
    marginTop: "auto",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});

export default Timer;
