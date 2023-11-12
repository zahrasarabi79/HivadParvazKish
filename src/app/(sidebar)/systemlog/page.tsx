"use client";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { eventStory } from "@/Components/EventStory";
import PaginationComponent from "@/Components/Pagination";
import { formatDate } from "@/Components/format date";
import { Card, CardActions, CardContent, CardHeader, Divider, useMediaQuery, useTheme } from "@mui/material";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingCard from "@/Components/LoadingCard";
import CustomTable from "@/Components/CustomTable";
import EmptyListCardContent from "@/Components/EmptyListCard";
import { IListOfSystemLog } from "@/Interface/Interfaces";

const SystemLog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const pageParams: string | null = searchParams.get("page");
  const peginationPage: number = parseInt(pageParams!) || 1;
  const [page, setPage] = useState(peginationPage);
  const [listOfSystemLog, setListOfSystemLog] = useState<IListOfSystemLog[]>([]);
  const paginationFetchData = { page: page || 1, limitPerPage: 10 };
  const [TotalPaginationPage, setTotalPaginationPage] = useState(0);
  const tableData = listOfSystemLog.map((event) => [formatDate(event?.createdAt) || "", event.username, eventStory(event.eventName, event.numContract) || ""]);

  const getListOfSystemLog = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/listOfSystemHistory", paginationFetchData);
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
  return (
    <Card>
      <CardHeader title={"لیست تاریخچه تغییرات"} />
      <Divider variant="middle" />
      {loading ? (
        <LoadingCard />
      ) : listOfSystemLog.length > 0 ? (
        <CardContent sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", minHeight: "72vh" }}>
          <CustomTable tableData={tableData} headers={["ردیف", " تاریخ تغییرات", "کاربر", "توضیحات تغییرات"]} page={page} paginationFetchData={paginationFetchData} />
          <CardActions>
            <PaginationComponent page={page} TotalPaginationPage={TotalPaginationPage} rowsPerPage={paginationFetchData.limitPerPage} handleChangePage={handleChangePage} />
          </CardActions>
        </CardContent>
      ) : (
        <EmptyListCardContent cardContentTitle="در حال حاضر قراردادی وجود ندارد." />
      )}
    </Card>
  );
};

export default SystemLog;
