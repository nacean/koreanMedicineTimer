import { Button, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";

import BedInfo from "@src/bed/BedInfo";
import { createStyles } from "@src/utils/utils";
import Timer from "@src/bed/Timer";
import TherapyList from "@src/bed/therapy/TherapyList";
import { getBasicTherapyList } from "@src/utils/therapyUtils";
import TherapyType from "@src/types/TherapyType";

const Bed = () => {
  const [isRunning, setIsRunning] = useState(false);

  const [therapyList, setTherapyList] = useState<TherapyType[]>(
    getBasicTherapyList()
  );
  const [pickedTherapyIndex, setPickedTherapyIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (pickedTherapyIndex === null) {
      return;
    }

    let intervalId = 0;

    const nowRemainTime = therapyList[pickedTherapyIndex].remainTime;

    if (isRunning && therapyList[pickedTherapyIndex].remainTime >= 1) {
      const updatedTherapyList = therapyList.map((therapy, index) => {
        if (pickedTherapyIndex === index) {
          return {
            ...therapy,
            remainTime: therapy.remainTime - 1,
            isComplete: therapy.remainTime - 1 === 0, //시간이 다 흐르면 자동 완료
          };
        }
        return therapy;
      });

      intervalId = setInterval(() => {
        setTherapyList(updatedTherapyList);
      }, 1000);
    } else if (nowRemainTime === 0) {
      setIsRunning(false);
      clearInterval(intervalId);
    } else {
      setIsRunning(false);
      clearInterval(intervalId);
    }

    return () => {
      if (nowRemainTime <= 0) {
        setIsRunning(false);
      }
      clearInterval(intervalId);
    };
  }, [isRunning, pickedTherapyIndex, therapyList]);

  const handleStart = () => {
    if (pickedTherapyIndex === null) {
      return;
    }

    setIsRunning(true);
  };

  const handlePause = () => {
    if (pickedTherapyIndex === null) {
      return;
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    if (pickedTherapyIndex === null) {
      return;
    }

    const updatedTherapyList = therapyList.map((therapy, index) => {
      if (pickedTherapyIndex === index) {
        return {
          ...therapy,
          remainTime: therapy.duration,
        };
      }
      return therapy;
    });

    setTherapyList(updatedTherapyList);
  };

  const handleTimerUpDown = (num: number) => {
    if (pickedTherapyIndex === null) {
      return;
    }

    const nowRemainTime = therapyList[pickedTherapyIndex].remainTime;
    let updatedTherapyList: TherapyType[] = [];

    if (nowRemainTime + num < 0) {
      updatedTherapyList = therapyList.map((therapy, index) => {
        if (pickedTherapyIndex === index) {
          return {
            ...therapy,
            remainTime: 0,
          };
        }
        return therapy;
      });
    } else {
      updatedTherapyList = therapyList.map((therapy, index) => {
        if (pickedTherapyIndex === index) {
          return {
            ...therapy,
            remainTime: therapy.remainTime + num,
          };
        }
        return therapy;
      });
    }

    setTherapyList(updatedTherapyList);
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

  const pickTherapyIndex = (index: number) => {
    setPickedTherapyIndex(index);
  };

  return (
    <Paper elevation={2} css={styles.container}>
      <BedInfo />
      <Timer
        isRunning={isRunning}
        time={
          pickedTherapyIndex !== null
            ? therapyList[pickedTherapyIndex].remainTime
            : null
        }
        handleTimerUpDown={handleTimerUpDown}
      />
      <TherapyList
        therapyList={therapyList}
        handleTherapyComplete={handleTherapyComplete}
        pickedTherapyIndex={pickedTherapyIndex}
        pickTherapyIndex={pickTherapyIndex}
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
          disabled={
            pickedTherapyIndex === null ||
            therapyList[pickedTherapyIndex].remainTime <= 0
          }
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
          disabled={pickedTherapyIndex === null}
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
    height: 570,
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
