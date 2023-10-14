import { IContract } from "@/Interface/Interfaces";
import DatePickerControler from "@/app/Components/textFildControler/DatePickerControler";
import NumericFormatControler from "@/app/Components/textFildControler/NumericFormatControler";
import TextFildControler from "@/app/Components/textFildControler/textFildControler";
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import React from "react";
import { Control, FieldError, FieldErrors } from "react-hook-form";
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
        <TextFildControler
          inputName={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPaymentsbank`}
          control={control}
          requiredRule=""
          required={false}
          setFormDataChanged={setFormDataChanged}
          label="بانک/شرکاء/صندوق"
          inputError={!!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentsbank}
          helperText={
            errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentsbank
              ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentsbank as FieldError).message
              : " "
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumericFormatControler
          inputName={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPayments`}
          control={control}
          requiredRule=""
          required={false}
          setFormDataChanged={setFormDataChanged}
          label={"مبلغ برگشت از خرید‌/فروش (ریال) "}
          inputError={!!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPayments}
          helperText={
            errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPayments
              ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPayments as FieldError).message
              : " "
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <DatePickerControler
            inputName={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].dateReturnPayment`}
            control={control}
            inputErrors={!!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.dateReturnPayment}
            setFormDataChanged={setFormDataChanged}
            label={"تاریخ برگشت از خرید/فروش"}
            requiredRule={""}
            helperText={
              errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.dateReturnPayment
                ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.dateReturnPayment as FieldError).message
                : " "
            }
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <TextFildControler
          inputName={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPaymentDescription`}
          control={control}
          requiredRule=""
          required={false}
          setFormDataChanged={setFormDataChanged}
          label={"توضیحات"}
          inputError={!!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentDescription}
          helperText={
            errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentDescription
              ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentDescription as FieldError).message
              : " "
          }
        />
      </Grid>
    </>
  );
};

export default ReportReturnPayment;
