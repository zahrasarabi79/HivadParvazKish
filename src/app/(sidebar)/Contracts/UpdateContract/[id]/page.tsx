"use client";
import React, { useEffect } from "react";
import CreateContract from "../../CreateContract/page";
import axiosInstance from "@/AxiosInstance/AxiosInstance";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();

  return <CreateContract ContractId={id} />;
};

export default page;
