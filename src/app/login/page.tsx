"use client";
import { useForm } from "react-hook-form";
import { Card, InputAdornment, IconButton, CardContent, Container, Grid, Typography, Button, useTheme } from "@mui/material";
import Image from "next/image";
import { TextFildCustom } from "@/Components/textFildControler/TextFiledCustom";
import { useEffect, useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { INewUser, Token } from "@/Interface/Interfaces";
import { DevTool } from "@hookform/devtools";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <Container component="main" sx={{ justifyContent: "center", alignItems: "center", minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: "sm" }}>
      <Card
        sx={{
          py: 2,
          maxWidth: "439px",
          minHeight: "518px",
          borderRadius: "12px",
        }}
      >
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

function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<INewUser>();
  const WatchFilds = Object.values(watch()).every((value) => value);
  const theme = useTheme();
  const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((show) => !show);
  };
  const onSubmit = (user: INewUser) => {
    getResponse(user);
  };
  const getResponse = async (user: INewUser) => {
    try {
      const { data } = await axiosInstance.post("/login", user);

      await getToken(data);
    } catch (error: AxiosError | any) {
      setError("password", { type: "text", message: "نام کاربری یا پسورد را مجددا وارد کنید." });
    }
  };
  const getToken = async (response: Token) => {
    localStorage.setItem("myToken", response.token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.token}`;
    router.push("/Contracts/ContractList");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid dir="rtl" container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">نام کاربری و رمز عبور خود را وارد نمایید.</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextFildCustom
              error={!!errors.username || !!errors.password}
              helperText={errors.username?.message}
              type="text"
              fullWidth
              label={"نام کاربری"}
              {...register("username", { required: "نام کاربری را وارد کنید." })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFildCustom
              fullWidth
              label={"رمز عبور"}
              helperText={errors.password?.message}
              error={!!errors.password}
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "رمز عبور را وارد کنید." })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" disabled={!WatchFilds} fullWidth variant="contained" sx={{ height: "45px", bgcolor: WatchFilds ? theme.palette.primary.main : "default", boxShadow: "none" }}>
              ورود
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
