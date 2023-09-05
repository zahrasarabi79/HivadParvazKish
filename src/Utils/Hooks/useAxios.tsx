import { axiosResponse } from "@/Interface/Interfaces";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useEffect, useState } from "react";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "  http://192.168.20.108:3001/",
  headers: {
    Authorization: localStorage.myToken ? `Bearer ${localStorage.myToken}` : undefined,
  },
  timeout: 5000,
});


export const useAxios = (url: string, dataObj: <T>) => {
  const [axiosRes, setAxiosRes] = useState<axiosResponse>({
    error: null,
    isLoading: false,
    data: [],
  });

  useEffect(() => {
    const axiosData = async () => {
      setAxiosRes({ ...axiosRes, isLoading: true });
      try {
        const { data } = await axiosInstance.post(url, dataObj);
        setAxiosRes({ ...axiosRes, data});
      } catch (error: AxiosError | any) {
        setAxiosRes({ ...axiosRes, error: `${error} Could not Fetch Data ` });
      } finally {
        setAxiosRes({ ...axiosRes, isLoading: false });
      }
    };
    axiosData();
  }, [url, dataObj]);
  return { data: axiosRes.data, error: axiosRes.error, isLoading: axiosRes.isLoading };
};
