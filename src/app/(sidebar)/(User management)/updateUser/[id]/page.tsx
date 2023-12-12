"use client";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import CreateUsers from "../../createUsers/page";
import { useGetUserDataMutation } from "@/Services/Api/userApi";
import { IUserApiResponse } from "@/Interface/Interfaces";

const page = () => {
  const { id } = useParams();
  const [getUserData] = useGetUserDataMutation();
  const [user, setUser] = useState<IUserApiResponse>();
  const getUser = async () => {
    try {
      const data = await getUserData({ id }).unwrap();
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
