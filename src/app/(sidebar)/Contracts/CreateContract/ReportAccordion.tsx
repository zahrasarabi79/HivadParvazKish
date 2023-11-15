import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Grid, IconButton, Stack, Typography, useTheme } from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import Icon from "@/Components/Icon";
import { FieldError, useFieldArray, useWatch } from "react-hook-form";
import { IContract, IReportAccordionProps } from "@/Interface/Interfaces";
import ReportPayment from "./ReportPayment";
import ReportReturnPayment from "./ReportReturnPayment";
import React, { useEffect, useState } from "react";
import TextFildControler from "@/Components/textFildControler/textFildControler";
import NumericFormatControler from "@/Components/textFildControler/NumericFormatControler";

const ReportAccordion: React.FC<IReportAccordionProps> = ({ submitCount, IsReturnPathName, isExpended, handleIsExpended, removeReport, control, errors, reportIndex }) => {
  const theme = useTheme();
  const {
    fields: reportsPaymentFields,
    append: appendReportsPayment,
    remove: removeReportsPayment,
  } = useFieldArray<IContract>({
    control,
    name: `reports.${reportIndex}.reportsPayment`,
  });

  const {
    fields: reportsReturnPaymentFields,
    append: appendReportsReturnPayment,
    remove: removeReportsReturnPayment,
  } = useFieldArray<IContract>({
    control,
    name: `reports.${reportIndex}.reportsReturnPayment`,
  });
  const [accordionError, setaccordionError] = useState<number[]>([]);
  const removeReports = (indexToRemove: number) => {
    removeReport(indexToRemove);
  };
  
  // show error in Accordion summary
  useEffect(() => {
    if (errors?.reports && errors?.reports[reportIndex]) {
      setaccordionError((prevIndexes: number[]) => [...prevIndexes, reportIndex]);
    }
  }, [errors, submitCount]);
  console.log(accordionError);

  const Describtion = useWatch({ control, name: `reports.${reportIndex}.reportDescription` });
  const totalcost = useWatch({ control, name: `reports.${reportIndex}.totalCost` });

  //* we can not use watch and instead of it ,we use "useWatch"
  //* const Describtion2 = watch(`reports.${reportIndex}.reportDescription`);

  return (
    <>
      <Accordion
        expanded={isExpended}
        onChange={handleIsExpended}
        sx={{
          marginY: 2,
          boxShadow: "none",
          justifyContent: "inherit",
          "&:before": { backgroundColor: "transparent" },
        }}
      >
        <AccordionSummary
          dir="rtl"
          sx={{
            display: "flex",
            bgcolor: "#363448",
            boxShadow: "none",
            borderRadius: "0.5rem",
            justifyContent: "inherit",
            border: accordionError.includes(reportIndex) ? "2px solid red" : "none",
            "&.Mui-expanded": {
              bgcolor: "#4B495c",
              borderBottom: accordionError.includes(reportIndex) ? "2px solid red" : "2px solid  #FF661F",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
              minHeight: "auto",
            },
            "& .MuiAccordionSummary-content": {
              justifyContent: "space-between",
              alignItems: "center",
              "&.Mui-expanded": { marginY: 2, mx: 1 },
            },
          }}
          expandIcon={<ExpandCircleDownOutlinedIcon />}
        >
          <Typography>{Describtion || "شرح و مشخصات"}</Typography>
          {isExpended && !IsReturnPathName && (
            <Stack direction="row" gap={1}>
              <IconButton onClick={() => removeReports(reportIndex)}>
                <Icon pathName="../icon/Trash.svg" focused={false} />
              </IconButton>
            </Stack>
          )}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#363448",
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <Grid container spacing={1} rowSpacing={3} alignItems={"center"} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={4}>
              <TextFildControler
                inputName={`reports.${reportIndex}.reportDescription`}
                control={control}
                IsReturnPathName={IsReturnPathName}
                label="شرح و مشخصات"
                inputError={!!errors.reports?.[reportIndex]?.reportDescription}
                helperText={errors.reports?.[reportIndex]?.reportDescription ? (errors.reports?.[reportIndex]?.reportDescription as FieldError).message : " "}
              />

              {/* <Controller
                name={`reports.${reportIndex}.reportDescription`}
                control={control}
                rules={{ required: "این فیلدالزامی است." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    disabled={IsReturnPathName}
                    onBlur={() => setFormDataChanged(true)}
                    required
                    fullWidth
                    label={"شرح مشخصات"}
                    error={!!errors.reports?.[reportIndex]?.reportDescription}
                    helperText={errors.reports?.[reportIndex]?.reportDescription ? (errors.reports?.[reportIndex]?.reportDescription as FieldError).message : " "}
                  />
                )}
              /> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFildControler
                inputName={`reports.${reportIndex}.presenter`}
                control={control}
                IsReturnPathName={IsReturnPathName}
                label="مجری"
                inputError={!!errors.reports?.[reportIndex]?.presenter}
                helperText={errors.reports?.[reportIndex]?.presenter ? (errors.reports?.[reportIndex]?.presenter as FieldError).message : " "}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <NumericFormatControler
                inputName={`reports.${reportIndex}.totalCost`}
                control={control}
                IsReturnPathName={IsReturnPathName}
                label={"قیمت کل (ریال)"}
                inputError={!!errors.reports?.[reportIndex]?.totalCost}
                helperText={errors.reports?.[reportIndex]?.totalCost ? (errors.reports?.[reportIndex]?.totalCost as FieldError).message : " "}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ p: 1 }}>
                پرداخت ها
              </Typography>
              <Divider />
            </Grid>

            {reportsPaymentFields.map((reportPayment, index) => (
              <ReportPayment
                key={reportPayment.id}
                control={control}
                errors={errors}
                reportIndex={reportIndex}
                paymentIndex={index}
                IsReturnPathName={IsReturnPathName}
                remove={removeReportsPayment}
              />
            ))}
            {!IsReturnPathName && (
              <Grid
                item
                xs={12}
                onClick={() =>
                  appendReportsPayment({
                    bank: "",
                    payments: "",
                    datepayment: null,
                    paymentDescription: "",
                  })
                }
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button>
                  <Stack justifyContent={"center"} alignItems={"center"}>
                    <Icon color={theme.palette.primary.main} pathName="addBtn.svg" size="40px" />
                    <Typography variant="body1">افزودن پرداخت ها</Typography>
                  </Stack>
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ p: 1 }}>
                برگشت ها
              </Typography>
              <Divider />
            </Grid>

            {reportsReturnPaymentFields.map((reportReturnPayment, index) => (
              <ReportReturnPayment key={reportReturnPayment.id} control={control} errors={errors} reportIndex={reportIndex} paymentIndex={index} remove={removeReportsReturnPayment} />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            onClick={() => {
              appendReportsReturnPayment({
                returnPaymentsbank: "",
                returnPayments: "",
                dateReturnPayment: null,
                returnPaymentDescription: "",
              });
            }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button>
              <Stack justifyContent={"center"} alignItems={"center"}>
                <Icon color={theme.palette.primary.main} pathName="addBtn.svg" size="40px" />
                <Typography variant="body1">افزودن برگشت وجه</Typography>
              </Stack>
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ReportAccordion;
