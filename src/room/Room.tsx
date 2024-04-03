import Bed from "@src/bed/Bed";
import { createStyles } from "@src/utils/utils";
import { FC } from "react";

interface Props {
  nowRoomNum: number;
  thisRoomNum: number;
  handleChangeRoomDoneBedCount: (addCount: number) => void;
}

const Room: FC<Props> = ({
  nowRoomNum,
  thisRoomNum,
  handleChangeRoomDoneBedCount,
}) => {
  const bedNumArray = [1, 2, 3, 4, 5, 6];

  return (
    <div
      role="roomPanel"
      hidden={nowRoomNum !== thisRoomNum}
      id={`room-tabpanel-${thisRoomNum}`}
      aria-labelledby={`room-tab-${thisRoomNum}`}
      css={styles.container}
    >
      {bedNumArray.map((_, index) => (
        <Bed
          roomNum={thisRoomNum}
          addDoneBedCount={handleChangeRoomDoneBedCount}
          key={"room" + thisRoomNum + "bed" + index}
        />
      ))}
    </div>
  );
};

const styles = createStyles({
  container: {
    paddingBlock: 36,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
  },
});

export default Room;
