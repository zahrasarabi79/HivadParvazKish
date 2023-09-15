"use client";
import { TextFildCustom } from "@/app/Components/TextFiledCustom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Icon from "@/app/Components/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";
const CreateContract = () => {
  return (
    <Card>
      <CardHeader title={"ایجاد قرارداد"} />
      <Divider variant="middle" />
      <CardContent>
        <Grid container spacing={3} alignItems={"center"}>
          <Grid item xs={4}>
            <TextFildCustom fullWidth label={"شماره قرارداد"} />
          </Grid>
          <Grid item xs={4}>
            <TextFildCustom fullWidth label={"تاریخ قرارداد"} />
          </Grid>
          <Grid item xs={4}>
            <TextFildCustom fullWidth label={"نوع قرارداد"} />
          </Grid>
          <Grid item xs={4}>
            <TextFildCustom fullWidth label={"طرف قرارداد"} />
          </Grid>
          <Grid item xs={0.25}>
            <Button sx={{ height: 50 }} fullWidth color="primary" variant="outlined">
              <AddRoundedIcon />
            </Button>
          </Grid>
        </Grid>
        <Accordion
          sx={{
            marginY: 2,
            "&:before": { backgroundColor: "transparent" },
          }}
        >
          <AccordionSummary
            dir="rtl"
            sx={{
              bgcolor: "#4B495c",
              borderRadius: "0.5rem",
              justifyContent: "space-between",
              "&.Mui-expanded": {
                borderBottom: "2px solid #FF7535",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                borderBottomLeftRadius: "0", // Set bottom-left radius to 0 when expanded
                borderBottomRightRadius: "0",
                minHeight: "auto",
              },
            }}
            expandIcon={<ExpandCircleDownOutlinedIcon />}
          >
            <DeleteIcon />
            <Typography>شرح مشخصات</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} alignItems={"center"} sx={{ my: 1 }}>
              <Grid item xs={4}>
                <TextFildCustom fullWidth label={"شرح مشخصات"} />
              </Grid>
              <Grid item xs={4}>
                <TextFildCustom fullWidth label={"مجری"} />
              </Grid>
              <Grid item xs={4}>
                <TextFildCustom fullWidth label={"نوع قرارداد"} />
              </Grid>
              <Grid item xs={12}>
                <TextFildCustom fullWidth label={"توضیحات"} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <CardActions dir="ltr">
        <Button variant="contained" color="primary">
          ثبت
        </Button>
      </CardActions>
      {/* <CardContent sx={{ height: "600px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">در حال حاضر درخواستی وجود ندارد</Typography>
        <Image src={"/icon/Vector.svg"} width={400} height={400} alt="Vector" />
      </CardContent> */}
    </Card>
  );
};

export default CreateContract;
