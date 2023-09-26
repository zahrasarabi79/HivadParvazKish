import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Divider, Grid, Stack } from "@mui/material";
import ModalText from "@/app/Components/ModalText";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1136px",
  bgcolor: "background.paper",
  p: 2,
  borderRadius: 2,
  m: 0,
};
export interface IKeepMountedModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

const KeepMountedModal: React.FC<IKeepMountedModalProps> = ({ open, handleClose, handleOpen }) => {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Container>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style} justifyContent={"center"} alignContent={"center"}>
            <Grid sx={{ pb: "32px", px: "8px" }} spacing={4} container>
              <Grid item xs={12}>
                <Typography variant="h6">گزارش خرید </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4} justifyContent={"space-between"}>
                  <ModalText xs={4} name="شماره قراداد" value="1345" />
                  <ModalText xs={4} name="تاریخ قراداد" value="1345" />
                  <ModalText xs={4} name="نوع قرارداد" value="1345" />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ModalText xs={12} name="طرف قرارداد" value="1345" />
              </Grid>
              <Grid sx={{ padding: 1, m: 2 }} item xs={12}>
                <Grid  sx={{ border: "1px solid white", borderRadius: 1, padding: 2 }} container justifyContent={"space-between"}>
                  <ModalText xs={4} name="قیمت کل" value="1345" />
                  <ModalText xs={4} name="مجری" value="1345" />
                  <ModalText xs={4} name="شرح و مشخصات" value="1345" />
                  <Grid item xs={12} sx={{ my: 2, mx: 1 }}>
                    <Typography variant="h6">پرداخت ها</Typography>
                  </Grid>
                  <Grid sx={{ borderLeft: "2px solid white", ml: 2, mb:0, mt:0 }} container justifyContent={"space-between"}>
                    <ModalText xs={4} name="تاریخ پرداخت/دریافت" value="1345" />
                    <ModalText xs={4} name="مبلغ پرداختی/دریافتی" value="1345" />
                    <ModalText xs={4} name="بانک /شرکاء/صندوق" value="1345" />
                    <ModalText xs={12} name="توضیحات" value="1345" />
                  </Grid>
                  <Grid item xs={12} sx={{ m: 2 }}>
                    <Typography variant="h6">بازگشت ها</Typography>
                  </Grid>

                  <Grid sx={{ borderLeft: "2px solid white", ml: 2, mb: 3, mt:0 }} container justifyContent={"space-between"}>
                    <ModalText xs={4} name="شرح و مشخصات" value="1345" />
                    <ModalText xs={4} name="مجری" value="1345" />
                    <ModalText xs={4} name="بانک /شرکاء/صندوق" value="1345" />
                    <ModalText xs={12} name="توضیحات" value="1345" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default KeepMountedModal;
