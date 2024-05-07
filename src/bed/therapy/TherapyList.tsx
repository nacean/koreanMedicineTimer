import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TextField,
} from "@mui/material";
import { FC } from "react";

import TherapyType from "@src/types/TherapyType";
import { getTherapyTime } from "@src/utils/timeUtils";
import { createStyles } from "@src/utils/utils";

interface Props {
  therapyList: TherapyType[];
  handleTherapyComplete: (isComplete: boolean, handleIndex: number) => void;
  pickedTherapyIndex: number | null;
  pickTherapyIndex: (pickIndex: number) => void;
  handleChangeTherapyNeedTime: (needTime: number, handleIndex: number) => void;
  handleChangeTherapyName: (name: string, handleIndex: number) => void;
}

const TherapyList: FC<Props> = ({
  therapyList,
  handleTherapyComplete,
  pickedTherapyIndex,
  pickTherapyIndex,
  handleChangeTherapyNeedTime,
  handleChangeTherapyName,
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
              key={"therapyList" + index}
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
                    paddingInline: index === therapyList.length - 1 ? 0 : 10,
                    paddingBlock: 0,
                  },
                ]}
              >
                {index === therapyList.length - 1 ? (
                  <TextField
                    sx={{ padding: 0 }}
                    inputProps={{ style: styles.lastTherapyName }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      handleChangeTherapyName(e.target.value, index);
                    }}
                    value={row.name}
                  />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell align="right" css={styles.bodyCell}>
                <TextField
                  size="small"
                  type="number"
                  inputProps={{ style: styles.needTimeInput }}
                  InputProps={{ sx: styles.removeNumberArrow }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    handleChangeTherapyNeedTime(
                      Number(e.target.value) * 60,
                      index
                    );
                  }}
                  value={(row.duration / 60).toString()}
                />
              </TableCell>
              <TableCell align="right" css={styles.bodyCell}>
                {getTherapyTime(row.remainTime)}
              </TableCell>
              <TableCell
                align="right"
                css={[styles.bodyCell, { paddingTop: 12 }]}
              >
                <Checkbox
                  css={{ padding: 0 }}
                  checked={row.isComplete}
                  onChange={(event) => {
                    handleTherapyComplete(event.target.checked, index);
                  }}
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
  needTimeInput: {
    boxSizing: "border-box",
    paddingLeft: 0,
    paddingRight: 8,
    width: 38,
    height: 33,
    fontSize: 20,
    fontWeight: 700,
    textAlign: "end",
  },
  lastTherapyName: {
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
    width: 81,
    height: 60,
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
  },
  removeNumberArrow: {
    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "input[type=number]": {
      MozAppearance: "textfield",
    },
  },
  bodyCell: {
    fontSize: 24,
    fontWeight: 700,
  },
});

export default TherapyList;
