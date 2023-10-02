import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import Icon from "@/app/Components/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, FieldError, useFieldArray, useWatch } from "react-hook-form";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import { IContract, IReportAccordionProps, IReports } from "@/Interface/Interfaces";
import ReportPayment from "./ReportPayment";
import { v4 as uuidv4 } from "uuid";
import ReportReturnPayment from "./ReportReturnPayment";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import SnackBar from "@/app/Components/SnackBar";

const ReportAccordion: React.FC<IReportAccordionProps> = ({
  IsReturnPathName,
  isExpended,
  handleIsExpended,
  removeReport,
  control,
  errors,
  reportIndex,
}) => {
  const theme = useTheme();

  const { fields: reportsPaymentFields, append: appendReportsPayment } = useFieldArray<IContract>({
    control,
    name: `reports.${reportIndex}.reportsPayment`,
  });
  const { fields: reportsReturnPaymentFields, append: appendReportsReturnPayment } = useFieldArray<IContract>({
    control,
    name: `reports.${reportIndex}.reportsReturnPayment`,
  });
  const [isOpenSnackBarDelete, setIsOpenSnackBarDelete] = useState(false);
  const handleCloseSnackBarDelete = () => setIsOpenSnackBarDelete(true);

  const removeReports = (indexToRemove: number) => {
    if (indexToRemove !== 0) {
      removeReport(indexToRemove);
    }
    if (indexToRemove === 0) {
      handleCloseSnackBarDelete();
    }
  };

  const Describtion = useWatch({ control, name: `reports.${reportIndex}.reportDescription` });
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
            "&.Mui-expanded": {
              bgcolor: "#4B495c",
              borderBottom: "2px solid #FF7535",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
              minHeight: "auto",
            },
            "& .MuiAccordionSummary-content": {
              justifyContent: "space-between",
              "&.Mui-expanded": { marginY: 2, mx: 1 },
            },
          }}
          expandIcon={<ExpandCircleDownOutlinedIcon />}
        >
          <Typography>{Describtion || "شرح و مشخصات"}</Typography>
          {isExpended && reportIndex !== 0 && (
            <Stack direction="row" gap={1}>
              <IconButton onClick={() => removeReports(reportIndex)}>
                <DeleteIcon />
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
          <Grid container spacing={3} alignItems={"center"} sx={{ my: 1 }}>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reports.${reportIndex}.reportDescription`}
                control={control}
                rules={{ required: reportIndex === 0 ? "شرح مشخصات الزامی است." : undefined }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    disabled={IsReturnPathName}
                    required
                    fullWidth
                    label={"شرح مشخصات"}
                    error={!!errors.reports?.[reportIndex]?.reportDescription}
                    helperText={
                      errors.reports?.[reportIndex]?.reportDescription
                        ? (errors.reports?.[reportIndex]?.reportDescription as FieldError).message
                        : " "
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reports.${reportIndex}.presenter`}
                control={control}
                defaultValue=""
                rules={{ required: reportIndex === 0 ? " مشخصات مجری الزامی است." : undefined }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    disabled={IsReturnPathName}
                    required
                    fullWidth
                    label={"مجری"}
                    error={!!errors.reports?.[reportIndex]?.presenter}
                    helperText={errors.reports?.[reportIndex]?.presenter ? (errors.reports?.[reportIndex]?.presenter as FieldError).message : " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reports.${reportIndex}.totalCost`}
                control={control}
                defaultValue=""
                rules={{
                  required: reportIndex === 0 ? "قیمت کل الزامی است." : undefined,
                }}
                render={({ field }) => (
                  //*we use Numeric Format librarry for seprated number
                  //* we can not use js function like Number.prototype.toLocaleString()
                  <NumericFormat
                    value={field.value}
                    onValueChange={(v) => {
                      field.onChange(v.value);
                    }}
                    customInput={TextField}
                    thousandSeparator
                    disabled={IsReturnPathName}
                    required
                    fullWidth
                    label={"قیمت کل (ریال)"}
                    error={!!errors.reports?.[reportIndex]?.totalCost}
                    helperText={errors.reports?.[reportIndex]?.totalCost ? (errors.reports?.[reportIndex]?.totalCost as FieldError).message : " "}
                  />
                  // <TextFildCustom
                  //   {...field}
                  //   disabled={IsReturnPathName}
                  //   required
                  //   fullWidth
                  //   type="number"
                  //   label={"قیمت کل"}
                  //   error={!!errors.reports?.[reportIndex]?.totalCost}
                  //   helperText={errors.reports?.[reportIndex]?.totalCost ? (errors.reports?.[reportIndex]?.totalCost as FieldError).message : " "}
                  // />
                )}
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
                key={uuidv4()}
                control={control}
                errors={errors}
                reportIndex={reportIndex}
                paymentIndex={index}
                IsReturnPathName={IsReturnPathName}
              />
            ))}
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
              {!IsReturnPathName && (
                <IconButton>
                  <Icon color={theme.palette.primary.main} pathName="addBtn.svg" size="40px" />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ p: 1 }}>
                برگشت ها
              </Typography>
              <Divider />
            </Grid>
            {reportsReturnPaymentFields.map((reportReturnPayment, index) => (
              <ReportReturnPayment key={uuidv4()} control={control} errors={errors} reportIndex={reportIndex} paymentIndex={index} />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            onClick={() =>
              appendReportsReturnPayment({
                returnPaymentsbank: "",
                returnPayments: "",
                dateReturnPayment: null,
                returnPaymentDescription: "",
              })
            }
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
          <SnackBar
            horizontal={"center"}
            vertical={"top"}
            message={"اجازه حذف این آیتم را ندارید. "}
            handleClose={handleCloseSnackBarDelete}
            isOpen={isOpenSnackBarDelete}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ReportAccordion;
