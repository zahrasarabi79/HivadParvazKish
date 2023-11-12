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
import LoadingCard from "@/Components/LoadingCard";
import EmptyListCardContent from "@/Components/EmptyListCard";
import CustomTable from "@/Components/CustomTable";
import TooltipList from "@/Components/TooltipList";

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
  const tableData = listOfContracts.map((contract) => [
    contract.numContract,
    formatDate(contract?.dateContract) || "",
    <TooltipList tooltipTitle="ویرایش بازگشت وجه" route={`/Contracts/ReturnPayments/${contract.id}`} iconPath="paymentReturn.svg" />,
    <TooltipList tooltipTitle="ویرایش" route={`/Contracts/UpdateContract/${contract.id}`} iconPath="edit.svg" />,
    <TooltipList route="" tooltipTitle="مشاهده" onClick={() => handleViewContract(contract)} iconPath="eye.svg" />,
  ]);
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
        <LoadingCard />
      ) : listOfContracts.length > 0 ? (
        <CardContent sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", minHeight: "72vh" }}>
          <CustomTable
            tableData={tableData}
            headers={["ردیف", "شماره قرارداد", "تاریخ قرارداد", "عملیات"]}
            headerWidths={["3%", "30%", "90%"]}
            page={page}
            paginationFetchData={paginationFetchData}
          />
          <CardActions>
            <PaginationComponent page={page} TotalPaginationPage={TotalPaginationPage} rowsPerPage={paginationFetchData.limitPerPage} handleChangePage={handleChangePage} />
          </CardActions>
        </CardContent>
      ) : (
        <EmptyListCardContent cardContentTitle="در حال حاضر قراردادی وجود ندارد." />
      )}

      <KeepMountedModal open={openModal} handleClose={handleCloseModal} handleOpen={handleOpenModal} data={modalData as IContractApiResponse} />
    </Card>
  );
};
export default ListOfReport;
