"use client";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, MenuItem, Stack, Typography, useTheme } from "@mui/material";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import Icon from "@/Components/Icon";
import { IContract, IContractApiResponse, IReportsApiResponse } from "@/Interface/Interfaces";
import { useForm, FieldError, useFieldArray } from "react-hook-form";
import ReportAccordion from "./ReportAccordion";
import axiosInstance from "@/Services/Api/AxiosInstance";
import SnackBar from "@/Components/SnackBar";
import { usePathname, useRouter } from "next/navigation";
import { AxiosError } from "axios";
import TextFildControler from "@/Components/textFildControler/textFildControler";
import SelectTextFildControler from "@/Components/textFildControler/SelectTextFildControler";
import DatePickerControler from "@/Components/textFildControler/DatePickerControler";

export interface ICreateContractProps {
  Contract: IContractApiResponse | undefined;
}

const CreateContract: React.FC<ICreateContractProps> = ({ Contract }) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const IsReturnPathName = pathname === `/Contracts/ReturnPayments/${Contract?.id}`;
  const defaultvalue = {
    defaultValues: {
      reports: [
        {
          reportDescription: "",
          totalCost: "",
          presenter: "",
          reportsPayment: [
            {
              bank: "",
              payments: "",
              datepayment: null,
              paymentDescription: "",
            },
          ],
          reportsReturnPayment: [
            {
              returnPaymentsbank: "",
              returnPayments: "",
              dateReturnPayment: null,
              returnPaymentDescription: "",
            },
          ],
        },
      ],
    },
  };
  const {
    control,
    reset,
    handleSubmit,
    formState: { submitCount, errors },
  } = useForm<IContract>(defaultvalue);
  const { fields, append, remove } = useFieldArray<IContract>({
    control,
    name: "reports",
  });
  const [hasFormErrors, setFormErrors] = useState(false);

  const [isReportsPayment, setIsReportsPayment] = useState(false);
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  const [isOpenSnackBarUpdate, setIsOpenSnackBarUpdate] = useState(false);
  const [isOpenSnackBarServer, setIsOpenSnackBarServer] = useState(false);
  const [isOpenSnackBarDeleteAccardion, setIsOpenSnackBarDeleteAccardion] = useState(false);
  const [isOpenSnackBarReturnPayment, setIsOpenSnackBarReturnPayment] = useState(false);
  const [isExpended, setIsExpended] = useState<number | null>(0);
  const typeOfReport = ["خرید", "فروش"];
  const handleCloseReturnPayment = () => setIsOpenSnackBarReturnPayment((is) => !is);
  const handleCloseSnackBar = () => setIsOpenSnackBar((is) => !is);
  const handleCloseSnackBarServer = () => setIsOpenSnackBarServer((is) => !is);
  const handleCloseSnackBarUpdate = () => setIsOpenSnackBarUpdate((is) => !is);
  const handleCloseSnackBarDeleteAccardion = () => setIsOpenSnackBarDeleteAccardion((is) => !is);
  const handleIsExpended: (index: number | null) => void = (index) => {
    setIsExpended((isExpended) => (isExpended === index ? null : index));
  };
  const handleOnClickAddAccordion = () => {
    append({
      reportDescription: "",
      totalCost: "",
      presenter: "",
      reportsPayment: [
        {
          bank: "",
          payments: "",
          datepayment: null,
          paymentDescription: "",
        },
      ],
      reportsReturnPayment: [
        {
          returnPaymentsbank: "",
          returnPayments: "",
          dateReturnPayment: null,
          returnPaymentDescription: "",
        },
      ],
    });
    setIsExpended(fields.length);
  };

  const onSubmit = (data: IContract) => {
    const filteredReports = data.reports.map((report) => {
      const filteredReportsPayment = report.reportsPayment.filter((payment) => !Object.values(payment).every((value) => value === null || value === ""));
      const filteredReportsReturnPayment = report.reportsReturnPayment.filter((returnPayment) => !Object.values(returnPayment).every((value) => value === null || value === ""));
      return {
        ...report,
        reportsPayment: filteredReportsPayment,
        reportsReturnPayment: filteredReportsReturnPayment,
      };
    });
    data.reports = filteredReports;

    if (Contract) {
      updateDataContract(data, Contract.id);
    } else {
      saveContract(data);
    }
  };
  const saveContract = async (contract: IContract) => {
    try {
      const isReportsPayment: boolean = contract.reports.some((report) => report.reportsPayment?.length === 0);

      if (contract.reports.length === 0) {
        handleCloseSnackBarDeleteAccardion();
      } else if (isReportsPayment) {
        handleCloseReturnPayment();
      } else {
        await axiosInstance.post("/AddReports", contract);
        handleCloseSnackBar();
        setTimeout(() => {
          router.push("/Contracts/ContractList");
        }, 2000);
      }
    } catch (error) {
      handleCloseSnackBarServer();
    }
  };
  const updateDataContract = async (contract: IContract, id: number) => {
    try {
      const isReportsPayment: boolean = contract.reports.some((report) => report.reportsPayment?.length === 0);

      if (contract.reports.length === 0) {
        handleCloseSnackBarDeleteAccardion();
      } else if (isReportsPayment) {
        handleCloseReturnPayment();
      } else {
        await axiosInstance.post("/updateReports", { ...contract, id });
        handleCloseSnackBarUpdate();
        setTimeout(() => {
          router.back();
        }, 2000);
      }
    } catch (error: AxiosError | any) {
      handleCloseSnackBarServer();
    }
  };

  useEffect(() => {
    if (Contract) {
      const resetReports = (reports: IReportsApiResponse[]) => {
        if (Array.isArray(reports)) {
          return reports.map((report) => ({
            reportDescription: report?.reportDescription,
            presenter: report?.presenter,
            totalCost: report.totalCost,
            reportsPayment: report?.reportsPayment.map((reportPayment) => ({
              bank: reportPayment?.bank,
              payments: reportPayment?.payments,
              datepayment: reportPayment?.datepayment !== null ? new Date(reportPayment.datepayment) : null,
              paymentDescription: reportPayment?.paymentDescription,
            })),
            reportsReturnPayment: report?.reportsReturnPayment.map((reportReturnPayment) => ({
              returnPaymentsbank: reportReturnPayment?.returnPaymentsbank,
              returnPayments: reportReturnPayment?.returnPayments,
              returnPaymentDescription: reportReturnPayment?.returnPaymentDescription,
              dateReturnPayment: reportReturnPayment?.dateReturnPayment !== null ? new Date(reportReturnPayment?.dateReturnPayment) : null,
            })),
          }));
        }
        return [];
      };
      reset({
        numContract: Contract?.numContract,
        dateContract: new Date(Contract?.dateContract),
        typeContract: Contract?.typeContract,
        customer: Contract?.customer,
        reports: resetReports(Contract?.reports), // Assuming ContractId.reports is an array of objects
      });
    } else {
      console.log("add data");
    }
  }, [Contract]);
  const cardTitle = Contract ? (IsReturnPathName ? "ویرایش بازگشت وجه" : "ویرایش قرار‌داد") : "ایجاد قرار‌داد";
  //* use this useeffect for focus on textfiled when have error
  // useEffect(() => {
  //   const firstError = Object.keys(errors).reduce((field: any, a) => {
  //     return !!errors[field] ? field : a;
  //   }, null);

  //   if (firstError) {
  //     console.log(firstError);
  //     setFocus(firstError);
  //   }
  // }, [errors, setFocus]);
  useEffect(() => {
    const hasFieldErrors = Object.keys(errors).length > 0;
    if (hasFieldErrors) {
      setFormErrors(true);
    }
  }, [errors, submitCount]);
  return (
    <Card>
      <CardHeader title={cardTitle} />
      <Divider variant="middle" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent>
          <Grid container spacing={1} alignItems={"center"}>
            <Grid item xs={12} sm={4}>
              <TextFildControler
                inputName="numContract"
                control={control}
                IsReturnPathName={IsReturnPathName}
                label={"شماره قرارداد"}
                inputError={!!errors.numContract}
                helperText={errors.numContract ? (errors.numContract as FieldError).message : " "}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                <DatePickerControler
                  inputName="dateContract"
                  control={control}
                  inputErrors={!!errors.dateContract}
                  IsReturnPathName={IsReturnPathName}
                  label="تاریخ قرارداد *"
                  helperText={errors.dateContract ? (errors.dateContract as FieldError).message : " "}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectTextFildControler
                inputName="typeContract"
                control={control}
                IsReturnPathName={IsReturnPathName}
                label="نوع قرارداد"
                inputError={!!errors.typeContract}
                helperText={errors.typeContract ? (errors.typeContract as FieldError).message : " "}
              >
                {typeOfReport.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </SelectTextFildControler>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFildControler
                inputName="customer"
                control={control}
                IsReturnPathName={IsReturnPathName}
                label="طرف قرارداد"
                inputError={!!errors.customer}
                helperText={errors.customer ? (errors.customer as FieldError).message : " "}
              />
            </Grid>
          </Grid>

          {fields.map((report, index: number) => (
            <ReportAccordion
              key={report.id}
              submitCount={submitCount}
              IsReturnPathName={IsReturnPathName}
              isExpended={isExpended === index}
              handleIsExpended={() => handleIsExpended(index)}
              removeReport={remove}
              control={control}
              errors={errors}
              reportIndex={index}
              appendReport={append}
            />
          ))}
          <Grid item xs={12} onClick={handleOnClickAddAccordion} sx={{ pt: 5, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {!IsReturnPathName && (
              <Stack justifyContent={"center"} alignItems={"center"}>
                <Icon color={theme.palette.primary.main} pathName="addBtn.svg" size="40px" />
                <Typography variant="body1" color={theme.palette.primary.main}>
                  افزودن شرح و مشخصات
                </Typography>
              </Stack>
            )}
          </Grid>
        </CardContent>
        <CardActions dir="ltr">
          <Button type="submit" variant="contained" color="primary">
            ثبت
          </Button>

          <SnackBar horizontal={"center"} vertical={"top"} message={"قرارداد با موفقیت ثبت شد."} isOpen={isOpenSnackBar} handleClose={handleCloseSnackBar} color="rgb(11, 150, 30)" />
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"حداقل یک شرح و مشخصات ایجاد کنید."}
            isOpen={isOpenSnackBarDeleteAccardion}
            handleClose={handleCloseSnackBarDeleteAccardion}
            color={theme.palette.warning.main}
          />
          <SnackBar horizontal={"center"} vertical={"top"} message={"قرارداد با موفقیت ویرایش شد."} isOpen={isOpenSnackBarUpdate} handleClose={handleCloseSnackBarUpdate} color="rgb(11, 150, 30)" />
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"حداقل یک پرداخت وارد کنید."}
            isOpen={isOpenSnackBarReturnPayment}
            handleClose={handleCloseReturnPayment}
            color={theme.palette.warning.main}
          />
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"لطفاً تمامی فیلدها را پر کنید."}
            isOpen={hasFormErrors}
            handleClose={() => setFormErrors(false)}
            color={theme.palette.warning.main}
          />
          <SnackBar horizontal={"center"} vertical={"top"} message={"سرور پاسخگو نیست."} isOpen={isOpenSnackBarServer} handleClose={handleCloseSnackBarServer} color={theme.palette.error.main} />
        </CardActions>
      </form>
    </Card>
  );
};

export default CreateContract;
