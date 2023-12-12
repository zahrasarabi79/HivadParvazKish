"use client";
import { eventStory } from "@/Components/EventStory";
import PaginationComponent from "@/Components/Pagination";
import { formatDate } from "@/Components/format date";
import { Card, CardActions, CardContent, CardHeader, Divider} from "@mui/material";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingCard from "@/Components/LoadingCard";
import CustomTable from "@/Components/CustomTable";
import EmptyListCardContent from "@/Components/EmptyListCard";
import { IEvent } from "@/Interface/Interfaces";
import { useGetListOflogSystemMutation } from "@/Services/Api/logSystemApi";

const SystemLog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParams: string | null = searchParams.get("page");
  const peginationPage: number = parseInt(pageParams!) || 1;
  const [page, setPage] = useState(peginationPage);
  const [listOfSystemLog, setListOfSystemLog] = useState<IEvent[]>([]);
  const [getListOfSystemLog, { isLoading }] = useGetListOflogSystemMutation();
  const paginationFetchData = { page: page || 1, limitPerPage: 10 };
  const [TotalPaginationPage, setTotalPaginationPage] = useState(0);
  const tableData = listOfSystemLog.map((event) => [
    formatDate(event?.createdAt) || "",
    event.username,
    eventStory(event.eventName, event.numContract) || "",
  ]);

  const getListOfSystemLogs = async () => {
    try {
      const data = await getListOfSystemLog(paginationFetchData).unwrap();
      const { totalCount, Events } = data;
      setTotalPaginationPage(totalCount);
      setListOfSystemLog(Events);
    } catch (error: AxiosError | any) {
      console.error("API request error:", error);
    }
  };
  useEffect(() => {
    getListOfSystemLogs();
  }, [page]);

  const handleChangePage = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setPage(newPage);
    router.push(`/systemlog?page=${newPage || "1"}`);
  };
  return (
    <Card>
      <CardHeader title={"لیست تاریخچه تغییرات"} />
      <Divider variant="middle" />
      {isLoading ? (
        <LoadingCard />
      ) : listOfSystemLog.length > 0 ? (
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "72vh",
          }}
        >
          <CustomTable
            tableData={tableData}
            headers={["ردیف", " تاریخ تغییرات", "کاربر", "توضیحات تغییرات"]}
            page={page}
            paginationFetchData={paginationFetchData}
          />
          <CardActions>
            <PaginationComponent
              page={page}
              TotalPaginationPage={TotalPaginationPage}
              rowsPerPage={paginationFetchData.limitPerPage}
              handleChangePage={handleChangePage}
            />
          </CardActions>
        </CardContent>
      ) : (
        <EmptyListCardContent cardContentTitle="در حال حاضر قراردادی وجود ندارد." />
      )}
    </Card>
  );
};

export default SystemLog;
