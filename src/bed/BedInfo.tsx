import { TextField } from "@mui/material";

import { createStyles } from "@src/utils/utils";

const BedInfo = () => {
  return (
    <div css={styles.infoContainer}>
      <TextField label="배드명" size="small" />
      <TextField label="환자정보" size="small" />
    </div>
  );
};
const styles = createStyles({
  infoContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
});
export default BedInfo;
