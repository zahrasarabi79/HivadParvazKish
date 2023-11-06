"use client";
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
  IconButton,
  Typography,
  useTheme,
  Tooltip,
  useMediaQuery,
  CircularProgress,
  Grid,
  CardActions,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "@/style/StyleComponents/TableStyle";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { AxiosError } from "axios";
import Image from "next/image";
import { IContractApiResponse } from "@/Interface/Interfaces";
import Icon from "@/Components/Icon";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import KeepMountedModal from "./ShowModal";
import { formatDate } from "@/Components/format date";
import PaginationComponent from "@/Components/Pagination";

const ListOfReport = () => {
  const router = useRouter();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const pageParams: string | null = searchParams.get("page");
  const peginationPage: number = parseInt(pageParams!) || 1;
  const [page, setPage] = useState(peginationPage);
  const [listOfContracts, setListOfContracts] = useState<IContractApiResponse[]>([]);
  const [TotalPaginationPage, setTotalPaginationPage] = useState(0);
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [loading, setLoading] = useState(true);
  const paginationFetchData = { page: page || 1, limitPerPage: 10 };
  const emptyRows = page > 0 ? Math.max(0, paginationFetchData.limitPerPage - listOfContracts.length) : 0;
  // Modal
  const [modalData, setModalData] = useState<IContractApiResponse>();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleViewContract = (contract: any) => {
    setModalData(contract);
    handleOpenModal();
  };

  // get data
  const getListOfReports = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/listOfReports", paginationFetchData);
      const { Contracts, totalCount } = data;
      setTotalPaginationPage(totalCount);
      setListOfContracts(Contracts);
    } catch (error: AxiosError | any) {
      console.error("API request error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListOfReports();
  }, [page]);
  const handleChangePage = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setPage(newPage);
    router.push(`/Contracts/ContractList?page=${newPage || "1"}`);
  };

  return (
    <Card>
      <CardHeader
        title={"لیست قرارداد ها"}
        action={
          <Button color="primary" variant="contained" onClick={() => router.push(`/Contracts/CreateContract`)}>
            ایجاد قرارداد
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
      ) : listOfContracts.length > 0 ? (
        <CardContent sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", minHeight: "72vh" }}>
          <TableContainer dir="rtl" sx={{ boxShadow: "none" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ width: "3%" }} align="left">
                    ردیف
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ width: mdUp ? "30%" : "50%" }}>
                    شماره قراراداد
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "90%" }} align="left">
                    تاریخ قرارداد
                  </StyledTableCell>

                  <StyledTableCell align="center" colSpan={3}>
                    عملیات
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfContracts.map((contract, index) => (
                  <StyledTableRow key={contract.id}>
                    <StyledTableCell component="th" scope="row" align="left">
                      {index + 1 + (page > 1 ? paginationFetchData.limitPerPage * (page - 1) : 0)}
                    </StyledTableCell>
                    <StyledTableCell sortDirection={"desc"} align="left">
                      {contract.numContract}
                    </StyledTableCell>
                    <StyledTableCell sortDirection={"asc"} align="left">
                      {formatDate(contract?.dateContract) || ""}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ ["&.MuiTableCell-root"]: { padding: "0px 8px 0px 0px" } }}>
                      <Tooltip title="ویرایش بازگشت وجه" placement="bottom-start">
                        <IconButton onClick={() => router.push(`/Contracts/ReturnPayments/${contract.id}`)}>
                          <Icon pathName="paymentReturn.svg" color={theme.palette.primary.main} />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ ["&.MuiTableCell-root"]: { padding: "0px 8px 0px 0px" } }}>
                      <Tooltip title="ویرایش" placement="bottom-start">
                        <IconButton onClick={() => router.push(`/Contracts/UpdateContract/${contract.id}`)}>
                          <Icon pathName="edit.svg" color={theme.palette.primary.main} />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>

                    <StyledTableCell align="center" sx={{ ["&.MuiTableCell-root"]: { padding: "0px 16px 0px 0px" } }}>
                      <Tooltip title="مشاهده" placement="bottom-start">
                        <IconButton onClick={() => handleViewContract(contract)}>
                          <Icon pathName="eye.svg" color={theme.palette.primary.main} />
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
          <Typography variant="h6">در حال حاضر قراردادی وجود ندارد.</Typography>
          <Image src={"/icon/Vector.svg"} width={mdUp ? 400 : 300} height={mdUp ? 400 : 300} alt="Vector" />
        </CardContent>
      )}

      <KeepMountedModal open={openModal} handleClose={handleCloseModal} handleOpen={handleOpenModal} data={modalData as IContractApiResponse} />
    </Card>
  );
};
export default ListOfReport;
