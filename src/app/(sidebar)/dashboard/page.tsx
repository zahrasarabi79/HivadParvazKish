"use client";
import { Grid } from "@mui/material";
import useAuth from "../../../Utils/Hooks/authentication";
import SideBar from "./SideBar";


export default function page() {
  useAuth();

  return (
    <Grid direction={"row-reverse"} container>
      <Grid item xs={12}>
        <SideBar />
      </Grid>
    </Grid>
  );
}
