"use client";
import { useForm } from "react-hook-form";
import { Card, InputAdornment, IconButton, CardContent, Container, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import { TextFildCustom } from "../Components/TextFiledCustom";
import { useEffect, useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IUser, Token } from "@/Interface/Interfaces";
import { DevTool } from "@hookform/devtools";
import axiosInstance from "@/AxiosInstance/AxiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ justifyContent: "center", alignItems: "center", minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Card
        sx={{
          py: 2,
          maxWidth: "439px",
          minHeight: "518px",
          borderRadius: "24px",
          border: "1px solid white",
        }}
      >
        <CardContent>
          <Grid container spacing={"40px"} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Image src="/image/pouyagaranLogo.svg" priority={true} width={80} height={80} alt="pouyagaran Logo" />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Typography variant="h6">ورود به پنل مدیریت گزارش های هیواد</Typography>
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
    setError,
  } = useForm<IUser>({ defaultValues: { username: "", password: "" } });

  const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((show) => !show);
  };
  const onSubmit = (user: IUser) => {
    getResponse(user);
  };
  const getResponse = async (user: IUser) => {
    try {
      const { data } = await axiosInstance.post("/login", user);
      await getToken(data);
    } catch (error: AxiosError | any) {
      setError("password", { type: "text", message: "نام کاربری یا پسورد را مجددا وارد کنید." });
    }
  };
  const getToken = async (response: Token) => {
    localStorage.setItem("myToken", response.token);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (localStorage.getItem("myToken")) {
      router.push("/dashboard");
    } else {
      localStorage.removeItem("myToken");
    }
  }, []);

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
            <Button type="submit" fullWidth variant="contained" sx={{ height: "45px", bgcolor: "rgba(195, 209, 221, 0.08)", boxShadow: "none" }}>
              ورود
            </Button>
          </Grid>
        </Grid>
      </form>
      <DevTool control={control} />
    </>
  );
}
