import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import { Grid } from "@mui/material";
import React from "react";
import { Controller, FieldError } from "react-hook-form";

const ReportReturnPayment = ({ control, errors, reportIndex, paymentIndex }) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Controller
          name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPaymentsbank`}
          control={control}
          defaultValue=""
          rules={{ required: " بانک/شرکاء/صندوق را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPaymentsbank`}
              required
              fullWidth
              label={"بانک/شرکاء/صندوق"}
              error={!!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentsbank}
              helperText={
                errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentsbank
                  ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentsbank as FieldError).message
                  : " "
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPayments`}
          control={control}
          defaultValue=""
          rules={{ required: "مبلغ برگشت از خرید یا فروش  را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPayments`}
              required
              fullWidth
              label={" مبلغ برگشت از خرید/فروش"}
              error={!!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPayments}
              helperText={
                errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPayments
                  ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPayments as FieldError).message
                  : " "
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].dateReturnPayment`}
          control={control}
          defaultValue=""
          rules={{ required: "تاریخ برگشت از خرید یا فروش را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].dateReturnPayment`}
              required
              fullWidth
              label={"تاریخ برگشت از خرید/فروش"}
              error={!!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.dateReturnPayment}
              helperText={
                errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.dateReturnPayment
                  ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.dateReturnPayment as FieldError).message
                  : " "
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPaymentDescription`}
          control={control}
          defaultValue=""
          rules={{ required: "توضیحات را وارد کنید." }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPaymentDescription`}
              fullWidth
              label={"توضیحات"}
              error={!!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentDescription}
              helperText={
                errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentDescription
                  ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentDescription as FieldError).message
                  : " "
              }
            />
          )}
        />
      </Grid>
    </>
  );
};

export default ReportReturnPayment;
