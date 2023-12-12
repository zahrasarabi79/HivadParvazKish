"use client";
import React, { useEffect, useState } from "react";
import CreateContract from "../../CreateContract/page";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { IContractApiResponse } from "@/Interface/Interfaces";
import { useGetContractMutation } from "@/Services/Api/contractApi";

const page = () => {
  const { id } = useParams();
  const [getContractData] = useGetContractMutation();
  const [dataUpdated, setDataUpdated] = useState<IContractApiResponse>();
  const getContract = async () => {
    try {
      const { Contracts } = await getContractData({ id }).unwrap();
      setDataUpdated(Contracts[0]);
    } catch (error: AxiosError | any) {
      console.log("problem:", error);
    }
  };
  useEffect(() => {
    getContract();
  }, []);
  return <CreateContract Contract={dataUpdated} />;
};

export default page;
