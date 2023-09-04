import axios, { AxiosInstance } from "axios";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "  http://192.168.20.108:3001/",
  headers: {
    Authorization: localStorage.myToken ? `Bearer ${localStorage.myToken}` : undefined,
  },
  timeout: 5000,
});

export default axiosInstance;
