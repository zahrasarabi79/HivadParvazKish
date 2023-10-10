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
import TextFildControler from "@/app/Components/textFildControler";
import SelectTextFildControler from "@/app/Components/SelectTextFildControler";
import DatePickerControler from "@/app/Components/DatePickerControler";

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
  const [isOpenSnackBarUpdate, setIsOpenSnackBarUpdate] = useState(false);
  const [isOpenSnackBarDeleteAccardion, setIsOpenSnackBarDeleteAccardion] = useState(false);
  const [isOpenSnackBarFillInput, setIsOpenSnackBarFillInput] = useState(false);
  const [isExpended, setIsExpended] = useState<number | null>(null);
  const typeOfReport = ["خرید", "فروش"];
  const handleCloseSnackBar = () => setIsOpenSnackBar((is) => !is);
  const handleCloseSnackBarFillInput = () => setIsOpenSnackBarFillInput((is) => !is);
  const handleCloseSnackBarUpdate = () => setIsOpenSnackBarUpdate((is) => !is);
  const handleCloseSnackBarDeleteAccardion = () => setIsOpenSnackBarDeleteAccardion((is) => !is);
  const [formDataChanged, setFormDataChanged] = useState(false);
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
    if (Contract) {
      updateDataContract(data, Contract.id);
    } else {
      console.log(data);
      saveContract(data);
    }
  };
  const saveContract = async (contract: IContract) => {
    try {
      if (contract.reports.length === 0) {
        handleCloseSnackBarDeleteAccardion();
      } else {
        const { data } = await axiosInstance.post("/AddReports", contract);
        handleCloseSnackBar();
        setTimeout(() => {
          router.push("/Contracts/ContractList");
        }, 2000);
      }
    } catch (error) {
      console.log("problem:", error);
    }
  };
  const updateDataContract = async (contract: IContract, id: number) => {
    try {
      if (contract.reports.length === 0) {
        handleCloseSnackBarDeleteAccardion();
      }
      if (!formDataChanged) {
        console.log("did not change");
        setTimeout(() => {
          router.push("/Contracts/ContractList");
        }, 2000);
      } else {
        const { data } = await axiosInstance.post("/updateReports", { ...contract, id });
        handleCloseSnackBarUpdate();
        setTimeout(() => {
          router.push("/Contracts/ContractList");
        }, 2000);
      }
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
  const cardTitle = Contract ? (IsReturnPathName ? "ویرایش بازگشت وجه" : "ویرایش قرار‌داد") : "ایجاد قرار‌داد";

  return (
    <Card>
      <CardHeader title={cardTitle} />
      <Divider variant="middle" />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={1} alignItems={"center"}>
            <Grid item xs={12} sm={4}>
              <TextFildControler
                inputName="numContract"
                control={control}
                errors={errors}
                IsReturnPathName={IsReturnPathName}
                setFormDataChanged={setFormDataChanged}
                label={"شماره قراداد"}
                requiredRule={"این فیلد الزامی است."}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                <DatePickerControler
                  inputName="dateContract"
                  control={control}
                  errors={errors}
                  IsReturnPathName={IsReturnPathName}
                  setFormDataChanged={setFormDataChanged}
                  label="تاریخ قرارداد *"
                  requiredRule={"این فیلد الزامی است."}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectTextFildControler
                inputName="typeContract"
                control={control}
                errors={errors}
                IsReturnPathName={IsReturnPathName}
                setFormDataChanged={setFormDataChanged}
                label="نوع قرارداد"
                requiredRule={"این فیلد الزامی است."}
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
                errors={errors}
                IsReturnPathName={IsReturnPathName}
                setFormDataChanged={setFormDataChanged}
                label="طرف قرارداد"
                requiredRule={"این فیلد الزامی است."}
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
              setFormDataChanged={setFormDataChanged}
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
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"قرارداد با موفقیت ثبت شد."}
            isOpen={isOpenSnackBar}
            handleClose={handleCloseSnackBar}
            color="rgb(11, 150, 30)"
          />
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"حداقل یک شرح و مشخصات ایجاد کنید."}
            isOpen={isOpenSnackBarDeleteAccardion}
            handleClose={handleCloseSnackBarDeleteAccardion}
            color={theme.palette.warning.main}
          />
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"قرارداد با موفقیت ویرایش شد."}
            isOpen={isOpenSnackBarUpdate}
            handleClose={handleCloseSnackBarUpdate}
            color="rgb(11, 150, 30)"
          />
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"فیلد هارا کامل پر کنید."}
            isOpen={isOpenSnackBarFillInput}
            handleClose={handleCloseSnackBarFillInput}
            color={theme.palette.warning.main}
          />
        </CardActions>
      </form>
    </Card>
  );
};

export default CreateContract;
