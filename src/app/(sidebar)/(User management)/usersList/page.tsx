"use client";
import Icon from "@/Components/Icon";
import PaginationComponent from "@/Components/Pagination";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { useSnackbar } from "@/context/SnackbarContext";
import { StyledTableCell, StyledTableRow } from "@/style/StyleComponents/TableStyle";
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
import React, { use, useEffect, useState } from "react";
type roleType = "مدیر" | "کارمند";
export interface IUserApiResponse {
  id: number;
  name: string;
  username: string;
  password: string;
  role: roleType;
}

const UserList = () => {
  const router = useRouter();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [listOfUsers, setListOfUsers] = useState<IUserApiResponse[]>([]);
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const searchParams = useSearchParams();
  const pageParams: string | null = searchParams.get("page");
  const peginationPage: number = parseInt(pageParams!) || 1;
  const [page, setPage] = useState(peginationPage);
  const paginationFetchData = { page: page || 1, limitPerPage: 10 };
  const emptyRows = page > 0 ? Math.max(0, paginationFetchData.limitPerPage - listOfUsers.length) : 0;
  const [TotalPaginationPage, setTotalPaginationPage] = useState(0);

  const handleChangePage = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setPage(newPage);
    router.push(`/usersList?page=${newPage || "1"}`);
  };

  const getListOfUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/usersList", paginationFetchData);
      const { users, totalCount } = data;
      setTotalPaginationPage(totalCount);
      setListOfUsers(users);
    } catch (error: AxiosError | any) {
      console.error("API request error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListOfUsers();
  }, [page]);
  return (
    <Card>
      <CardHeader
        title={"لیست قرارداد ها"}
        action={
          <Button color="primary" variant="contained" onClick={() => router.push(`/createUsers`)}>
            ایجاد کاربر
          </Button>
        }
      />
      <Divider variant="middle" />
      {loading ? (
        <Grid container>
          <Grid item xs={12} sx={{ margin: 10, display: "flex", justifyContent: "center", alignContent: "center" }}>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : listOfUsers.length > 0 ? (
        <CardContent sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", minHeight: "72vh" }}>
          <TableContainer dir="rtl" sx={{ boxShadow: "none" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ width: "3%", whiteSpace: "nowrap" }} align="left">
                    ردیف
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "13%", whiteSpace: "nowrap" }} align="left">
                    نام و نام خانوادگی
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "13%", whiteSpace: "nowrap" }} align="left">
                    نام کاربری
                  </StyledTableCell>

                  <StyledTableCell sx={{ width: "-60%", whiteSpace: "nowrap" }} align="left">
                    نقش ها
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%", whiteSpace: "nowrap" }} align="left">
                    عملیات
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfUsers.map((user, index) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row" align="left">
                      {index + 1 + (page > 1 ? paginationFetchData.limitPerPage * (page - 1) : 0)}
                    </StyledTableCell>
                    <StyledTableCell sortDirection={"desc"} align="left">
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell sortDirection={"asc"} align="left">
                      {user.username}
                    </StyledTableCell>

                    <StyledTableCell sortDirection={"asc"} align="left">
                      {user.role}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ ["&.MuiTableCell-root"]: { padding: "0px 8px 0px 0px" } }}>
                      <Tooltip title="ویرایش" placement="bottom-start">
                        <IconButton onClick={() => router.push(`/updateUser/${user.id}`)}>
                          <Icon pathName="edit.svg" color={theme.palette.primary.main} />
                        </IconButton>
                      </Tooltip>
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
          <Typography variant="h6">در حال حاضر کاربری وجود ندارد.</Typography>
          <Image src={"/icon/Vector.svg"} width={mdUp ? 400 : 300} height={mdUp ? 400 : 300} alt="Vector" />
        </CardContent>
      )}
    </Card>
  );
};

export default UserList;
