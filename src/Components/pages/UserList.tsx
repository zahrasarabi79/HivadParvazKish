"use client";
import { Button, Card, CardActions, CardContent, CardHeader, Divider } from "@mui/material";
import PaginationComponent from "@/Components/Pagination";
import { IUserApiResponse } from "@/Interface/Interfaces";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TooltipList from "@/Components/TooltipList";
import EmptyListCardContent from "@/Components/EmptyListCard";
import CustomTable from "@/Components/CustomTable";
import LoadingCard from "@/Components/LoadingCard";
import { useGetListOfUsersMutation } from "@/Services/Api/userApi";

const UserList = () => {
  const router = useRouter();
  const [listOfUsers, setListOfUsers] = useState<IUserApiResponse[]>([]);
  const [getlistOfUsers, { isLoading }] = useGetListOfUsersMutation();
  const searchParams = useSearchParams();
  const pageParams: string | null = searchParams.get("page");
  const peginationPage: number = parseInt(pageParams!) || 1;
  const [page, setPage] = useState(peginationPage);
  const paginationFetchData: Record<string, number> = { page: page || 1, limitPerPage: 10 };
  const [TotalPaginationPage, setTotalPaginationPage] = useState(0);
  const handleChangePage = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setPage(newPage);
    router.push(`/usersList?page=${newPage || "1"}`);
  };

  const getListOfUsers = async () => {
    try {
      const { users, totalCount } = await getlistOfUsers(paginationFetchData).unwrap();
      setTotalPaginationPage(totalCount);
      setListOfUsers(users);
    } catch (error: AxiosError | any) {
      console.error("API request error:", error);
    }
  };

  useEffect(() => {
    getListOfUsers();
  }, [page]);

  const tableData: (string | JSX.Element)[][] = listOfUsers.map((user) => [
    user.name,
    user.username,
    user.role,
    <TooltipList tooltipTitle="ویرایش" route={`/updateUser/${user.id}`} iconPath="edit.svg" />,
  ]);

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
      {isLoading ? (
        <LoadingCard />
      ) : listOfUsers.length > 0 ? (
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
            headerWidths={["3%", "13%", "13%", "-60%", "10%"]}
            headers={["ردیف", "نام و نام خانوادگی", "نام کاربری", "نقش ها", "عملیات"]}
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
        <EmptyListCardContent cardContentTitle="در حال حاضر کاربری وجود ندارد" />
      )}
    </Card>
  );
};

export default UserList;
