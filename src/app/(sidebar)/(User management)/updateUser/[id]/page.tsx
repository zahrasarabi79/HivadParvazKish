"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import CreateUsers from "../../createUsers/page";
import { IUserApiResponse } from "../../usersList/page";

const page = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUserApiResponse>();
  const getUser = async () => {
    try {
      const { data } = await axiosInstance.post("/showUser", { id });
      setUser(data);
    } catch (error: AxiosError | any) {
      console.log("problem:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return <CreateUsers user={user} />;
};

export default page;
