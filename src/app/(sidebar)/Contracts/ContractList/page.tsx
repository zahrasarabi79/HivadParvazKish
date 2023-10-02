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
  Pagination,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import KeepMountedModal from "./ShowModal";
import { formatDate } from "@/app/Components/format date";
import { Contrast } from "@mui/icons-material";

const ListOfReport = () => {
  const [listOfContracts, setListOfContracts] = useState<IContractApiResponse[]>([]);
  const [modalData, setModalData] = useState<IContractApiResponse>();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const paginationFetchData = { page, limitPerPage: 10 };
  const handleCloseModal = () => setOpenModal(false);
  const getListOfReports = async () => {
    try {
      console.log(paginationFetchData);

      const { data } = await axiosInstance.post("/listOfReports", paginationFetchData);
      router.push(`/Contracts/ContractList?page=${page || "1"}`);
      const { Contracts } = data;
      setListOfContracts(Contracts);
    } catch (error: AxiosError | any) {
      console.log("problem");
    }
  };

  useEffect(() => {
    getListOfReports();
  }, []);

  const handleViewContract = (contract: any) => {
    setModalData(contract);
    handleOpenModal();
  };
  const theme = useTheme();
  const handleChangePage = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setPage(newPage);
    getListOfReports();
  };
  const emptyRows = page > 0 ? Math.max(0, (0 + page) * rowsPerPage - listOfContracts.length) : 0;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

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
      {listOfContracts.length > 0 ? (
        <CardContent>
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
                {(rowsPerPage > 0 ? listOfContracts.slice(startIndex, endIndex) : listOfContracts).map((contract, index) => (
                  <StyledTableRow key={contract.id}>
                    <StyledTableCell component="th" scope="row" align="left">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell sortDirection={"desc"} align="left">
                      {contract.numContract}
                    </StyledTableCell>
                    <StyledTableCell sortDirection={"asc"} align="left">
                      {formatDate(contract?.dateContract) || ""}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ ["&.MuiTableCell-root"]: { padding: "0px 8px 0px 0px" } }}>
                      <Tooltip title="بازگشت وجه" placement="bottom-start">
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
                          <Icon pathName="user-search.svg" color={theme.palette.primary.main} />
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
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                "& .MuiPaginationItem-icon ": { bgcolor: "rgb(255, 255, 255) !important", borderRadius: "50%", color: "black" },
                "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": { bgcolor: "#Dbead9", color: "black" },
              }}
              count={Math.ceil(listOfContracts.length / rowsPerPage)} // Calculate the total number of pages
              page={page}
              onChange={handleChangePage}
            />
          </TableContainer>
        </CardContent>
      ) : (
        <CardContent sx={{ height: "600px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6">در حال حاضر قراردادی وجود ندارد.</Typography>
          <Image src={"/icon/Vector.svg"} width={400} height={400} alt="Vector" />
        </CardContent>
      )}
      <KeepMountedModal open={openModal} handleClose={handleCloseModal} handleOpen={handleOpenModal} data={modalData as IContractApiResponse} />
    </Card>
  );
};

export default ListOfReport;
