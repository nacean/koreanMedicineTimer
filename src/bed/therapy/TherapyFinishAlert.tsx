import {
  Alert,
  AlertTitle,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { FC, useEffect, useState } from "react";

import TherapyType from "@src/types/TherapyType";
import { createStyles } from "@src/utils/utils";

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
  const [colorIndex, setColorIndex] = useState<number>(0);

  const colorArray: ("success" | "error")[] = ["success", "error"];

  useEffect(() => {
    let intervalId = 0;

    intervalId = setInterval(() => {
      setColorIndex(colorIndex === 0 ? 1 : 0);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [colorIndex]);

  if (pickedTherapyIndex === null) {
    return null;
  }

  return (
    <Alert
      sx={styles.container}
      color={colorArray[colorIndex]}
      onClose={handleCloseAlert}
    >
      <AlertTitle>치료 완료 알림</AlertTitle>
      <List css={styles.list}>
        <ListItem disablePadding>
          <ListItemIcon>
            <CheckCircleIcon sx={styles.listIcon} />
          </ListItemIcon>
          <ListItemText>
            <div css={styles.listTextContainer}>
              <div>완료: </div>
              <div css={styles.doneTherapyText}>
                {therapyList[pickedTherapyIndex].name}
              </div>
            </div>
          </ListItemText>
        </ListItem>
        {
          <ListItem disablePadding>
            <ListItemIcon>
              <ArrowCircleRightIcon sx={styles.listIcon} />
            </ListItemIcon>
            <ListItemText>
              <div css={styles.listTextContainer}>
                <div>다음: </div>
                {pickedTherapyIndex &&
                therapyList.length - 1 > pickedTherapyIndex ? (
                  <div css={styles.nextTherapyText}>
                    {therapyList[pickedTherapyIndex + 1].name}
                  </div>
                ) : (
                  <div css={{ color: "#bdbdbd" }}>없음</div>
                )}
              </div>
            </ListItemText>
          </ListItem>
        }
      </List>
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
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 24,
    paddingBlock: 24,
  },
  listIcon: {
    fontSize: 40,
    color: "#000",
  },
  listTextContainer: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 30,
  },
  doneTherapyText: {
    color: "red",
  },
  nextTherapyText: {
    color: "blue",
  },
});

export default TherapyFinishAlert;
