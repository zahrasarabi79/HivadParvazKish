import { Control, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { StringLiteralType } from "typescript";

// api response
export interface IContractApiResponse {
  id: number;
  typeContract: string;
  dateContract: Date;
  numContract: string;
  customer: string;
  reports: IReportsApiResponse[];
}

export interface IReportsApiResponse {
  id: number;
  reportDescription: string;
  totalCost: string;
  presenter: string;
  reportsPayment: IReportPaymentApiResponse[];
  reportsReturnPayment: IReportReturnPaymentApiResponse[];
  contractId: number;
}

export interface IReportPaymentApiResponse {
  id: number;
  datepayment: Date;
  payments: string;
  bank: string;
  paymentDescription: string;
  reportId: number;
  contractId: number;
}
export interface IReportReturnPaymentApiResponse {
  id: number;
  dateReturnPayment: Date;
  returnPayments: string;
  returnPaymentsbank: string;
  returnPaymentDescription: string;
  reportId: number;
  contractId: number;
}

// data
export interface IContract {
  dateContract: Date;
  numContract: string;
  customer: string;
  typeContract: string;
  reports: IReports[];
}

export interface IReports {
  reportDescription: string;
  totalCost: string;
  presenter: string;
  reportsPayment: IReportPayment[];
  reportsReturnPayment: IReportReturnPayment[];
  [reportIndex: number]: string | IReportPayment[];
}

export interface IReportReturnPayment {
  dateReturnPayment: Date | null;
  returnPayments: string;
  returnPaymentsbank: string;
  returnPaymentDescription: string;
  [index: number]: string | Date;
}
export interface IReportPayment {
  datepayment: Date | null;
  payments: string;
  bank: string;
  paymentDescription: string;
  [index: number]: string | Date;
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

export interface ISelectListItem {
  focusindex: boolean;
  openChildrenItem: boolean;
}
export interface ISidebarItemComponent {
  open: boolean;
  handleSelectedListItem: (index: number, itemRoute: string) => void;
  selectListItem: ISelectListItem[];
  [index: number]: boolean;
}

export interface IReportAccordionProps {
  submitCount: number;
  setFormDataChanged: (arg: boolean) => void;
  isExpended: boolean;
  handleIsExpended: () => void;
  removeReport: UseFieldArrayRemove;
  control: Control<any>;
  errors: FieldErrors<IContract>;
  reportIndex: number;
  appendReport: UseFieldArrayAppend<IContract>;
  IsReturnPathName: boolean;
}
export interface IReportPaymentComponent {
  control: Control<any>;
  errors: FieldErrors<IContract>;
  reportIndex: number;
  paymentIndex: number;
  IsReturnPathName: boolean;
  setFormDataChanged: (arg: boolean) => void;
}
