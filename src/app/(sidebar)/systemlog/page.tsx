"use client";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { StyledTableCell, StyledTableRow } from "@/style/StyleComponents/TableStyle";
import { eventStory } from "@/Components/EventStory";
import Icon from "@/Components/Icon";
import PaginationComponent from "@/Components/Pagination";
import { formatDate } from "@/Components/format date";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
export interface IListOfSystemLog {
  id: number;
  eventName: string;
  contractId: number;
  numContract: string;
  username: string;
  createdAt: Date;
}

const SystemLog = () => {
  const router = useRouter();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [loading, setLoading] = useState(true);
  const [listOfSystemLog, setListOfSystemLog] = useState<IListOfSystemLog[]>([]);

  const searchParams = useSearchParams();
  const pageParams: string | null = searchParams.get("page");
  const peginationPage: number = parseInt(pageParams!) || 1;
  const [page, setPage] = useState(peginationPage);
  const paginationFetchData = { page: page || 1, limitPerPage: 10 };
  const emptyRows = page > 0 ? Math.max(0, paginationFetchData.limitPerPage - listOfSystemLog.length) : 0;
  const [TotalPaginationPage, setTotalPaginationPage] = useState(0);

  const getListOfSystemLog = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/listOfSystemHistory", paginationFetchData);
      console.log(data);

      const { Events, totalCount } = data;
      setTotalPaginationPage(totalCount);
      setListOfSystemLog(Events);
    } catch (error: AxiosError | any) {
      console.error("API request error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListOfSystemLog();
  }, [page]);
  const handleChangePage = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setPage(newPage);
    router.push(`/systemlog?page=${newPage || "1"}`);
  };
  // listOfSystemLog.map((event, index) => console.log(event.eventName));
  return (
    <Card>
      <CardHeader title={"لیست تاریخچه تغییرات"} />
      <Divider variant="middle" />
      {loading ? (
        <Grid container>
          <Grid item xs={12} sx={{ margin: 10, display: "flex", justifyContent: "center", alignContent: "center" }}>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : listOfSystemLog.length > 0 ? (
        <CardContent sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", minHeight: "72vh" }}>
          <TableContainer dir="rtl" sx={{ boxShadow: "none" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ width: "3%" }} align="left">
                    ردیف
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                    تاریخ تغییرات
                  </StyledTableCell>
                  <StyledTableCell style={{ whiteSpace: "nowrap", overflow: "hidden" }} align="left">
                    کاربر
                  </StyledTableCell>

                  <StyledTableCell align="left" style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                    توضیحات تغییرات
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfSystemLog.map((event, index) => (
                  <StyledTableRow key={event.id}>
                    <StyledTableCell component="th" scope="row" align="left">
                      {index + 1 + (page > 1 ? paginationFetchData.limitPerPage * (page - 1) : 0)}
                    </StyledTableCell>
                    <StyledTableCell style={{ whiteSpace: "nowrap", overflow: "hidden" }} sortDirection={"desc"} align="left">
                      {formatDate(event?.createdAt) || ""}
                    </StyledTableCell>
                    <StyledTableCell style={{ whiteSpace: "nowrap", overflow: "hidden" }} sortDirection={"asc"} align="left">
                      {event?.username || ""}
                    </StyledTableCell>
                    <StyledTableCell style={{ overflow: "hidden", textAlign: "justify" }} sortDirection={"asc"} align="left">
                      {eventStory(event.eventName, event.numContract) || ""}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <StyledTableRow
                    style={{
                      height: 50 * emptyRows,
                      backgroundColor: "transparent",
                    }}
                  >
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <CardActions>
            <PaginationComponent page={page} TotalPaginationPage={TotalPaginationPage} rowsPerPage={paginationFetchData.limitPerPage} handleChangePage={handleChangePage} />
          </CardActions>
        </CardContent>
      ) : (
        <CardContent sx={{ minHeight: "72vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6">در حال حاضر قراردادی وجود ندارد.</Typography>
          <Image src={"/icon/Vector.svg"} width={mdUp ? 400 : 300} height={mdUp ? 400 : 300} alt="Vector" />
        </CardContent>
      )}
    </Card>
  );
};

export default SystemLog;
