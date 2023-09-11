"use client";
import { StyledTableCell, StyledTableRow } from "@/Utils/style/stylecomponent";
import Icon from "@/app/Components/Icon";
import {
  Card,
  CardHeader,
  Button,
  Divider,
  CardContent,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import React from "react";

function createData(numRow: string, dateContracts: number, numContracts: number, editContractIcon: number, showContractIcon: number) {
  return { numRow, dateContracts, numContracts, editContractIcon, showContractIcon };
}

const rows = [
  createData("1", 123, "1402/02/01", 24, 4.0),
  createData("2", 1234, "1402/02/01", 37, 4.3),
  createData("3", 12345, "1402/02/01", 24, 6.0),
  createData("4", 123456, "1402/02/01", 4.3),
  createData("5", 1234567, "1402/02/01", 49, 3.9),
];
const ListOfReport = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Card>
      <CardHeader
        title={"لیست قرارداد ها"}
        action={
          <Button color="primary" variant="contained">
            ایجاد قرارداد جدید
          </Button>
        }
      />
      <Divider variant="middle" />
      <CardContent>
        <TableContainer dir="rtl" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: "7%" }} align="center">
                  ردیف
                </StyledTableCell>
                <StyledTableCell style={{ width: "10%" }} align="left">
                  شماره قراراداد
                </StyledTableCell>
                <StyledTableCell style={{ width: "75%" }} align="left">
                  تاریخ قرارداد
                </StyledTableCell>

                <StyledTableCell align="center" colSpan={2}>
                  عملیات
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.numContracts}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.numRow}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.numContracts}</StyledTableCell>
                  <StyledTableCell align="left">{row.dateContracts}</StyledTableCell>

                  <StyledTableCell align="left" >
                    <Icon pathName="edit.svg" />
                  </StyledTableCell>
                  <StyledTableCell align="left" >
                    <Icon pathName="user-search.svg" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ListOfReport;
