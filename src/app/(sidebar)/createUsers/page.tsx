"use client";
import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Grid, MenuItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import TextFildControler from "@/Components/textFildControler/textFildControler";
import { FieldError, useForm } from "react-hook-form";
import SelectTextFildControler from "@/Components/textFildControler/SelectTextFildControler";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import axiosInstance from "@/Services/Api/AxiosInstance";
import { useRouter } from "next/navigation";
interface IUser {
  name: string;
  username: string;
  password: string;
  role: string;
}
const CreateUsers = () => {
  const theme = useTheme();
  const router = useRouter();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [loading, setLoading] = useState(false);
  const typeOfReport = ["کارمند", "مدیر"];
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    saveUser(data);
  };
  const saveUser = async (user: IUser) => {
    try {
      await axiosInstance.post("/AddUsers", user);
      console.log("dddddd");
      // handleCloseSnackBar();
      // setTimeout(() => {
      //   router.push("/Contracts/ContractList");
      // }, 2000);
    } catch (error) {
      console.log("errors");
      // handleCloseSnackBarServer();
    }
  };
  return (
    <Card>
      <CardHeader title={"ایجاد کاربر"} />
      <Divider variant="middle" />
      {loading ? (
        <Grid container>
          <Grid item xs={12} sx={{ margin: 10, display: "flex", justifyContent: "center", alignContent: "center" }}>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextFildControler
                  inputName="name"
                  control={control}
                  label={"نام و نام خانوادگی"}
                  inputError={!!errors.numContract}
                  helperText={errors.numContract ? (errors.numContract as FieldError).message : " "}
                />
              </Grid>
              <Grid item xs={6}>
                <TextFildControler
                  inputName="username"
                  control={control}
                  label={"نام کاربری"}
                  inputError={!!errors.numContract}
                  helperText={errors.numContract ? (errors.numContract as FieldError).message : " "}
                />
              </Grid>
              <Grid item xs={6}>
                <TextFildControler
                  inputName="password"
                  control={control}
                  label={"رمز عبور"}
                  inputError={!!errors.numContract}
                  helperText={errors.numContract ? (errors.numContract as FieldError).message : " "}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectTextFildControler
                  inputName="role"
                  control={control}
                  defaultValue="کارمند"
                  label="نقش"
                  inputError={!!errors.typeContract}
                  helperText={errors.typeContract ? (errors.typeContract as FieldError).message : " "}
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
      )}
    </Card>
  );
};

export default CreateUsers;
