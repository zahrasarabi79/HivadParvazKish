import { IContract } from "@/Interface/Interfaces";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import { Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
export interface IReportReturnPaymentProps {
  control: Control<any>;
  errors: FieldErrors<IContract>;
  reportIndex: number;
  paymentIndex: number;
}

const ReportReturnPayment: React.FC<IReportReturnPaymentProps> = ({ control, errors, reportIndex, paymentIndex }) => {
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
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <Controller
            name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].dateReturnPayment`}
            control={control}
            defaultValue=""
            rules={{ required: "تاریخ برگشت از خرید یا فروش را وارد کنید." }}
            render={({ field }) => (
              <DatePicker
                {...field}
                sx={{ width: "100%" }}
                label={"تاریخ برگشت از خرید/فروش"}
                value={null}
                slotProps={{
                  textField: {
                    error: !!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.dateReturnPayment,
                    helperText: errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.dateReturnPayment
                      ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.dateReturnPayment as FieldError).message
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
