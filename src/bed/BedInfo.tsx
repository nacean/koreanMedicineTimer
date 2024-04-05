import { TextField } from "@mui/material";

import { createStyles } from "@src/utils/utils";
import { FC } from "react";

interface Props {
  bedName: string;
  patientInfo: string;
  handlePatientInfo: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const BedInfo: FC<Props> = ({ bedName, patientInfo, handlePatientInfo }) => {
  return (
    <div css={styles.infoContainer}>
      <TextField
        size="small"
        value={bedName}
        InputProps={{
          sx: styles.bedNameContainer,
          readOnly: true,
        }}
        sx={{ width: "50%" }}
      />
      <TextField
        label="환자 정보"
        size="small"
        value={patientInfo}
        onChange={handlePatientInfo}
        InputProps={{
          sx: styles.patientInfoContainer,
        }}
        InputLabelProps={{ sx: { paddingTop: 0.4 } }}
        sx={{ width: "50%" }}
      />
    </div>
  );
};
const styles = createStyles({
  infoContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  bedNameContainer: {
    backgroundColor: "#ffff8d",
    fontWeight: 700,
    fontSize: 24,
    height: 50,
  },
  patientInfoContainer: {
    height: 50,
    fontWeight: 600,
  },
});
export default BedInfo;
