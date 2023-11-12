import { INewUser, Token } from "@/Interface/Interfaces";
import { Button, Grid, IconButton, InputAdornment, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { AxiosError } from "axios";
import { TextFildCustom } from "@/Components/textFildControler/TextFiledCustom";
import Icon from "@/Components/Icon";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
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
                      {showPassword ? <Icon pathName="Bold/eye.svg" /> : <Icon pathName="Bold/eye-slash.svg" />}
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
};
export default LoginForm;
