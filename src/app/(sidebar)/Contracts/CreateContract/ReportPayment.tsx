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
          name={`reports.${reportIndex}.reportPayments[${paymentIndex}].bank`}
          control={control}
          defaultValue=""
          rules={{ required: " بانک/شرکاء/صندوق را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportPayments[${paymentIndex}].bank`}
              required
              fullWidth
              label={"بانک/شرکاء/صندوق"}
              error={!!errors.reports?.[0]?.bank}
              helperText={errors.reports?.[0]?.bank ? (errors.reports?.[0]?.bank as FieldError).message : " "}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name= {`reports.${reportIndex}.reportPayments[${paymentIndex}].payments`}
          control={control}
          defaultValue=""
          rules={{ required: "مبلغ پرداختی/دریافتی را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportPayments[${paymentIndex}].payments`}
              required
              fullWidth
              label={"مبلغ پرداختی/دریافتی"}
              error={!!errors.reports?.[0]?.reportsPayment?.[0]?.payments}
              helperText={
                errors.reports?.[0]?.reportsPayment?.[0]?.payments ? (errors.reports?.[0]?.reportsPayment?.[0]?.payments as FieldError).message : " "
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name={`reports.${reportIndex}.reportPayments[${paymentIndex}].datepayment`}
          control={control}
          defaultValue=""
          rules={{ required: "تاریخ پرداخت/دریافت را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportPayments[${paymentIndex}].datepayment`}
              required
              fullWidth
              label={"تاریخ پرداخت/دریافت"}
              error={!!errors.reports?.[0]?.reportsPayment?.[0]?.datepayment}
              helperText={
                errors.reports?.[0]?.reportsPayment?.[0]?.datepayment
                  ? (errors.reports?.[0]?.reportsPayment?.[0]?.datepayment as FieldError).message
                  : " "
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name={`reports.${reportIndex}.reportPayments[${paymentIndex}].datepayment`}
          control={control}
          defaultValue=""
          rules={{ required: "تاریخ پرداخت/دریافت را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportPayments[${paymentIndex}].datepayment`}
              required
              fullWidth
              label={"توضیحات"}
              error={!!errors.reports?.[0]?.reportsPayment?.[0]?.paymentDescription}
              helperText={
                errors.reports?.[0]?.reportsPayment?.[0]?.paymentDescription
                  ? (errors.reports?.[0]?.reportsPayment?.[0]?.paymentDescription as FieldError).message
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
