import axiosInstance from "@/AxiosInstance/AxiosInstance";
import { IChangePassFormValues } from "@/Interface/Interfaces";
import { Button, Grid, IconButton, InputAdornment, Stack, Typography, useTheme } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { UseFormClearErrors, useForm } from "react-hook-form";
import { TextFildCustom } from "../Components/textFildControler/TextFiledCustom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Icon from "../Components/Icon";
import { DateValidationError } from "@mui/x-date-pickers";

const ProfileForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    clearErrors,
    setError,
  } = useForm<IChangePassFormValues>({ mode: "onChange" });
  const WatchFilds = Object.values(watch()).every((value) => value);
  const theme = useTheme();
  const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((show) => !show);
  };
  const onSubmit = (data: IChangePassFormValues) => {
    getResponse(data);
  };
  const getResponse = async (user: IChangePassFormValues) => {
    try {
      const { data } = await axiosInstance.post("/updatepassword", user);
      console.log(data.message);
      router.push("/Contracts/ContractList");
    } catch (error: AxiosError | any) {
      if (error.response.data.error === "رمز عبور معتبر نیست") {
        setError("oldPassword", { message: error.response.data.error });
      }
    }
  };
  const validateNewPassword = (value: string, oldPassword: string, repeatPassword: string, setError: any, clearErrors: UseFormClearErrors<IChangePassFormValues>) => {
    if (value === oldPassword) {
      return "رمز عبور تکراری است";
    }
    if (value !== repeatPassword && !!repeatPassword.length) {
      setError("repeatPassword", { type: "text", message: "تکرار رمز عبور مطابقت ندارد" });
    } else {
      clearErrors("repeatPassword");
    }

    if (value.length < 8) {
      return "رمز عبور نباید کمتر از 8 کاراکتر باشد";
    }

    if (!/[a-z]/.test(value)) {
      return "رمز عبور باید حداقل یک حرف کوچک داشته باشد";
    }

    if (!/[A-Z]/.test(value)) {
      return "رمز عبور باید حداقل یک حرف بزرگ داشته باشد";
    }

    if (!/[0-9]/.test(value)) {
      return "رمز عبور باید حداقل یک عدد داشته باشد";
    }

    if (!/[^A-Za-z0-9]/.test(value)) {
      return "رمز عبور باید حداقل یک کاراکتر خاص (غیر حروف و عدد) داشته باشد";
    }

    if (value.length > 20) {
      return "رمز عبور نباید بیشتر از 20 کاراکتر باشد";
    }

    return true; // Valid password
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
        <Grid dir="rtl" container spacing={2}>
          <Grid item xs={12}>
            <TextFildCustom
              fullWidth
              required
              label={"رمز عبور فعلی"}
              error={!!errors.oldPassword}
              helperText={
                (errors.oldPassword && errors.oldPassword.message) ||
                (errors.oldPassword?.type === "minLength" ? "رمز عبور نباید کمتر از 8 کاراکتر باشد" : errors.oldPassword?.type === "maxLength" ? "رمز عبور نباید بیشتر از 20 کاراکتر باشد" : " ")
              }
              type={showPassword ? "text" : "password"}
              {...register("oldPassword", {
                minLength: 8,
                maxLength: 20,
                required: "این فیلد الزامی است",
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
          <Grid item xs={12}>
            <TextFildCustom
              fullWidth
              required
              label={"رمز عبور جدید"}
              helperText={(!!errors.newPassword && errors.newPassword.message) || " "}
              error={!!errors.newPassword}
              type={showPassword ? "text" : "password"}
              {...register("newPassword", { required: "این فیلد الزامی است", validate: (value) => validateNewPassword(value, watch("oldPassword"), watch("repeatPassword"), setError, clearErrors) })}
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
              required
              label={"تکرار رمز عبور جدید"}
              helperText={errors.repeatPassword?.message}
              error={!!errors.repeatPassword}
              type={showPassword ? "text" : "password"}
              {...register("repeatPassword", {
                validate: (value) => {
                  if (value !== watch("newPassword")) {
                    return " تکرار رمز عبور مطابقت ندارد";
                  }
                  if (!value) {
                    return "این فیلد الزامی است";
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
            <Button type="submit" fullWidth variant="contained" sx={{ height: "40px", bgcolor: WatchFilds ? theme.palette.primary.main : "default", boxShadow: "none" }}>
              ثبت
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default ProfileForm;
