import axiosInstance from "@/AxiosInstance/AxiosInstance";
import { IUser, Token } from "@/Interface/Interfaces";
import { Button, Grid, IconButton, InputAdornment, Stack, Typography, useTheme } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextFildCustom } from "../Components/textFildControler/TextFiledCustom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Icon from "../Components/Icon";

const ProfileForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<IUser>({ defaultValues: { oldPassword: "", password: "" } });
  const WatchFilds = Object.values(watch()).every((value) => value);
  const theme = useTheme();
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
    router.push("/Contracts/ContractList");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack direction={"row"} sx={{ marginY: 3, justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ margin: " 0 auto" }}>
            ویرایش رمز عبور
          </Typography>
          <IconButton>
            <Icon pathName={"../icon/ArrowIcon.svg"} focused={false} color="white" style={{ transform: "rotate(180deg)" }} />
          </IconButton>
        </Stack>
        <Grid dir="rtl" container spacing={5}>
          <Grid item xs={12}>
            <TextFildCustom
              fullWidth
              label={"رمز عبور فعلی"}
              helperText={errors.oldPassword?.message}
              error={!!errors.oldPassword}
              type={showPassword ? "text" : "password"}
              {...register("oldPassword", { minLength: 8, maxLength: 20 })}
              helperText={
                (errors.oldPassword && errors.oldPassword.message) ||
                (errors.oldPassword?.type === "minLength"
                  ? "رمز عبور نباید کمتر از 8 کاراکتر باشد"
                  : errors.oldPassword?.type === "maxLength"
                  ? "رمز عبور نباید بیشتر از 20 کاراکتر باشد"
                  : "رمز عبور وارد شده معتبر نمی باشد") ||
                " "
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFildCustom
              fullWidth
              label={"رمز عبور جدید"}
              helperText={errors.password?.message}
              error={!!errors.password}
              type={showPassword ? "text" : "password"}
              {...register("newPassword", { validate: (value) => validateNewPassword(value, watch("oldPassword"), watch("repeatPassword"), setError, clearErrors) })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFildCustom
              fullWidth
              label={"تکرار رمز عبور جدید"}
              helperText={errors.password?.message}
              error={!!errors.password}
              type={showPassword ? "text" : "password"}
              {...register("repeatPassword", {
                validate: (value) => {
                  if (value !== watch("newPassword")) {
                    return " تکرار رمز عبور مطابقت ندارد";
                  }
                  return true;
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ justifyContent: "center", alignItems: "center" }}>
            <Button type="submit" disabled={!WatchFilds} fullWidth variant="contained" sx={{ height: "40px", bgcolor: WatchFilds ? theme.palette.primary.main : "default", boxShadow: "none" }}>
              ورود
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default ProfileForm;
