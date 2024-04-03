import { TextField } from "@mui/material";

import { createStyles } from "@src/utils/utils";
import { FC } from "react";

interface Props {
  bedName: string;
  handleBedName: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  patientInfo: string;
  handlePatientInfo: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const BedInfo: FC<Props> = ({
  bedName,
  handleBedName,
  patientInfo,
  handlePatientInfo,
}) => {
  return (
    <div css={styles.infoContainer}>
      <TextField
        label="배드명"
        size="small"
        value={bedName}
        onChange={handleBedName}
      />
      <TextField
        label="환자정보"
        size="small"
        value={patientInfo}
        onChange={handlePatientInfo}
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
});
export default BedInfo;
