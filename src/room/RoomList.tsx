import { useState } from "react";

import { Tabs, Box, Button } from "@mui/material";
import Room from "@src/room/Room";
import RoomTab from "@src/room/RoomTab";
import { createStyles } from "@src/utils/utils";

const RoomList = () => {
  //const roomNumArray = [0, 1, 2, 3, 4, 5];
  const roomNumArray = [0];

  const [nowRoomNum, setNowRoomNum] = useState<number>(0);
  const [roomDoneBedCountArray, setRoomDoneBedCountArray] = useState<number[]>(
    roomNumArray.map(() => 0)
  );

  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

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

  const handleChangeSoundOn = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <div css={styles.container}>
      <Button
        size="large"
        variant="contained"
        color={isSoundOn ? "success" : "warning"}
        sx={styles.notificationSoundChangeButton}
        onClick={handleChangeSoundOn}
      >{`알림 소리 ${isSoundOn ? "켜짐" : "꺼짐"}`}</Button>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#D7D0C4",
        }}
      >
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
      <div
        css={{
          paddingBottom: 90,
        }}
      >
        {roomNumArray.map((roomNum) => (
          <Room
            nowRoomNum={nowRoomNum}
            thisRoomNum={roomNum}
            handleChangeRoomDoneBedCount={(addCount: number) => {
              handleChangeRoomDoneBedCount(roomNum, addCount);
            }}
            key={"room" + roomNum}
            isSoundOn={isSoundOn}
          />
        ))}
      </div>
    </div>
  );
};

const styles = createStyles({
  container: {
    width: "100%",
    position: "relative",
    backgroundColor: "#fcfcfc",
  },
  notificationSoundChangeButton: {
    position: "absolute",
    top: 3,
    right: 12,
    zIndex: 1,
  },
});

export default RoomList;
