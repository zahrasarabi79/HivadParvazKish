import { IContract, IReportPaymentComponent } from "@/Interface/Interfaces";
import Icon from "@/Components/Icon";
import DatePickerControler from "@/Components/textFildControler/DatePickerControler";
import NumericFormatControler from "@/Components/textFildControler/NumericFormatControler";
import { TextFildCustom } from "@/Components/textFildControler/TextFiledCustom";
import TextFildControler from "@/Components/textFildControler/textFildControler";
import TextFild from "@/Components/textFildControler/textFildControler";
import { Grid, IconButton, TextField, useMediaQuery, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import IMask from 'imask';

const ReportPayment: React.FC<IReportPaymentComponent> = ({ IsReturnPathName, remove, control, errors, reportIndex, paymentIndex }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery("@media (max-width: 1200px)");

  return (
    <>
      <Grid item xs={IsReturnPathName ? 12 : mdDown ? 12 : 11.6}>
        <Grid
          container
          sx={{ pr: mdDown ? 0 : 2, borderRight: !mdDown && !IsReturnPathName ? "1px solid rgba(190,196,209,1)" : 0, borderBottom: mdDown && !IsReturnPathName ? "1px solid rgba(190,196,209,1)" : 0 }}
          spacing={1}
        >
          <Grid item xs={12} sm={4}>
            <TextFildControler
              inputName={`reports.${reportIndex}.reportsPayment[${paymentIndex}].bank`}
              control={control}
              IsReturnPathName={IsReturnPathName}
              requiredRule={paymentIndex === 0 ? "این فیلد الزامی است." : ""}
              label="بانک/شرکاء/صندوق"
              inputError={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.bank}
              helperText={errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.bank ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.bank as FieldError).message : " "}
            />
          </Grid>
          <Grid item xs={12} sm={4} >
            <NumericFormatControler
              inputName={`reports.${reportIndex}.reportsPayment[${paymentIndex}].payments`}
              control={control}
              requiredRule={paymentIndex === 0 ? "این فیلد الزامی است." : ""}
              IsReturnPathName={IsReturnPathName}
              label={"مبلغ پرداختی/دریافتی (ریال)"}
              inputError={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.payments}
              helperText={
                errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.payments ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.payments as FieldError).message : " "
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
              <DatePickerControler
                inputName={`reports.${reportIndex}.reportsPayment[${paymentIndex}].datepayment`}
                control={control}
                inputErrors={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment}
                IsReturnPathName={IsReturnPathName}
                label="تاریخ پرداخت/دریافت *"
                requiredRule={paymentIndex === 0 ? "این فیلد الزامی است." : ""}
                helperText={
                  errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment as FieldError).message : " "
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextFildControler
              inputName={`reports.${reportIndex}.reportsPayment[${paymentIndex}].paymentDescription`}
              control={control}
              requiredRule=""
              IsReturnPathName={IsReturnPathName}
              required={false}
              label="توضیحات"
              inputError={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.paymentDescription}
              helperText={
                errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.paymentDescription
                  ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.paymentDescription as FieldError).message
                  : " "
              }
            />
          </Grid>
          <Grid item xs={12}>
         
          </Grid>
        </Grid>
      </Grid>
      {!IsReturnPathName && (
        <Grid item xs={mdDown ? 12 : 0.4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0px !important" }}>
          <IconButton onClick={() => remove(paymentIndex)}>
            <Icon pathName="../icon/Trash.svg" focused={false} />
          </IconButton>
        </Grid>
      )}
    </>
  );
};

export default ReportPayment;
