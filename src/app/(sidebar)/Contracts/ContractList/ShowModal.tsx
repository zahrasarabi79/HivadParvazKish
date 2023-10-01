import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Divider, Grid, Stack, Theme, createStyles, useTheme } from "@mui/material";
import ModalText from "@/app/Components/ModalText";
import {
  IContract,
  IContractApiResponse,
  IReportPaymentApiResponse,
  IReportReturnPaymentApiResponse,
  IReportsApiResponse,
} from "@/Interface/Interfaces";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1136px",
  bgcolor: "background.paper",
  p: 2,
  maxHeight: "80%",
  borderRadius: 2,
  m: 0,

  overflowY: "auto",
  overflowX: "hidden",
  scrollbarColor: "#6b6b6b #2b2b2b",
  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    backgroundColor: "#2b2b2b",
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    borderRadius: 0,
    backgroundColor: "#6b6b6b",
    minHeight: 24,
  },
  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    backgroundColor: "#2b2b2b",
  },
};

export interface IKeepMountedModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  data: IContractApiResponse;
}

const KeepMountedModal: React.FC<IKeepMountedModalProps> = ({ open, handleClose, data }) => {
  return (
    <React.Fragment>
      <Container>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style} justifyContent={"center"} alignContent={"center"}>
            <Grid sx={{ pb: "32px", px: "8px" , }} spacing={4} container>
              <Grid item xs={12}>
                <Typography variant="h6">گزارش خرید </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4} justifyContent={"space-between"}>
                  <ModalText xs={4} name="شماره قراداد" value={data?.numContract || ""} />
                  <ModalText xs={4} name="تاریخ قراداد" value={new Date(data?.dateContract || "").toLocaleDateString("fa")} />
                  <ModalText xs={4} name="نوع قرارداد" value={data?.typeContract || ""} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ModalText xs={12} name="طرف قرارداد" value={data?.customer || ""} />
              </Grid>
              {data?.reports?.map((report: IReportsApiResponse) => (
                <React.Fragment key={report.id}>
                  <Grid sx={{ padding: 1, m: 2 }} item xs={12}>
                    <Grid sx={{ border: "1px solid rgba(107,107,107,1)", borderRadius: 1, padding: 2 }} container justifyContent={"space-between"}>
                      <ModalText xs={12} name="شرح و مشخصات" value={report?.reportDescription} />
                      <ModalText xs={6} name="قیمت کل" value={report?.totalCost} />
                      <ModalText xs={6} name="مجری" value={report?.presenter} />
                      <Grid item xs={12} sx={{ my: 2, mx: 1 }}>
                        <Typography variant="h6">پرداخت ها</Typography>
                      </Grid>
                      {report.reportsPayment.map((reportPayment: IReportPaymentApiResponse) => (
                        <React.Fragment key={reportPayment.id}>
                          <Grid sx={{ borderLeft: "2px solid white", ml: 2, mb: 3, mt: 0 }} container justifyContent={"space-between"}>
                            <ModalText xs={12} name="تاریخ پرداخت/دریافت" value={new Date(reportPayment.datepayment).toLocaleDateString("fa")} />
                            <ModalText xs={6} name="مبلغ پرداختی/دریافتی" value={reportPayment.payments} />
                            <ModalText xs={6} name="بانک /شرکاء/صندوق" value={reportPayment.bank} />
                            <ModalText xs={12} name="توضیحات" value={reportPayment.paymentDescription} />
                          </Grid>
                        </React.Fragment>
                      ))}

                      <Grid item xs={12} sx={{ my: 2, mx: 1 }}>
                        <Typography variant="h6">بازگشت ها</Typography>
                      </Grid>
                      {report?.reportsReturnPayment.map((reportReturnPayment: IReportReturnPaymentApiResponse) => (
                        <React.Fragment key={reportReturnPayment.id}>
                          <Grid sx={{ borderLeft: "2px solid white", ml: 2, mb: 3, mt: 0 }} container justifyContent={"space-between"}>
                            <ModalText
                              xs={12}
                              name="تاریخ برگشت از خرید"
                              value={new Date(reportReturnPayment.dateReturnPayment).toLocaleDateString("fa")}
                            />
                            <ModalText xs={6} name="مبلغ برگشت از خرید" value={reportReturnPayment.returnPayments} />
                            <ModalText xs={6} name="بانک /شرکاء/صندوق" value={reportReturnPayment.returnPaymentsbank} />
                            <ModalText xs={12} name="توضیحات" value={reportReturnPayment.returnPaymentDescription} />
                          </Grid>
                        </React.Fragment>
                      ))}
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
