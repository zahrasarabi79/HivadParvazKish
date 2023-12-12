"use client";
import { useEffect } from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, MenuItem, useTheme } from "@mui/material";
import TextFildControler from "@/Components/textFildControler/textFildControler";
import { FieldError, useForm } from "react-hook-form";
import SelectTextFildControler from "@/Components/textFildControler/SelectTextFildControler";
import { useRouter } from "next/navigation";
import SnackBar from "@/Components/SnackBar";
import { AxiosError } from "axios";
import { ICreateUsersProps, IUser } from "@/Interface/Interfaces";
import { useCreateUserMutation, useUpdateUserMutation } from "@/Services/Api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { openSnackbar } from "@/redux/slices/snackbarSlice";

const CreateUsers: React.FC<ICreateUsersProps> = ({ user }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const typeOfReport = ["کارمند", "مدیر"];
  const { color, isOpen, message } = useAppSelector((state) => state.snackbarState);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<IUser>({ mode: "onChange" });

  const onSubmit = (data: IUser) => {
    if (user) {
      updateUsers(data, user?.id);
    } else {
      saveUser(data);
    }
  };
  const validateUsername = (value: string) => {
    const englishCharsRegex = /^[a-z0-9@#$%^&*]+[a-z0-9@#$%^&*.]*$/i;
    if (!englishCharsRegex.test(value)) {
      return "کاراکتر نامعتبر می باشد";
    } else if (englishCharsRegex.test(value) && value.length < 8) {
      console.log(englishCharsRegex.test(value) && value.length < 8);
      return "رمز عبور نباید کمتر از 8 کاراکتر باشد";
    } else if (englishCharsRegex.test(value) && value.length > 40) {
      return "رمز عبور نباید بیشتر از 20 کاراکتر باشد";
    } else {
      return true;
    }
  };
  const validateNewPassword = (value: string) => {
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
  const updateUsers = async (user: IUser, id: number | undefined) => {
    try {
      await updateUser({ ...user, id }).unwrap();
      setTimeout(() => {
        router.push("/usersList");
      }, 2000);
    } catch (error: AxiosError | any) {
      if (error.response.data.error === "کاربر وجود ندارد") {
        dispatch(openSnackbar({ color: theme.palette.warning.main, message: error.response.data.error }));
        setError("username", { message: error.response.data.error });
      }
      if (error.response.data.error === "رمز عبور تکراری است") {
        setError("password", { message: error.response.data.error });
      } else {
        dispatch(openSnackbar({ color: theme.palette.error.main, message: "سرور پاسخگو نیست" }));
      }
    }
  };
  const saveUser = async (user: IUser) => {
    try {
      await createUser(user).unwrap();
      setTimeout(() => {
        router.push("/usersList");
      }, 2000);
    } catch (error: AxiosError | any) {
      if (error.response.data.error === "نام کاربری معتبر نمی باشد") {
        setError("username", { message: error.response.data.error });
      }
      if (error.response.data.error === "کاربر مجاز به ایجاد کاربر جدید نیست") {
        dispatch(openSnackbar({ color: theme.palette.warning.main, message: error.response.data.error }));
      } else {
        dispatch(openSnackbar({ color: theme.palette.error.main, message: "سرور پاسخگو نیست" }));
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
              <TextFildControler
                inputName="name"
                control={control}
                label={"نام و نام خانوادگی"}
                inputError={!!errors.name}
                helperText={errors.name ? (errors.name as FieldError).message : " "}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFildControler
                inputName="username"
                control={control}
                label={"نام کاربری"}
                inputError={!!errors.username}
                helperText={errors.username ? errors.username.message : " "}
                validateValue={validateUsername}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFildControler
                requiredRule={!user && "این فیلد الزامی است"}
                required={!user}
                inputName="password"
                control={control}
                label={"رمز عبور"}
                inputError={!!errors.password}
                helperText={
                  (errors.password && errors.password.message) ||
                  (errors.password?.type === "minLength"
                    ? "رمز عبور نباید کمتر از 8 کاراکتر باشد"
                    : errors.password?.type === "maxLength"
                    ? "رمز عبور نباید بیشتر از 8 کاراکتر باشد"
                    : " ")
                }
                validateValue={
                  !user ? validateNewPassword : watch("password")?.length ? validateNewPassword : () => true
                }
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
      {isOpen && <SnackBar horizontal={"center"} vertical={"top"} message={message} isOpen={isOpen} color={color} />}
    </Card>
  );
};

export default CreateUsers;
