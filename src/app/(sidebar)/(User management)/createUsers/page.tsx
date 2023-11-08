"use client";
import { useEffect } from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, MenuItem, useTheme } from "@mui/material";
import TextFildControler from "@/Components/textFildControler/textFildControler";
import { FieldError, useForm } from "react-hook-form";
import SelectTextFildControler from "@/Components/textFildControler/SelectTextFildControler";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/SnackbarContext";
import SnackBar from "@/Components/SnackBar";
import { AxiosError } from "axios";
import { IUserApiResponse } from "../usersList/page";
export interface IUser {
  name: string;
  username: string;
  password: string;
  role: string;
}
export interface ICreateUsersProps {
  user: IUserApiResponse | undefined;
}
const CreateUsers: React.FC<ICreateUsersProps> = ({ user }) => {
  const theme = useTheme();
  const router = useRouter();
  const { state, openSnackbar, closeSnackbar } = useSnackbar();
  const typeOfReport = ["کارمند", "مدیر"];
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IUser>({ mode: "onChange" });
  const onSubmit = (data: IUser) => {
    if (user) {
      updateUser(data, user?.id);
    } else {
      saveUser(data);
    }
  };
  const doesNotContainEnglishChars = (value: string) => {
    const englishCharsRegex = /^[a-z@#$%^&*]+[a-z0-9@#$%^&*.]*$/i;
    if (!englishCharsRegex.test(value)) {
      return "کاراکتر نامعتبر می باشد";
    } else {
      return true;
    }
  };
  const updateUser = async (user: IUser, id: number | undefined) => {
    try {
      await axiosInstance.post("/updateUser", { ...user, id });
      openSnackbar("کاربر با موفقیت ایجاد شد.", "rgb(11, 150, 30)");
      setTimeout(() => {
        router.push("/usersList");
      }, 2000);
    } catch (error: AxiosError | any) {
      if (error.response.data.error === "کاربر وجود ندارد") {
        openSnackbar(error.response.data.error, theme.palette.error.main);

        setError("username", { message: error.response.data.error });
      }
      if (error.response.data.error === "رمز عبور تکراری است") {
        setError("password", { message: error.response.data.error });
      } else {
        openSnackbar("سرور پاسخگو نیست", theme.palette.error.main);
      }
    }
  };
  const saveUser = async (user: IUser) => {
    try {
      await axiosInstance.post("/AddUsers", user);
      openSnackbar("کاربر با موفقیت ایجاد شد.", "rgb(11, 150, 30)");
      setTimeout(() => {
        router.push("/usersList");
      }, 2000);
    } catch (error: AxiosError | any) {
      if (error.response.data.error === "نام کاربری معتبر نمی باشد") {
        setError("username", { message: error.response.data.error });
      }
      if (error.response.data.error === "کاربر مجاز به ایجاد کاربر جدید نیست") {
        openSnackbar(error.response.data.error, theme.palette.warning.main);
      } else {
        openSnackbar("سرور پاسخگو نیست", theme.palette.error.main);
      }
    }
  };
  useEffect(() => {
    if (user) {
      reset({
        name: user?.name,
        username: user?.username,
        role: user?.role,
      });
    }
  }, [user]);
  return (
    <Card>
      <CardHeader title={user ? "ویرایش کاربر" : "ایجاد کاربر"} />
      <Divider variant="middle" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextFildControler inputName="name" control={control} label={"نام و نام خانوادگی"} inputError={!!errors.name} helperText={errors.name ? (errors.name as FieldError).message : " "} />
            </Grid>
            <Grid item xs={6}>
              <TextFildControler
                inputName="username"
                control={control}
                label={"نام کاربری"}
                inputError={!!errors.username}
                helperText={errors.username && errors.username.message}
                validateValue={doesNotContainEnglishChars}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFildControler
                inputName="password"
                control={control}
                label={"رمز عبور"}
                inputError={!!errors.password}
                helperText={
                  (errors.password && errors.password.message) ||
                  (errors.password?.type === "minLength" ? "رمز عبور نباید کمتر از 6 کاراکتر باشد" : errors.password?.type === "maxLength" ? "رمز عبور نباید بیشتر از 8 کاراکتر باشد" : " ")
                }
                length={{ maxLength: 8, minLength: 6 }}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectTextFildControler
                inputName="role"
                control={control}
                defaultValue="کارمند"
                label="نقش"
                inputError={!!errors.role}
                helperText={errors.role ? (errors.role as FieldError).message : " "}
              >
                {typeOfReport.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </SelectTextFildControler>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions dir="ltr">
          <Button type="submit" variant="contained" color="primary">
            ثبت
          </Button>
        </CardActions>
      </form>

      {state.isOpen && <SnackBar horizontal={"center"} vertical={"top"} message={state.message} isOpen={state.isOpen} handleClose={closeSnackbar} color={state.color} />}
    </Card>
  );
};

export default CreateUsers;
