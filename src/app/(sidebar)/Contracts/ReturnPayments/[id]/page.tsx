"use client";
import React, { useEffect, useState } from "react";
import CreateContract from "../../CreateContract/page";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { IContractApiResponse } from "@/Interface/Interfaces";
import { useGetContractMutation } from "@/Services/Api/contractApi";
const ReturnPayments = () => {
  const { id } = useParams();
  const [returnPaymentsContract, setReturnPaymentsContract] = useState<IContractApiResponse>();
  const [getContractData] = useGetContractMutation();

  const getContract = async () => {
    try {
      const { Contracts } = await getContractData({ id }).unwrap();
      setReturnPaymentsContract(Contracts[0]);
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
