import { Button, Grid, IconButton, InputAdornment, Stack, Typography, useTheme } from "@mui/material";
import { UseFormClearErrors, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { IChangePassFormValues } from "@/Interface/Interfaces";
import { TextFildCustom } from "@/Components/textFildControler/TextFiledCustom";
import Icon from "@/Components/Icon";
import SnackBar from "@/Components/SnackBar";
import { useSnackbar } from "@/context/ProfileContext/SnackbarContext";
import { useShowPassword } from "@/context/ProfileContext/ShowPassword";

const ProfileForm = () => {
  const router = useRouter();
  const theme = useTheme();
  const { state, openSnackbar, closeSnackbar } = useSnackbar();
  // const { showState, showPassword, hidePassword } = useShowPassword();
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

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowOldPassword((show) => !show);
  };
  const handleClickShowNewPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowNewPassword((show) => !show);
  };
  const handleClickShowRepeatPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowRepeatPassword((show) => !show);
  };

  const onSubmit = (data: IChangePassFormValues) => {
    getResponse(data);
  };

  const getResponse = async (user: IChangePassFormValues) => {
    try {
      const { data } = await axiosInstance.post("/updatepassword", user);
      openSnackbar("رمز با موفقیت تغییر کرد", "rgb(11, 150, 30)");
      setTimeout(() => {
        router.push("/Contracts/ContractList");
      }, 2000);
    } catch (error: AxiosError | any) {
      if (error.response.data.error === "رمز عبور معتبر نیست") {
        setError("oldPassword", { message: error.response.data.error });
      }
      if (error.response.status === 400) {
        openSnackbar("نام کاربری معتبر نمی باشد", theme.palette.error.main);
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
          <IconButton onClick={() => router.push("/Contracts/ContractList")}>
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
              type={showOldPassword ? "text" : "password"}
              {...register("oldPassword", {
                minLength: 8,
                maxLength: 20,
                required: "این فیلد الزامی است",
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showOldPassword ? <Icon pathName="Bold/eye.svg" /> : <Icon pathName="Bold/eye-slash.svg" />}
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
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword", { required: "این فیلد الزامی است", validate: (value) => validateNewPassword(value, watch("oldPassword"), watch("repeatPassword"), setError, clearErrors) })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowNewPassword} edge="end">
                      {showNewPassword ? <Icon pathName="Bold/eye.svg" /> : <Icon pathName="Bold/eye-slash.svg" />}
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
              type={showRepeatPassword ? "text" : "password"}
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
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowRepeatPassword} edge="end">
                      {showRepeatPassword ? <Icon pathName="Bold/eye.svg" /> : <Icon pathName="Bold/eye-slash.svg" />}
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
      {state.isOpen && <SnackBar horizontal={"center"} vertical={"top"} message={state.message} isOpen={state.isOpen} handleClose={closeSnackbar} color={state.color} />}
    </>
  );
};
export default ProfileForm;
