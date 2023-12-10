import axios, { AxiosInstance } from "axios";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "  http://192.168.20.159:3001/",
  headers: {
    common: {
      Authorization: localStorage.myToken ? `Bearer ${localStorage.myToken}` : undefined,
    },
  },
  timeout: 5000,
});

export default axiosInstance;
