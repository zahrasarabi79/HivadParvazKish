import { Control, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
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
export interface IChangePassFormValues {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
  [index: number]: string;
}
export type roleType = "مدیر" | "کارمند";
export interface INewUser {
  username: string;
  password: string;
}
export interface SidebarItem {
  title: string;
  icon: string;
  route?: string;
  role: roleType[];
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
  openChildrenItem: boolean | undefined;
}
export interface ISidebarItemComponent {
  open: boolean;
  handleSelectedListItem: (index: number, itemRoute: string) => void;
  selectListItem: ISelectListItem[];
  [index: number]: boolean;
  // setSelectListItem: React.Dispatch<React.SetStateAction<ISelectListItem[]>>;
  handleCloseDrawer: () => void;
}

export interface IReportAccordionProps {
  submitCount: number;
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
  remove: UseFieldArrayRemove;
  IsReturnPathName: boolean;
}

// SnackbarContext
export type SnackbarContextType = {
  state: { isOpen: boolean; message: string; color: string };
  openSnackbar: (message: string, color: string) => void;
  closeSnackbar: () => void;
};
export interface ISnackbarState {
  isOpen: boolean;
  message: string;
  color: string;
}
export type SnackbarAction = { type: "OPEN_SNACKBAR"; message: string; color: string } | { type: "CLOSE_SNACKBAR" };

export interface IUser {
  name: string;
  username: string;
  password: string;
  role: roleType;
}
export interface ICreateUsersProps {
  user: IUserApiResponse | undefined;
}
export interface IUserApiResponse {
  id: number | undefined;
  name: string;
  username: string;
  password: string;
  role: roleType;
}
export interface IUserListApiRes {
  users: IUserApiResponse[];
  totalCount: number;
}
export interface IContractListApiRes {
  Contracts: IContractApiResponse[];
  totalCount: number;
}
export interface IListOfSystemLog {
  id: number;
  eventName: string;
  contractId: number;
  numContract: string;
  username: string;
  createdAt: Date;
}
export interface IEvent {
  id: number;
  eventName: string;
  createdAt: Date;
  username: string;
  numContract: string;
}

export interface ApiSystemLogResponse {
  Events: IEvent[];
  totalCount: number;
}
export interface NavbarProps {
  isDesktopSidebarOpen: boolean;
  onDrawerOpen: () => void;
}
export interface IAuthState {
  token: string | null;
  error: string | undefined;
  isLoggedIn: boolean;
}

export interface ICreateContractProps {
  Contract: IContractApiResponse | undefined;
}

export interface IProfilInitialState {
  name: string;
  role: roleType;
}
export interface IProfileRes {
  name: string;
  role: roleType;
}
export interface IReportReturnPaymentProps {
  control: Control<any>;
  errors: FieldErrors<IContract>;
  reportIndex: number;
  paymentIndex: number;
  remove: UseFieldArrayRemove;
}
