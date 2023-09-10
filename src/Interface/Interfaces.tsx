import { StringLiteralType } from "typescript";

// api response
export interface IpassengersApiResponse {
  id: number;
  passenger: string;
  contractId: number;
}
export interface IReportApiResponse {
  id: number;
  number: number;
  costTitle: string;
  presenter: string;
  reportPayment: IReportPaymentApiResponse[];
  contractId: number;
}

export interface IReportPaymentApiResponse {
  id: number;
  datepayment: string;
  payments: string;
  bank: string;
  reportId: number;
  contractId: number;
}
export interface IContractApiResponse {
  id: number;
  typeReport: string;
  dateContract: string;
  numContract: string;
  passengers: IpassengersApiResponse[];
  report: IReportApiResponse[];
}
// data
export interface IContract {
  dateContract: string | Date;
  numContract: string;
  passengers: string[];
  typeReport: string;
  report: IReport[];
}
export interface IReport {
  number: string;
  costTitle: string;
  presenter: string;
  reportPayment: IReportPayment[];
  [index: number | string]: string | IReportPayment[];
}
export interface IReportPayment {
  datepayment: string;
  payments: string;
  bank: string;
  [index: number | string]: string;
}
export interface IPassenger {
  passenger: string;
}

// error
export interface IReportError {
  number: boolean;
  costTitle: boolean;
  presenter: boolean;
  reportPayment: IReportErrorPayment[];
  [index: number | string]: boolean | IReportErrorPayment[];
}
export interface IReportErrorPayment {
  bank: boolean;
  payments: boolean;
  datepayment: boolean;
  [index: number]: boolean;
}
// props component
export interface IContractInfoInputs {
  contract: IContract;
  setContract: React.Dispatch<React.SetStateAction<IContract>>;
  setNumContractError: React.Dispatch<React.SetStateAction<boolean>>;
  numContractError: boolean;
  setDateContractError: React.Dispatch<React.SetStateAction<boolean>>;
  dateContractError: boolean;
}

export interface IPassengersInputs {
  contract: IContract;
  updateContract: (updatedContract: IContract) => void;
  setPassengersError: React.Dispatch<React.SetStateAction<boolean>>;
  passengersError: boolean;
}

export interface IBuySellInformation {
  report: IReport[];
  setReport: React.Dispatch<React.SetStateAction<IReport[]>>;
  contract: IContract;
  updateContract: (updatedContract: IContract) => void;
  reportError: IReportError[];
  setReportError: React.Dispatch<React.SetStateAction<IReportError[]>>;
}

export interface IReportCard {
  contract: IContract;
  report: IReport[];
  setReport: React.Dispatch<React.SetStateAction<IReport[]>>;
  updateContract: (updatedContract: IContract) => void;
  reportError: IReportError[];
  setReportError: React.Dispatch<React.SetStateAction<IReportError[]>>;
}
export interface IReportcomponent {
  key: number;
  index: number;
  item: IReport;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, value: string) => void;
  handleChangePaymentReport: (e: React.ChangeEvent<HTMLInputElement>, paymentIndex: number, reportIndex: number, field: string) => void;
  setReport: React.Dispatch<React.SetStateAction<IReport[]>>;
  reportError: IReportError;
}
export interface IContractInformations {
  contract: IContractApiResponse;
}
export interface IPassengersInfo {
  passengers: IpassengersApiResponse[];
}
export interface IReportsInfo {
  reports: IReportApiResponse[];
}
export interface IShowReportComponenet {
  report: IReportApiResponse;
}
export interface IPassengerCard {
  passengername: string;
  onDelete: (passengerIndex: number) => void;
}

// log in
export interface Token {
  token: string;
}
export interface axiosResponse {
  error: string | null;
  isLoading: boolean;
  data: object[] | string;
}
export interface IUser {
  username: string;
  password: string;
}

export interface SidebarItem {
  title: string;
  icon: string;
  route?: string;
  children?: SidebarItemChildren[];
}
export interface SidebarItemChildren {
  title: string;
  route?: string;
  children?: SidebarItemChildrenOfChildren[];
}
export interface SidebarItemChildrenOfChildren {
  title: string;
  route: string;
}
export interface IDrawerWidth {
  desktop: string | number;
  mobile: string | number;
}
