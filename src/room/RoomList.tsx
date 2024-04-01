import { useState } from "react";

import { Tabs, Tab, Box } from "@mui/material";
import Room from "@src/room/Room";

const RoomList = () => {
  const [nowRoomNum, setNowRoomNum] = useState<number>(0);

  const roomNumArray = [0, 1, 2, 3, 4, 5];

  const a11yProps = (index: number) => {
    return {
      id: `room-tab-${index}`,
      "aria-controls": `room-tabpanel-${index}`,
    };
  };

  const handleRoomChange = (_: React.SyntheticEvent, newValue: number) => {
    setNowRoomNum(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={nowRoomNum}
          onChange={handleRoomChange}
          aria-label="room tabs"
          centered
        >
          {roomNumArray.map((roomNum) => (
            <Tab label={`치료실${roomNum + 1}`} {...a11yProps(roomNum)} />
          ))}
        </Tabs>
      </Box>
      {roomNumArray.map((roomNum) => (
        <Room nowRoomNum={nowRoomNum} thisRoomNum={roomNum} />
      ))}
    </div>
  );
};
export default RoomList;
