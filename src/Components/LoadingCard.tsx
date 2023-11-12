import { CircularProgress, Grid } from "@mui/material";
import React from "react";

const LoadingCard = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ margin: 10, display: "flex", justifyContent: "center", alignContent: "center" }}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default LoadingCard;
