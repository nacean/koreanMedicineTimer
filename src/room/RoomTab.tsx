import { Tab } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface Props {
  roomNum: number;
  isAlert: boolean;
}

const RoomTab: FC<Props> = ({ roomNum, isAlert, ...props }) => {
  const [tabBackgroundColor, setTabBackgroundColor] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | number = 0;

    if (isAlert) {
      intervalId = setInterval(() => {
        setTabBackgroundColor(
          tabBackgroundColor === undefined ? "#ff5252" : undefined
        );
      }, 1000);
    } else {
      setTabBackgroundColor(undefined);
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isAlert, tabBackgroundColor]);

  const a11yProps = (index: number) => {
    return {
      id: `room-tab-${index}`,
      "aria-controls": `room-tabpanel-${index}`,
    };
  };

  return (
    <Tab
      label={"치료실"}
      sx={{ background: tabBackgroundColor }}
      {...a11yProps(roomNum)}
      {...props}
    />
  );
};
export default RoomTab;
