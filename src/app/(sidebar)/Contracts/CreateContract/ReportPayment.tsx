import { IContract } from "@/Interface/Interfaces";
import Icon from "@/app/Components/Icon";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import { Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";

export interface IReportPaymentComponent {
  control: Control<any>;
  errors: FieldErrors<IContract>;
  reportIndex: number;
  paymentIndex: number;
}
const ReportPayment: React.FC<IReportPaymentComponent> = ({ control, errors, reportIndex, paymentIndex }) => {
  const theme = useTheme();
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Controller
          name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].bank`}
          control={control}
          defaultValue=""
          rules={{ required: " بانک/شرکاء/صندوق را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
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
          rules={{ required: "مبلغ پرداختی/دریافتی را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].payments`}
              required
              fullWidth
              label={"مبلغ پرداختی/دریافتی"}
              error={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.payments}
              helperText={
                errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.payments
                  ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.payments as FieldError).message
                  : " "
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].datepayment`}
          control={control}
          defaultValue=""
          rules={{ required: "تاریخ پرداخت/دریافت را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].datepayment`}
              required
              fullWidth
              label={"تاریخ پرداخت/دریافت"}
              error={!!errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment}
              helperText={
                errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment
                  ? (errors.reports?.[reportIndex]?.reportsPayment?.[paymentIndex]?.datepayment as FieldError).message
                  : " "
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].paymentDescription`}
          control={control}
          defaultValue=""
          rules={{ required: "توضیحات را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
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
