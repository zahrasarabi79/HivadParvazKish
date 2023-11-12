"use client";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <Container component="main" sx={{ justifyContent: "center", alignItems: "center", minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: "sm" }}>
      <Card sx={{ py: 2, maxWidth: "439px", minHeight: "518px", borderRadius: "12px" }}>
        <CardContent>
          <Grid container spacing={"40px"} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Image src="/image/pouyagaranLogo.svg" priority={true} width={71.77} height={71.77} alt="pouyagaran Logo" />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Typography variant="h6">ورود به پنل مدیریت هیواد</Typography>
            </Grid>
            <Grid item xs={12}>
              <LoginForm />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
