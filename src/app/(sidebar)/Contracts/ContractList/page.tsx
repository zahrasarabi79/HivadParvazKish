"use client";
import axiosInstance from "@/AxiosInstance/AxiosInstance";
import { IContractApiResponse } from "@/Interface/Interfaces";
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
  Pagination,
  Fade,
  IconButton,
  Typography,
  TablePagination,
  TableFooter,
  Box,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { AxiosError } from "axios";
import Image from "next/image";

import React, { useEffect, useState } from "react";

function createData(numRow: string, numContracts: number, dateContracts: number | string) {
  return { numRow, numContracts, dateContracts };
}

const rows = [
  createData("1", 123, "1402/02/01"),
  createData("2", 1234, "1402/02/01"),
  createData("3", 12345, "1402/02/01"),
  createData("4", 123456, "1402/02/01"),
  createData("5", 1234567, "1402/02/01"),
];
const ListOfReport = () => {
  const [listOfContracts, setListOfContracts] = useState<IContractApiResponse[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const getListOfReports = async () => {
    try {
      const { data } = await axiosInstance.post("/listOfReports");
      const { Contracts } = data;
      setListOfContracts(Contracts);
    } catch (error: AxiosError | any) {
      console.log("problem");
    }
  };

  useEffect(() => {
    getListOfReports();
  }, []);

  const handleChangePage = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setPage(newPage);
  };
  const emptyRows = page > 0 ? Math.max(0, (0 + page) * rowsPerPage - listOfContracts.length) : 0;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
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
      {listOfContracts.length > 0 ? (
        <CardContent>
          <TableContainer dir="rtl" sx={{ boxShadow: "none" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ width: "5%" }} align="center">
                    ردیف
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "20%" }} align="left">
                    شماره قراراداد
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "85%" }} align="left">
                    تاریخ قرارداد
                  </StyledTableCell>

                  <StyledTableCell align="center" colSpan={2}>
                    عملیات
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0 ? listOfContracts.slice(startIndex, endIndex) : listOfContracts).map((contract, index) => (
                  <StyledTableRow key={contract.id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell sortDirection={"desc"} align="left">
                      {contract.numContract}
                    </StyledTableCell>
                    <StyledTableCell sortDirection={"asc"} align="left">
                      {new Date(contract?.dateContract).toLocaleDateString("fa")}
                    </StyledTableCell>

                    <StyledTableCell align="center" sx={{ ["&.MuiTableCell-root"]: { padding: 0 } }}>
                      <Tooltip title="ویرایش" placement="bottom-start">
                        <IconButton>
                          <Icon pathName="edit.svg" />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ ["&.MuiTableCell-root"]: { padding: "0px 16px 0px 0px" } }}>
                      <Tooltip title="مشاهده" placement="bottom-start">
                        <IconButton>
                          <Icon pathName="user-search.svg" />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <StyledTableRow
                    style={{
                      height: 55 * emptyRows,
                    }}
                  >
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
            <Pagination
              sx={{ p: 2, display: "flex", flexDirection: "row", justifyContent: "center" }}
              count={Math.ceil(listOfContracts.length / rowsPerPage)} // Calculate the total number of pages
              page={page}
              onChange={handleChangePage}
            />
          </TableContainer>
        </CardContent>
      ) : (
        <CardContent sx={{ height: "600px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6">در حال حاضر درخواستی وجود ندارد</Typography>
          <Image src={"/icon/Vector.svg"} width={400} height={400} alt="Vector" />
        </CardContent>
      )}
    </Card>
  );
};

export default ListOfReport;
