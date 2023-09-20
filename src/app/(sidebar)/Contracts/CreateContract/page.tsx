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
import { useState } from "react";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Icon from "@/app/Components/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import { IContract, IReports } from "@/Interface/Interfaces";
import { useForm, Controller, FieldError, useFieldArray } from "react-hook-form";
import ReportAccordion from "./ReportAccordion";
import { v4 as uuidv4 } from "uuid";

const CreateContract = () => {
  const {
    control,
    handleSubmit,
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
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray<IContract>({
    control,
    name: "reports",
  });
  const [isExpended, setIsExpended] = useState(false);
  const theme = useTheme();
  const [description, setDescription] = useState("");
  const typeOfReport = ["خرید", "فروش"];

  const onSubmit = (data: IContract) => {
    console.log(data); // Access form data here
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
                name="customers"
                control={control}
                defaultValue={[]}
                rules={{ required: "طرف قرارداد را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    name="customers"
                    required
                    fullWidth
                    label="طرف قرارداد"
                    placeholder=""
                    error={!!errors.customers}
                    helperText={errors.customers ? (errors.customers as FieldError).message : " "}
                  />
                )}
              />
            </Grid>
          </Grid>

          {fields.map((report, index) => (
            <ReportAccordion
              key={uuidv4()}
              report={report as IReports}
              removeReport={() => remove(index)}
              appendReport={append}
              reportIndex={index}
              isExpended={isExpended}
              setIsExpended={setIsExpended}
              description={description}
              control={control}
              errors={errors}
            />
          ))}
          <Grid
            item
            xs={12}
            onClick={() => append({ reportDescription: "", totalCost: "", presenter: "", reportsPayment: [] })}
            sx={{ pt: 5, display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Icon color={theme.palette.primary.main} pathName="addBtn.svg" size="40px" />
          </Grid>
        </CardContent>
        <CardActions dir="ltr">
          <Button type="submit" variant="contained" color="primary">
            ثبت
          </Button>
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
