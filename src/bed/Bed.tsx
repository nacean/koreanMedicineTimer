import { Button, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";

import BedInfo from "@src/bed/BedInfo";
import { createStyles } from "@src/utils/utils";
import Timer from "@src/bed/Timer";
import TherapyList from "@src/bed/therapy/TherapyList";
import { getBasicTherapyList } from "@src/utils/therapyUtils";
import TherapyType from "@src/types/TherapyType";

const Bed = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [therapyList, setTherapyList] = useState<TherapyType[]>(
    getBasicTherapyList()
  );
  const [nowTherapy, setNowTherapy] = useState<TherapyType | null>(null);

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

  const handleTherapyComplete = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleIndex: number
  ) => {
    setTherapyList(
      therapyList.map((therapy, index) => {
        if (index === handleIndex) {
          return {
            ...therapy,
            isComplete: event.target.checked,
          };
        } else {
          return therapy;
        }
      })
    );
  };

  return (
    <Paper elevation={2} css={styles.container}>
      <BedInfo />
      <Timer
        isRunning={isRunning}
        time={time}
        handleTimerUpDown={handleTimerUpDown}
      />
      <TherapyList
        therapyList={therapyList}
        handleTherapyComplete={handleTherapyComplete}
      />
      <TextField
        id="outlined-multiline-static"
        label="치료 부위 메모"
        multiline
        rows={3}
      />
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
    width: 320,
    height: 560,
    paddingTop: 4,
    paddingBottom: 2,
    paddingInline: 2,

    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  memoContainer: {
    marginBlock: 4,
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

export default Bed;
