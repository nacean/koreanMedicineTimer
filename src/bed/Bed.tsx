import { Button, IconButton, Paper, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, FC } from "react";

import BedInfo from "@src/bed/BedInfo";
import { createStyles } from "@src/utils/utils";
import Timer from "@src/bed/Timer";
import TherapyList from "@src/bed/therapy/TherapyList";
import { getBasicTherapyList } from "@src/utils/therapyUtils";
import TherapyType from "@src/types/TherapyType";
import TherapyFinishAlert from "@src/bed/therapy/TherapyFinishAlert";
import { closeSnackbar, enqueueSnackbar } from "notistack";

interface Props {
  bedNum: number;
  roomNum: number;
  addDoneBedCount: (addCount: number) => void;
}

const Bed: FC<Props> = ({ bedNum, roomNum, addDoneBedCount }) => {
  const bedName = `Bed${bedNum}`;
  const [patientInfo, setPatientInfo] = useState<string>("");
  const [cureMemo, setCureMemo] = useState<string>("");

  const [isRunning, setIsRunning] = useState(false); // 타이머가 작동 하는가
  const [openDoneAlert, setOpenDoneAlert] = useState(false); // 타이머가 자동으로 끝난 것인가 (alert 띄워주기 위함)

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

    let intervalId: NodeJS.Timeout | number = 0;

    const nowRemainTime = therapyList[pickedTherapyIndex].remainTime;

    if (isRunning && nowRemainTime >= 1) {
      intervalId = setInterval(() => {
        const updatedTherapyList = therapyList.map((therapy, index) => {
          if (pickedTherapyIndex === index) {
            const updatedRemainTime = therapy.remainTime - 1;

            return {
              ...therapy,
              remainTime: updatedRemainTime,
              isComplete: updatedRemainTime === 0, //시간이 다 흐르면 자동 완료
            };
          }
          return therapy;
        });
        setTherapyList(updatedTherapyList);
      }, 10);
    } else if (isRunning && nowRemainTime === 0) {
      setOpenDoneAlert(true);
      addDoneBedCount(1);
      const snackBarKey = enqueueSnackbar(
        <div css={styles.snackBarContainer}>
          <div>
            {`[${bedName}]에서 [${[therapyList[pickedTherapyIndex].name]}]이(가) 끝났습니다.`}
          </div>
          <IconButton
            onClick={() => {
              closeSnackbar(snackBarKey);
            }}
            sx={styles.closeButton}
            size="small"
          >
            <CloseIcon fontSize="small" sx={{ color: "#fff" }} />
          </IconButton>
        </div>,
        {
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          variant: "success",
          autoHideDuration: 10000,
        }
      );
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
  }, [
    addDoneBedCount,
    bedName,
    isRunning,
    pickedTherapyIndex,
    roomNum,
    therapyList,
  ]);

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
          isComplete: false,
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
    setIsRunning(false);
    setPickedTherapyIndex(index);
  };

  const autoStartNextTherapy = () => {
    if (
      pickedTherapyIndex === null ||
      pickedTherapyIndex === therapyList.length - 1
    ) {
      return;
    }
    setOpenDoneAlert(false);
    setPickedTherapyIndex(pickedTherapyIndex + 1);
    handleStart();
    addDoneBedCount(-1);
  };

  const handleCloseAlert = () => {
    addDoneBedCount(-1);
    setOpenDoneAlert(false);
  };

  const handlePatientInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPatientInfo(e.target.value);
  };

  const handleCureMemo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCureMemo(e.target.value);
  };

  const allReset = () => {
    setPatientInfo("");
    setCureMemo("");
    setIsRunning(false);
    setOpenDoneAlert(false);
    setTherapyList(getBasicTherapyList());
    setPickedTherapyIndex(null);
  };

  return (
    <div css={styles.container}>
      <Button color="warning" onClick={allReset}>
        전체 초기화
      </Button>
      <Paper elevation={2} css={styles.paperContainer}>
        <BedInfo
          bedName={bedName}
          patientInfo={patientInfo}
          handlePatientInfo={handlePatientInfo}
        />
        <Timer
          isRunning={isRunning}
          time={
            pickedTherapyIndex !== null
              ? therapyList[pickedTherapyIndex].remainTime
              : null
          }
          handleTimerUpDown={handleTimerUpDown}
        />
        <div css={styles.underTimerContainer}>
          {openDoneAlert && (
            <TherapyFinishAlert
              pickedTherapyIndex={pickedTherapyIndex}
              therapyList={therapyList}
              autoStartNextTherapy={autoStartNextTherapy}
              handleCloseAlert={handleCloseAlert}
            />
          )}
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
            value={cureMemo}
            onChange={handleCureMemo}
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
              variant="outlined"
              color="error"
              onClick={handleReset}
              size="large"
              css={{ flex: 1 }}
              disabled={pickedTherapyIndex === null}
            >
              시간 초기화
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

const styles = createStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    gap: 2,
  },
  paperContainer: {
    width: 290,
    height: 570,
    paddingTop: 6,
    paddingBottom: 2,
    paddingInline: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  underTimerContainer: {
    position: "relative",
    width: "100%",
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
  snackBarContainer: {
    width: 340,
    display: "flex",
    alignItems: "center",
  },
  closeButton: {
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Bed;
