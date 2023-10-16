import { IContract, IReportPaymentComponent } from "@/Interface/Interfaces";
import DatePickerControler from "@/app/Components/textFildControler/DatePickerControler";
import NumericFormatControler from "@/app/Components/textFildControler/NumericFormatControler";
import { TextFildCustom } from "@/app/Components/textFildControler/TextFiledCustom";
import TextFildControler from "@/app/Components/textFildControler/textFildControler";
import { Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const ReportPayment: React.FC<IReportPaymentComponent> = ({ IsReturnPathName, control, errors, reportIndex, paymentIndex, setFormDataChanged }) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <TextFildControler
          inputName={`reports.${reportIndex}.reportsPayment[${paymentIndex}].bank`}
          control={control}
          IsReturnPathName={IsReturnPathName}
          setFormDataChanged={setFormDataChanged}
          requiredRule={paymentIndex === 0 ? "این فیلد الزامی است." : ""}
          label="بانک/شرکاء/صندوق"
          inputError={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.bank}
          helperText={
            errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.bank ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.bank as FieldError).message : " "
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumericFormatControler
          inputName={`reports.${reportIndex}.reportsPayment[${paymentIndex}].payments`}
          control={control}
          requiredRule={paymentIndex === 0 ? "این فیلد الزامی است." : ""}
          IsReturnPathName={IsReturnPathName}
          setFormDataChanged={setFormDataChanged}
          label={"مبلغ پرداختی/دریافتی (ریال)"}
          inputError={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.payments}
          helperText={
            errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.payments
              ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.payments as FieldError).message
              : " "
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
            setFormDataChanged={setFormDataChanged}
            label="تاریخ پرداخت/دریافت *"
            requiredRule={paymentIndex === 0 ? "این فیلد الزامی است." : ""}
            helperText={
              errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment
                ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment as FieldError).message
                : " "
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
          setFormDataChanged={setFormDataChanged}
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
    </>
  );
};

export default ReportPayment;
