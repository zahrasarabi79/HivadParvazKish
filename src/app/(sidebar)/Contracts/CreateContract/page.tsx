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
import { useSnackbar } from "@/context/SnackbarContext";

export interface ICreateContractProps {
  Contract: IContractApiResponse | undefined;
}

const CreateContract: React.FC<ICreateContractProps> = ({ Contract }) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const typeOfReport = ["خرید", "فروش"];
  const IsReturnPathName = pathname === `/Contracts/ReturnPayments/${Contract?.id}`;
  const cardTitle = Contract ? (IsReturnPathName ? "ویرایش بازگشت وجه" : "ویرایش قرار‌داد") : "ایجاد قرار‌داد";
  const { state, openSnackbar, closeSnackbar } = useSnackbar();

  // const defaultvalue = {
  //   defaultValues: {
  //     reports: [
  //       {
  //         reportDescription: "",
  //         totalCost: "",
  //         presenter: "",
  //         reportsPayment: [
  //           {
  //             bank: "",
  //             payments: "",
  //             datepayment: null,
  //             paymentDescription: "",
  //           },
  //         ],
  //         reportsReturnPayment: [
  //           {
  //             returnPaymentsbank: "",
  //             returnPayments: "",
  //             dateReturnPayment: null,
  //             returnPaymentDescription: "",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   mode: "onChange",
  // };
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { submitCount, errors },
  } = useForm<IContract>({
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
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray<IContract>({
    control,
    name: "reports",
  });
  console.log(errors?.reports);

  const [isExpended, setIsExpended] = useState<number | null>(0);
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
  const allInput = watch();
  console.log(allInput);
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
        openSnackbar("حداقل یک شرح و مشخصات ایجاد کنید.", theme.palette.warning.main);
      } else if (isReportsPayment) {
        openSnackbar("حداقل یک پرداخت وارد کنید.", theme.palette.warning.main);
      } else {
        await axiosInstance.post("/AddReports", contract);
        openSnackbar("قرارداد با موفقیت ثبت شد.", "rgb(11, 150, 30)");

        setTimeout(() => {
          router.push("/Contracts/ContractList");
        }, 2500);
      }
    } catch (error) {
      openSnackbar("سرور پاسخگو نیست", theme.palette.error.main);
    }
  };
  const updateDataContract = async (contract: IContract, id: number) => {
    try {
      const isReportsPayment: boolean = contract.reports.some((report) => report.reportsPayment?.length === 0);

      if (contract.reports.length === 0) {
        openSnackbar("حداقل یک پرداخت وارد کنید.", theme.palette.warning.main);
      } else if (isReportsPayment) {
        openSnackbar("حداقل یک پرداخت وارد کنید.", theme.palette.warning.main);
      } else {
        await axiosInstance.post("/updateReports", { ...contract, id });
        openSnackbar("قرارداد با موفقیت ویرایش شد.", "rgb(11, 150, 30)");
        setTimeout(() => {
          router.back();
        }, 2500);
      }
    } catch (error: AxiosError | any) {
      openSnackbar("سرور پاسخگو نیست", theme.palette.error.main);
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

  useEffect(() => {
    const hasFieldErrors = Object.keys(errors).length > 0;
    if (hasFieldErrors) {
      openSnackbar("لطفاً تمامی فیلدها را پر کنید.", theme.palette.warning.main);
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
          {state.isOpen && <SnackBar horizontal={"center"} vertical={"top"} message={state.message} isOpen={state.isOpen} handleClose={closeSnackbar} color={state.color} />}
        </CardActions>
      </form>
    </Card>
  );
};

export default CreateContract;
