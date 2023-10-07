import { IContract } from "@/Interface/Interfaces";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import { Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import React from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { NumericFormat } from "react-number-format";
export interface IReportReturnPaymentProps {
  control: Control<any>;
  errors: FieldErrors<IContract>;
  reportIndex: number;
  paymentIndex: number;
  setFormDataChanged: (arg: boolean) => void;
}

const ReportReturnPayment: React.FC<IReportReturnPaymentProps> = ({ control, errors, reportIndex, paymentIndex, setFormDataChanged }) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Controller
          name={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPaymentsbank`}
          control={control}
          defaultValue=""
          rules={{ required: reportIndex === 0 ? " بانک/شرکاء/صندوق الزامی است." : undefined }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              onBlur={() => setFormDataChanged(true)}
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
          rules={{ required: reportIndex === 0 ? "مبلغ برگشت از خرید یا فروش  الزامی است." : undefined }}
          render={({ field }) => (
            <NumericFormat
              value={field.value}
              onValueChange={(v) => {
                field.onChange(v.value);
              }}
              onBlur={() => setFormDataChanged(true)}
              customInput={TextField}
              thousandSeparator
              required
              fullWidth
              label={"مبلغ برگشت از خرید‌/فروش (ریال)"}
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
            rules={{ required: reportIndex === 0 ? "تاریخ برگشت از خرید یا فروش الزامی است." : undefined }}
            render={({ field }) => (
              <DatePicker
                {...field}
                format="yyyy-MM-dd"
                sx={{ width: "100%" }}
                value={field.value}
                label={"تاریخ برگشت از خرید/فروش"}
                onChange={(date) => {
                  field.onChange(date); // Update the field value
                  setFormDataChanged(true); // Set dateChanged to true when the date changes
                }}
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
          rules={{ required: reportIndex === 0 ? "توضیحات الزامی است." : undefined }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              onBlur={() => setFormDataChanged(true)}
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
