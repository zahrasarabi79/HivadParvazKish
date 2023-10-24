import * as React from "react";
import { Modal, Box, Container, Typography, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import ModalText from "@/app/Components/ModalText";
import { IContractApiResponse, IReportPaymentApiResponse, IReportReturnPaymentApiResponse, IReportsApiResponse } from "@/Interface/Interfaces";
import { formatDate } from "@/app/Components/format date";
import { SeparateNumber } from "@/app/Components/SeparateNumber";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
  maxHeight: "80%",
  borderRadius: 2,
  m: 0,

  "@media (max-width: 900px)": {
    width: "90%",
  },

  "@media  (min-width: 901px)": {
    width: "80%",
  },

  overflowY: "auto",
  overflowX: "hidden",

  scrollbarColor: "#6b6b6b #2b2b2b",
  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    backgroundColor: "#2b2b2b",
    width: "4px",
    m: 1,
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    borderRadius: 3,
    backgroundColor: "#6b6b6b",
    minHeight: 24,
  },
  // "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
  //   backgroundColor: "#959595",
  // },
  // "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
  //   backgroundColor: "#959595",
  // },
  // "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
  //   backgroundColor: "#959595",
  // },
  // "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
  //   backgroundColor: "#2b2b2b",
  // },
};

export interface IKeepMountedModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  data: IContractApiResponse;
}

const KeepMountedModal: React.FC<IKeepMountedModalProps> = ({ open, handleClose, data }) => {
  const theme = useTheme();

  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const TypeReportName = data?.typeContract === "فروش" ? "دریافتی" : "پرداختی";
  return (
    <React.Fragment>
      <Container>
        <Modal keepMounted open={open} onClose={handleClose} dir="ltr">
          <Box sx={style} justifyContent={"center"} alignContent={"center"}>
            <Grid sx={{ pb: "32px", px: "8px" }} spacing={4} container>
              <Grid item xs={12}>
                <Typography variant="body1">گزارش {data?.typeContract}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4} justifyContent={"space-between"}>
                  <ModalText xs={12} sm={4} name="شماره قراداد" value={data?.numContract || ""} />

                  {/* <ModalText xs={4} name="تاریخ قراداد" value={new Date(data?.dateContract || "").toLocaleDateString("fa")} /> */}
                  <ModalText xs={12} sm={4} name="تاریخ قراداد" value={formatDate(data?.dateContract || "")} />
                  <ModalText xs={12} sm={4} name="نوع قرارداد" value={data?.typeContract || ""} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ModalText xs={12} name="طرف قرارداد" value={data?.customer || ""} />
              </Grid>
              {data?.reports?.map((report: IReportsApiResponse) => (
                <React.Fragment key={report.id}>
                  <Grid sx={{ padding: smUp ? 1 : 0, m: smUp ? 2 : 0 }} item xs={12}>
                    <Grid sx={{ border: "1px solid rgba(107,107,107,1)", borderRadius: 1, padding: smUp ? "16px" : "16px 8px", gap: smUp ? 0 : 2 }} container justifyContent={"space-between"}>
                      <ModalText xs={12} sm={12} name="شرح و مشخصات" value={report?.reportDescription} />
                      <ModalText xs={12} sm={6} name="قیمت کل" value={SeparateNumber(report?.totalCost)} />
                      <ModalText xs={12} sm={6} name="مجری" value={report?.presenter} />

                      {!!report.reportsPayment.length && (
                        <Grid item xs={12} sx={{ my: 2, mx: 1 }}>
                          <Typography variant="body1">پرداخت ها</Typography>
                        </Grid>
                      )}
                      {report.reportsPayment.map((reportPayment: IReportPaymentApiResponse) => (
                        <React.Fragment key={reportPayment.id}>
                          <Grid sx={{ borderLeft: "2px solid white", ml: smUp ? 2 : 1, mb: 3, mt: 0 }} spacing={smUp ? 0 : 2} container justifyContent={"space-between"}>
                            <ModalText xs={12} name={`تاریخ ${TypeReportName}`} value={formatDate(reportPayment?.datepayment || "")} />
                            <ModalText xs={12} sm={6} name={`مبلغ ${TypeReportName}`} value={SeparateNumber(reportPayment?.payments)} />
                            <ModalText xs={12} sm={6} name="بانک /شرکاء/صندوق" value={reportPayment?.bank} />
                            <ModalText xs={12} name="توضیحات" value={reportPayment?.paymentDescription} />
                          </Grid>
                        </React.Fragment>
                      ))}

                      {!!report?.reportsReturnPayment.length && (
                        <Grid item xs={12} sx={{ my: 2, mx: 1 }}>
                          <Typography variant="body1">بازگشت ها</Typography>
                        </Grid>
                      )}
                      {report?.reportsReturnPayment.map((reportReturnPayment: IReportReturnPaymentApiResponse) => {
                        const Test = SeparateNumber(reportReturnPayment.returnPayments);
                        console.log(Test);

                        return (
                          <React.Fragment key={reportReturnPayment.id}>
                            <Grid sx={{ borderLeft: "2px solid white", ml: smUp ? 2 : 1, mb: 3, mt: 0 }} spacing={smUp ? 0 : 2} container justifyContent={"space-between"}>
                              <ModalText xs={12} name={`تاریخ بازگشت از ${data.typeContract}`} value={formatDate(reportReturnPayment?.dateReturnPayment || "")} />
                              <ModalText sm={6} xs={12} name={`مبلغ بازگشت از ${data.typeContract}`} value={SeparateNumber(reportReturnPayment?.returnPayments)} />
                              <ModalText xs={12} sm={6} name="بانک /شرکاء/صندوق" value={reportReturnPayment?.returnPaymentsbank} />
                              <ModalText xs={12} name="توضیحات" value={reportReturnPayment?.returnPaymentDescription} />
                            </Grid>
                          </React.Fragment>
                        );
                      })}
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Modal>
      </Container>
    </React.Fragment>
  );
};

export default KeepMountedModal;
