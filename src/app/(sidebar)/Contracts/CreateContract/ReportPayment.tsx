import { IContract, IReportPaymentComponent } from "@/Interface/Interfaces";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
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
        <Controller
          name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].bank`}
          control={control}
          defaultValue=""
          rules={{ required: reportIndex === 0 ? "  این فیلد الزامی است." : undefined }}
          render={({ field }) => (
            <TextFildCustom
              {...field}

              onBlur={() => setFormDataChanged(true)}
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
          rules={{ required: reportIndex === 0 ? " این فیلد الزامی است." : undefined }}
          render={({ field }) => (
            <NumericFormat
              //*value & onValueChange must be writen otherwise react hook form didnot get updated valu of input
              value={field.value}
              onValueChange={(v) => {
                field.onChange(v.value);
              }}
              onBlur={() => setFormDataChanged(true)}
              customInput={TextField}
              thousandSeparator
              disabled={IsReturnPathName}
              required
              fullWidth
              label={"مبلغ پرداختی/دریافتی (ریال)"}
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
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <Controller
            name={`reports.${reportIndex}.reportsPayment[${paymentIndex}].datepayment`}
            control={control}
            defaultValue=""
            rules={{ required: reportIndex === 0 ? " این فیلد الزامی است." : undefined }}
            render={({ field }) => (
              <DatePicker
                {...field}
                format="yyyy-MM-dd"
                disabled={IsReturnPathName}
                sx={{ width: "100%"}}
                label={"تاریخ پرداخت/دریافت"}
                value={field.value}
                
                onChange={(date) => {
                  field.onChange(date); // Update the field value
                  setFormDataChanged(true); // Set dateChanged to true when the date changes
                }}
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
          // rules={{ required: reportIndex === 0 ? "این فیلد الزامی است." : undefined }}
          render={({ field }) => (
            <TextFildCustom
              {...field}
              onBlur={() => setFormDataChanged(true)}
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
