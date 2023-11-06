"use client";
import React, { useEffect, useState } from "react";
import CreateContract from "../../CreateContract/page";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { IContractApiResponse } from "@/Interface/Interfaces";
const ReturnPayments = () => {
  const { id } = useParams();
  const [returnPaymentsContract, setReturnPaymentsContract] = useState<IContractApiResponse>();

  const getContract = async () => {
    try {
      const { data } = await axiosInstance.post("/showReports", { id });
      console.log(data.Contracts[0]);
      setReturnPaymentsContract(data.Contracts[0]);
    } catch (error: AxiosError | any) {
      console.log("problem:", error);
    }
  };
  useEffect(() => {
    getContract();
  }, []);

  return <CreateContract Contract={returnPaymentsContract} />;
};

export default ReturnPayments;
