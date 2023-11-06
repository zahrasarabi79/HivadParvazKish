import { IContract } from "@/Interface/Interfaces";
import Icon from "@/Components/Icon";
import DatePickerControler from "@/Components/textFildControler/DatePickerControler";
import NumericFormatControler from "@/Components/textFildControler/NumericFormatControler";
import { TextFildCustom } from "@/Components/textFildControler/TextFiledCustom";
import TextFildControler from "@/Components/textFildControler/textFildControler";
import { useTheme } from "@emotion/react";
import { Divider, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import React from "react";
import { Control, FieldError, FieldErrors, UseFieldArrayRemove } from "react-hook-form";
export interface IReportReturnPaymentProps {
  control: Control<any>;
  errors: FieldErrors<IContract>;
  reportIndex: number;
  paymentIndex: number;
  remove: UseFieldArrayRemove;
}

const ReportReturnPayment: React.FC<IReportReturnPaymentProps> = ({ control, remove, errors, reportIndex, paymentIndex }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery("@media (max-width: 1200px)");
  return (
    <>
      <Grid item xs={mdDown ? 12 : 11.6}>
        <Grid container sx={{ pr: mdDown ? 0 : 2, borderRight: !mdDown ? "1px solid rgba(190,196,209,1)" : 0, borderBottom: mdDown ? "1px solid rgba(190,196,209,1)" : 0 }} spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextFildControler
              inputName={`reports.${reportIndex}.reportsReturnPayment[${paymentIndex}].returnPaymentsbank`}
              control={control}
              requiredRule=""
              required={false}
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
              label={"توضیحات"}
              inputError={!!errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentDescription}
              helperText={
                errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentDescription
                  ? (errors.reports?.[reportIndex]?.reportsReturnPayment?.[paymentIndex]?.returnPaymentDescription as FieldError).message
                  : " "
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={mdDown ? 12 : 0.4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0px !important" }}>
        <IconButton onClick={() => remove(paymentIndex)}>
          <Icon pathName="../icon/Trash.svg" focused={false} />
        </IconButton>
      </Grid>
    </>
  );
};

export default ReportReturnPayment;
