import { useState } from "react";

import { Tabs, Box } from "@mui/material";
import Room from "@src/room/Room";
import RoomTab from "@src/room/RoomTab";

const RoomList = () => {
  const roomNumArray = [0, 1, 2, 3, 4, 5];

  const [nowRoomNum, setNowRoomNum] = useState<number>(0);
  const [roomDoneBedCountArray, setRoomDoneBedCountArray] = useState<number[]>(
    roomNumArray.map(() => 0)
  );

  const handleRoomChange = (_: React.SyntheticEvent, newValue: number) => {
    setNowRoomNum(newValue);
  };

  const handleChangeRoomDoneBedCount = (roomNum: number, addCount: number) => {
    const updatedroomDoneBedCountArray = roomDoneBedCountArray.map(
      (roomDoneBedCount, index) => {
        if (roomNum === index) {
          return roomDoneBedCount + addCount;
        }

        return roomDoneBedCount;
      }
    );

    setRoomDoneBedCountArray(updatedroomDoneBedCountArray);
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
            <RoomTab
              roomNum={roomNum}
              isAlert={roomDoneBedCountArray[roomNum] > 0}
              key={"tab" + roomNum}
            />
          ))}
        </Tabs>
      </Box>
      {roomNumArray.map((roomNum) => (
        <Room
          nowRoomNum={nowRoomNum}
          thisRoomNum={roomNum}
          handleChangeRoomDoneBedCount={(addCount: number) => {
            handleChangeRoomDoneBedCount(roomNum, addCount);
          }}
          key={"room" + roomNum}
        />
      ))}
    </div>
  );
};
export default RoomList;
