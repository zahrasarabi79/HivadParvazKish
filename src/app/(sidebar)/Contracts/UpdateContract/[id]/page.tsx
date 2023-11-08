"use client";
import React, { useEffect, useState } from "react";
import CreateContract from "../../CreateContract/page";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { IContractApiResponse } from "@/Interface/Interfaces";

const page = () => {
  const { id } = useParams();
  const [dataUpdated, setDataUpdated] = useState<IContractApiResponse>();

  const getContract = async () => {
    try {
      const { data } = await axiosInstance.post("/showReports", { id });
      // const updated = {
      //   numContract: "",
      //   dateContract: "",
      //   typeContract: "",
      //   customer: "",
      //   reports: [
      //     {
      //       reportDescription: "",
      //       totalCost: "",
      //       presenter: "",
      //       reportsPayment: [
      //         {
      //           bank: "",
      //           payments: "",
      //           datepayment: "",
      //           paymentDescription: "",
      //         },
      //       ],
      //       reportsReturnPayment: [
      //         {
      //           returnPaymentsbank: "",
      //           returnPayments: "",
      //           dateReturnPayment: "",
      //           returnPaymentDescription: "",
      //         },
      //       ],
      //     },
      //   ],
      // };
      setDataUpdated(data.Contracts[0]);
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
