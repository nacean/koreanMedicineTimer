import { Alert, AlertTitle, Button } from "@mui/material";
import TherapyType from "@src/types/TherapyType";
import { createStyles } from "@src/utils/utils";
import { FC } from "react";

interface Props {
  pickedTherapyIndex: number | null;
  therapyList: TherapyType[];
  autoStartNextTherapy: () => void;
  handleCloseAlert: () => void;
}

const TherapyFinishAlert: FC<Props> = ({
  pickedTherapyIndex,
  therapyList,
  autoStartNextTherapy,
  handleCloseAlert,
}) => {
  if (pickedTherapyIndex === null) {
    return null;
  }

  return (
    <Alert sx={styles.container} color="success" onClose={handleCloseAlert}>
      <AlertTitle>치료 완료 알림</AlertTitle>
      <div>{`${therapyList[pickedTherapyIndex].name} 완료`}</div>
      <div>
        {therapyList.length - 1 > pickedTherapyIndex &&
          `다음 치료 : ${therapyList[pickedTherapyIndex + 1].name}`}
      </div>
      <div css={styles.buttonContainer}>
        <Button
          size="large"
          variant="contained"
          onClick={autoStartNextTherapy}
          disabled={therapyList.length - 1 === pickedTherapyIndex}
        >
          다음 치료 진행
        </Button>
        <Button size="large" color="inherit" onClick={handleCloseAlert}>
          닫기
        </Button>
      </div>
    </Alert>
  );
};

const styles = createStyles({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    border: "1px solid #757575",
    display: "flex",
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingBlock: 6,
    paddingInline: 12,
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default TherapyFinishAlert;
