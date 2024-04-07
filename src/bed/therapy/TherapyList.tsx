import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import { FC } from "react";

import TherapyType from "@src/types/TherapyType";
import { getTherapyTime } from "@src/utils/timeUtils";
import { createStyles } from "@src/utils/utils";

interface Props {
  therapyList: TherapyType[];
  handleTherapyComplete: (
    event: React.ChangeEvent<HTMLInputElement>,
    handleIndex: number
  ) => void;
  pickedTherapyIndex: number | null;
  pickTherapyIndex: (pickIndex: number) => void;
}

const TherapyList: FC<Props> = ({
  therapyList,
  handleTherapyComplete,
  pickedTherapyIndex,
  pickTherapyIndex,
}) => {
  return (
    <TableContainer css={{ border: "1px solid #9e9e9e" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow css={{ background: "#f5f5f5" }}>
            <TableCell
              css={{
                borderRight: "1px solid #9e9e9e",
                borderBottom: "1px solid #9e9e9e",
              }}
              sx={styles.headCornerCell}
            >
              치료항목
            </TableCell>
            <TableCell align="right" sx={styles.headCell}>
              필요시간
            </TableCell>
            <TableCell align="right" sx={styles.headCell}>
              남은시간
            </TableCell>
            <TableCell align="right" sx={styles.headCell}>
              완료
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {therapyList.map((row, index) => (
            <TableRow
              hover
              onClick={() => {
                pickTherapyIndex(index);
              }}
              key={row.name}
              style={{
                outline:
                  index === pickedTherapyIndex
                    ? "3px solid #2196f3"
                    : undefined,
                outlineOffset: -3,
              }}
            >
              <TableCell
                align="center"
                css={[
                  styles.bodyCell,
                  {
                    borderRight: "1px solid #9e9e9e",
                    borderBottom:
                      therapyList.length - 1 === index
                        ? undefined
                        : "1px solid #9e9e9e",
                  },
                ]}
              >
                {row.name}
              </TableCell>
              <TableCell align="right" css={styles.bodyCell}>
                {getTherapyTime(row.duration)}
              </TableCell>
              <TableCell align="right" css={styles.bodyCell}>
                {getTherapyTime(row.remainTime)}
              </TableCell>
              <TableCell
                align="right"
                css={(styles.bodyCell, { paddingTop: 13 })}
              >
                <Checkbox
                  css={{ padding: 0 }}
                  checked={row.isComplete}
                  onChange={(event) => {
                    handleTherapyComplete(event, index);
                  }}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const styles = createStyles({
  headCornerCell: {
    fontSize: 14,
    fontWeight: 700,
    paddingLeft: 1.8,
    paddingRight: 0,
  },
  headCell: {
    fontSize: 14,
    fontWeight: 700,
    paddingLeft: 0,
  },
  bodyCell: {
    fontSize: 24,
    fontWeight: 700,
  },
});

export default TherapyList;
