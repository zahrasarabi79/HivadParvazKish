"use client";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Icon from "@/app/Components/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import { IContract, IContractApiResponse, IReports, IReportsApiResponse } from "@/Interface/Interfaces";
import { useForm, Controller, FieldError, useFieldArray } from "react-hook-form";
import ReportAccordion from "./ReportAccordion";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "@/AxiosInstance/AxiosInstance";
import SnackBar from "@/app/Components/SnackBar";
import { usePathname, useRouter } from "next/navigation";
import { AxiosError } from "axios";

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
    formState: { errors },
  } = useForm<IContract>(defaultvalue);
  const { fields, append, remove } = useFieldArray<IContract>({
    control,
    name: "reports",
  });
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  const [isExpended, setIsExpended] = useState<number | null>(null);
  const typeOfReport = ["خرید", "فروش"];
  const handleCloseSnackBar = () => setIsOpenSnackBar((is) => !is);
  const handleIsExpended: (id: number | null) => void = (id) => {
    setIsExpended((isExpended) => (isExpended === id ? null : id));
  };
  const onSubmit = (data: IContract) => {
    if (Contract) {
      console.log(data);
      updateDataContract(data, Contract.id);
    } else {
      console.log(data);
      saveContract(data);
    }
    setTimeout(() => {
      router.push("/Contracts/ContractList");
    }, 1500);
  };
  const saveContract = async (contract: IContract) => {
    try {
      const { data } = await axiosInstance.post("/AddReports", contract);
      handleCloseSnackBar();
    } catch (error) {
      console.log("problem:", error);
    }
  };
  const updateDataContract = async (contract: IContract, id: number) => {
    try {
      const { data } = await axiosInstance.post("/updateReports", { ...contract, id });
      console.log(data);
    } catch (error: AxiosError | any) {
      console.log("problem");
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
              datepayment: new Date(reportPayment?.datepayment),
              paymentDescription: reportPayment?.paymentDescription,
            })),
            reportsReturnPayment: report?.reportsReturnPayment.map((reportReturnPayment) => ({
              returnPaymentsbank: reportReturnPayment?.returnPaymentsbank,
              returnPayments: reportReturnPayment?.returnPayments,
              returnPaymentDescription: reportReturnPayment?.returnPaymentDescription,
              dateReturnPayment: new Date(reportReturnPayment?.dateReturnPayment),
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

  return (
    <Card>
      <CardHeader title={"ایجاد قرارداد"} />
      <Divider variant="middle" />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={3} alignItems={"center"}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="numContract"
                control={control}
                defaultValue={""}
                rules={{ required: "شماره قرارداد را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    name="numContract"
                    required
                    fullWidth
                    disabled={IsReturnPathName}
                    label="شماره قرارداد"
                    error={!!errors.numContract}
                    helperText={errors.numContract ? (errors.numContract as FieldError).message : " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                <Controller
                  name="dateContract"
                  control={control}
                  rules={{ required: "تاریخ قرارداد را وارد کنید." }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      disabled={IsReturnPathName}
                      sx={{ width: "100%" }}
                      label="تاریخ قرارداد"
                      value={field.value} // when we fetch data an set default value it is correct to set value to show data as default value
                      slotProps={{
                        textField: {
                          error: !!errors.dateContract,
                          helperText: errors.dateContract ? "تاریخ قرار داد را وارد کنید" : " ",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="typeContract"
                control={control}
                defaultValue="خرید"
                rules={{ required: "نوع قرارداد را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    disabled={IsReturnPathName}
                    name="typeContract"
                    required
                    select
                    fullWidth
                    label={"نوع قرارداد"}
                    helperText={errors.typeContract ? (errors.typeContract as FieldError).message : " "}
                  >
                    {typeOfReport.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextFildCustom>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="customer"
                control={control}
                defaultValue={""}
                rules={{ required: "طرف قرارداد را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    disabled={IsReturnPathName}
                    name="customer"
                    required
                    fullWidth
                    label="طرف قرارداد"
                    placeholder=""
                    error={!!errors.customer}
                    helperText={errors.customer ? (errors.customer as FieldError).message : " "}
                  />
                )}
              />
            </Grid>
          </Grid>

          {fields.map((report, index: number) => (
            <ReportAccordion
              key={uuidv4()}
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
          <Grid
            item
            xs={12}
            onClick={() =>
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
              })
            }
            sx={{ pt: 5, display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Icon color={theme.palette.primary.main} pathName="addBtn.svg" size="40px" />
          </Grid>
        </CardContent>
        <CardActions dir="ltr">
          <Button type="submit" variant="contained" color="primary">
            ثبت
          </Button>
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"قرارداد با موفقیت ثبت شد."}
            isOpen={isOpenSnackBar}
            handleClose={handleCloseSnackBar}
          />
        </CardActions>
      </form>
      {/* <CardContent sx={{ height: "600px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">در حال حاضر درخواستی وجود ندارد</Typography>
        <Image src={"/icon/Vector.svg"} width={400} height={400} alt="Vector" />
      </CardContent> */}
    </Card>
  );
};

export default CreateContract;
