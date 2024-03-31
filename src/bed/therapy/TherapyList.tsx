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

interface Props {
  therapyList: TherapyType[];
  handleTherapyComplete: (
    event: React.ChangeEvent<HTMLInputElement>,
    handleIndex: number
  ) => void;
}

const TherapyList: FC<Props> = ({ therapyList, handleTherapyComplete }) => {
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
            >
              치료항목
            </TableCell>
            <TableCell align="right">필요시간</TableCell>
            <TableCell align="right">남은시간</TableCell>
            <TableCell align="right">완료</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {therapyList.map((row, index) => (
            <TableRow hover key={row.name}>
              <TableCell
                align="center"
                css={{
                  borderRight: "1px solid #9e9e9e",
                  borderBottom:
                    therapyList.length - 1 === index
                      ? undefined
                      : "1px solid #9e9e9e",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell align="right">
                {getTherapyTime(row.duration)}
              </TableCell>
              <TableCell align="right">
                {getTherapyTime(row.duration - row.elapsedTime)}
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  css={{ padding: 0 }}
                  checked={row.isComplete}
                  onChange={(event) => {
                    handleTherapyComplete(event, index);
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

export default TherapyList;
