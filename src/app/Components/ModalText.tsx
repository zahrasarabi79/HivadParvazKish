import { Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
export interface IModalText {
  xs: number;
  name: string;
  value: string;
}
const ModalText: React.FC<IModalText> = ({ xs, name, value }) => {
  const theme = useTheme();
  return (
    <Grid item xs={xs}>
      <Stack direction={"row-reverse"} sx={{ borderBottom: "1px solid #6B6B6B", justifyContent: "left", py: 1, px: 1, marginX: 1, marginY: 1 }}>
        <Typography variant="body1" sx={{ color: theme.palette.divider, opacity: "85%" }}>
          :{name}
        </Typography>
        <Typography variant="body1" sx={{ ml: 1 }}>
          {value}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default ModalText;
