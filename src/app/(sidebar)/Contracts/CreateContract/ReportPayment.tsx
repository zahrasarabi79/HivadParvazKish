import { IContract, IReportPaymentComponent } from "@/Interface/Interfaces";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import { Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const ReportPayment: React.FC<IReportPaymentComponent> = ({ IsReturnPathName, control, errors, reportIndex, paymentIndex }) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Controller
          name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].bank`}
          control={control}
          defaultValue=""
          rules={{ required: paymentIndex === 0 ? " بانک/شرکاء/صندوق را وارد کنید." : undefined }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              disabled={IsReturnPathName}
              name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].bank`}
              required
              fullWidth
              label={"بانک/شرکاء/صندوق"}
              error={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.bank}
              helperText={
                errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.bank
                  ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.bank as FieldError).message
                  : " "
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].payments`}
          control={control}
          defaultValue=""
          rules={{ required: paymentIndex === 0 ? "مبلغ پرداختی/دریافتی را وارد کنید." : undefined }}
          render={({ field }) => (
            <NumericFormat
              value={field.value}
              customInput={TextField}
              thousandSeparator
              disabled={IsReturnPathName}
              required
              fullWidth
              label={"قیمت کل"}
              error={!!errors.reports?.[reportIndex]?.totalCost}
              helperText={errors.reports?.[reportIndex]?.totalCost ? (errors.reports?.[reportIndex]?.totalCost as FieldError).message : " "}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <Controller
            name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].datepayment`}
            control={control}
            defaultValue=""
            rules={{ required: paymentIndex === 0 ? "تاریخ پرداخت/دریافت را وارد کنید." : undefined }}
            render={({ field }) => (
              <DatePicker
                {...field}
                disabled={IsReturnPathName}
                sx={{ width: "100%" }}
                label={"تاریخ پرداخت/دریافت"}
                value={field.value}
                slotProps={{
                  textField: {
                    error: !!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment,
                    helperText: errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment
                      ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment as FieldError).message
                      : " ",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <Controller
          name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].paymentDescription`}
          control={control}
          defaultValue=""
          rules={{ required: paymentIndex === 0 ? "توضیحات را وارد کنید." : undefined }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              disabled={IsReturnPathName}
              name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].paymentDescription`}
              fullWidth
              label={"توضیحات"}
              error={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.paymentDescription}
              helperText={
                errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.paymentDescription
                  ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.paymentDescription as FieldError).message
                  : " "
              }
            />
          )}
        />
      </Grid>
    </>
  );
};

export default ReportPayment;
