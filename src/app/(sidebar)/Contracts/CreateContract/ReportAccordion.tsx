import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, IconButton, Stack, Typography, useTheme } from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Icon from "@/app/Components/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import { Control, Controller, FieldError, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, useFieldArray, useForm } from "react-hook-form";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import { IContract, IReports } from "@/Interface/Interfaces";
import ReportPayment from "./ReportPayment";
import { v4 as uuidv4 } from "uuid";

export interface IReportAccordion {
  report: IReports;
  removeReport: UseFieldArrayRemove;
  appendReport: UseFieldArrayAppend<IContract>;
  isExpended: boolean;
  setIsExpended: (value: boolean) => void;
  description: string;
  control: Control<any>;
  errors: FieldErrors<IContract>;
  reportIndex: number;
}

const ReportAccordion: React.FC<IReportAccordion> = ({
  isExpended,
  setIsExpended,
  description,
  report,
  removeReport,
  control,
  errors,
  reportIndex,
}) => {
  const theme = useTheme();
  const { fields, append, remove } = useFieldArray<IContract>({
    control,
    name: `reports.${reportIndex}.reportsPayment`,
  });
  return (
    <>
      <Accordion
        expanded={isExpended}
        onChange={() => setIsExpended(!isExpended)}
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
          <Typography> {description || "شرح مشخصات"}</Typography>
          {isExpended && (
            <Stack direction={"row"} gap={1}>
              <DeleteIcon />
              <Icon pathName="paymentReturn.svg" />
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
                defaultValue=""
                rules={{ required: "شرح مشخصات را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    name={`reports.${reportIndex}.reportDescription`}
                    required
                    fullWidth
                    label={"شرح مشخصات"}
                    error={!!errors.reports?.[0]?.reportDescription}
                    helperText={errors.reports?.[0]?.reportDescription ? (errors.reports?.[0]?.reportDescription as FieldError).message : " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reports.${reportIndex}.presenter`}
                control={control}
                defaultValue=""
                rules={{ required: " مشخصات مجری را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    name={`report.${reportIndex}.presenter`}
                    required
                    fullWidth
                    label={"مجری"}
                    error={!!errors.reports?.[0]?.presenter}
                    helperText={errors.reports?.[0]?.presenter ? (errors.reports?.[0]?.presenter as FieldError).message : " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reports.${reportIndex}.totalCost`}
                control={control}
                defaultValue=""
                rules={{ required: "قیمت کل را وارد کنید." }}
                render={({ field }) => (
                  <TextFildCustom
                    {...field}
                    name={`report.${reportIndex}.totalCost`}
                    required
                    fullWidth
                    label={"قیمت کل"}
                    error={!!errors.reports?.[0]?.totalCost}
                    helperText={errors.reports?.[0]?.totalCost ? (errors.reports?.[0]?.totalCost as FieldError).message : " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ p: 1 }}>
                پرداخت ها
              </Typography>
              <Divider />
            </Grid>

            {fields.map((reportPayment, index) => (
              <ReportPayment key={uuidv4()} control={control} errors={errors} reportIndex={reportIndex} paymentIndex={index} />
            ))}
            <Grid
              item
              xs={12}
              onClick={() =>
                append({
                  bank: "",
                  payments: "",
                  datepayment: "",
                  paymentDescription: "",
                },)
              }
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton>
                <Icon color={theme.palette.primary.main} pathName="addBtn.svg" size="40px" />
              </IconButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ReportAccordion;
