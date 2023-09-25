import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, IconButton, Stack, Typography, useTheme } from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Icon from "@/app/Components/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormWatch,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import { IContract, IReports } from "@/Interface/Interfaces";
import ReportPayment from "./ReportPayment";
import { v4 as uuidv4 } from "uuid";
import ReportReturnPayment from "./ReportReturnPayment";
import { watch } from "fs";
import { describe } from "node:test";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import SnackBar from "@/app/Components/SnackBar";

export interface IReportAccordionProps {
  report: IReports;
  removeReport: UseFieldArrayRemove;
  appendReport: UseFieldArrayAppend<IContract>;
  isExpended: boolean;
  watch: UseFormWatch<any>;
  handleIsExpended: () => void;
  control: Control<any>;
  errors: FieldErrors<IContract>;
  setValue: any;
  reportIndex: number;
  register: any;
}

const ReportAccordion: React.FC<IReportAccordionProps> = ({
  isExpended,
  handleIsExpended,
  setValue,
  watch,
  report,
  removeReport,
  control,
  errors,
  reportIndex,
  register,
}) => {
  const theme = useTheme();

  const { fields: reportsPaymentFields, append: appendReportsPayment } = useFieldArray<IContract>({
    control,
    name: `reports.${reportIndex}.reportsPayment`,
  });
  const { fields: reportsReturnPaymentFields, append: appendReportsReturnPayment } = useFieldArray<IContract>({
    control,
    name: `reports.${reportIndex}.reportsReturnPayment`,
  });
  const [isOpenSnackBarDelete, setIsOpenSnackBarDelete] = useState(false);
  const handleCloseSnackBarDelete = () => setIsOpenSnackBarDelete(true);

  const removeReports = (indexToRemove: number) => {
    if (indexToRemove !== 0) {
      removeReport(indexToRemove);
    }
    if (indexToRemove === 0) {
      handleCloseSnackBarDelete();
    }
  };

  const Describtion = useWatch({ control, name: `reports.${reportIndex}.reportDescription` });
  // we can not use watch and instead of it ,we use "useWatch"
  // const Describtion2 = watch(`reports.${reportIndex}.reportDescription`);
  return (
    <>
      <Accordion
        expanded={isExpended}
        onChange={handleIsExpended}
        sx={{
          marginY: 2,
          boxShadow: "none",
          justifyContent: "inherit",
          "&:before": { backgroundColor: "transparent" },
        }}
      >
        <AccordionSummary
          dir="rtl"
          sx={{
            display: "flex",
            bgcolor: "#363448",
            boxShadow: "none",
            borderRadius: "0.5rem",
            justifyContent: "inherit",
            "&.Mui-expanded": {
              bgcolor: "#4B495c",
              borderBottom: "2px solid #FF7535",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
              minHeight: "auto",
            },
            "& .MuiAccordionSummary-content": {
              justifyContent: "space-between",
              "&.Mui-expanded": { marginY: 2, mx: 1 },
            },
          }}
          expandIcon={<ExpandCircleDownOutlinedIcon />}
        >
          <Typography>{Describtion || "شرح و مشخصات"}</Typography>
          {isExpended && (
            <Stack direction={"row"} gap={1}>
              <IconButton onClick={() => removeReports(reportIndex)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          )}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#363448",
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <Grid container spacing={3} alignItems={"center"} sx={{ my: 1 }}>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reports.${reportIndex}.reportDescription`}
                control={control}
                rules={{ required: "شرح مشخصات را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    required
                    fullWidth
                    label={"شرح مشخصات"}
                    error={!!errors.reports?.[reportIndex]?.reportDescription}
                    helperText={
                      errors.reports?.[reportIndex]?.reportDescription
                        ? (errors.reports?.[reportIndex]?.reportDescription as FieldError).message
                        : " "
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reports.${reportIndex}.presenter`}
                control={control}
                defaultValue=""
                rules={{ required: " مشخصات مجری را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    required
                    fullWidth
                    label={"مجری"}
                    error={!!errors.reports?.[reportIndex]?.presenter}
                    helperText={errors.reports?.[reportIndex]?.presenter ? (errors.reports?.[reportIndex]?.presenter as FieldError).message : " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reports.${reportIndex}.totalCost`}
                control={control}
                defaultValue=""
                rules={{ required: "قیمت کل را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    required
                    fullWidth
                    label={"قیمت کل"}
                    error={!!errors.reports?.[reportIndex]?.totalCost}
                    helperText={errors.reports?.[reportIndex]?.totalCost ? (errors.reports?.[reportIndex]?.totalCost as FieldError).message : " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ p: 1 }}>
                پرداخت ها
              </Typography>
              <Divider />
            </Grid>

            {reportsPaymentFields.map((reportPayment, index) => (
              <ReportPayment key={uuidv4()} control={control} errors={errors} reportIndex={reportIndex} paymentIndex={index} />
            ))}
            <Grid
              item
              xs={12}
              onClick={() =>
                appendReportsPayment({
                  bank: "",
                  payments: "",
                  datepayment: "",
                  paymentDescription: "",
                })
              }
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton>
                <Icon color={theme.palette.primary.main} pathName="addBtn.svg" size="40px" />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ p: 1 }}>
                برگشت
              </Typography>
              <Divider />
            </Grid>
            {reportsReturnPaymentFields.map((reportReturnPayment, index) => (
              <ReportReturnPayment key={uuidv4()} control={control} errors={errors} reportIndex={reportIndex} paymentIndex={index} />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            onClick={() =>
              appendReportsReturnPayment({
                returnPaymentsbank: "",
                returnPayments: "",
                dateReturnPayment: "",
                returnPaymentDescription: "",
              })
            }
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <IconButton>
              <Icon color={theme.palette.primary.main} pathName="addBtn.svg" size="40px" />
            </IconButton>
          </Grid>
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"اجازه حذف این آیتم را ندارید. "}
            handleClose={handleCloseSnackBarDelete}
            isOpen={isOpenSnackBarDelete}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ReportAccordion;
