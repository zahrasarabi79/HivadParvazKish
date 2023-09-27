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
import { IContract, IContractApiResponse, IReports } from "@/Interface/Interfaces";
import { useForm, Controller, FieldError, useFieldArray } from "react-hook-form";
import ReportAccordion from "./ReportAccordion";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "@/AxiosInstance/AxiosInstance";
import SnackBar from "@/app/Components/SnackBar";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export interface ICreateContractProps {
  ContractId: number;
}
const CreateContract: React.FC<ICreateContractProps> = ({ ContractId }) => {
  const theme = useTheme();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
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
              datepayment: "",
              paymentDescription: "",
            },
          ],
          reportsReturnPayment: [
            {
              returnPaymentsbank: "",
              returnPayments: "",
              dateReturnPayment: "",
              returnPaymentDescription: "",
            },
          ],
        },
      ],
    },
  });
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
    console.log(data);
    saveContract(data);
    setTimeout(() => {
      router.push("/Contracts/ContractList");
    }, 1500);
  };

  const getContract = async (id: number) => {
    try {
      const { data } = await axiosInstance.post("/showReports", { id });
     let  uptadedData = data?.Contracts[0];
      console.log(data.Contracts[0]);
    } catch (error: AxiosError | any) {
      console.log("problem:", error);
    }
  };

  useEffect(() => {
    if (ContractId) {
      getContract(ContractId);
    } else {
      console.log("add data");
    }
  }, []);

  const saveContract = async (contract: IContract) => {
    try {
      const { data } = await axiosInstance.post("/AddReports", contract);
      handleCloseSnackBar();
    } catch (error) {
      console.log("problem:", error);
    }
  };


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
                defaultValue=""
                rules={{ required: "شماره قرارداد را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    name="numContract"
                    required
                    fullWidth
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
                  defaultValue=""
                  rules={{ required: "تاریخ قرارداد را وارد کنید." }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      sx={{ width: "100%" }}
                      label="تاریخ قرارداد"
                      value={null}
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
                defaultValue={[]}
                rules={{ required: "طرف قرارداد را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
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

          {fields.map((report, index) => (
            <ReportAccordion
              key={uuidv4()}
              report={report as IReports}
              removeReport={remove}
              appendReport={append}
              reportIndex={index}
              isExpended={isExpended === index}
              watch={watch}
              register={register}
              setValue={setValue}
              handleIsExpended={() => handleIsExpended(index)}
              control={control}
              errors={errors}
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
                    datepayment: "",
                    paymentDescription: "",
                  },
                ],
                reportsReturnPayment: [
                  {
                    returnPaymentsbank: "",
                    returnPayments: "",
                    dateReturnPayment: "",
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
