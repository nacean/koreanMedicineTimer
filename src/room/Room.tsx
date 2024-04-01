import Bed from "@src/bed/Bed";
import { createStyles } from "@src/utils/utils";
import { FC } from "react";

interface Props {
  nowRoomNum: number;
  thisRoomNum: number;
}

const Room: FC<Props> = ({ nowRoomNum, thisRoomNum }) => {
  return (
    <div
      role="roomPanel"
      hidden={nowRoomNum !== thisRoomNum}
      id={`room-tabpanel-${thisRoomNum}`}
      aria-labelledby={`room-tab-${thisRoomNum}`}
      css={styles.container}
    >
      <Bed />
      <Bed />
      <Bed />
      <Bed />
      <Bed />
      <Bed />
    </div>
  );
};

const styles = createStyles({
  container: {
    width: 1000,
    padding: 24,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
  },
});

export default Room;
