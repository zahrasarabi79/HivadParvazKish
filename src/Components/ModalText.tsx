import { Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
export interface IModalText {
  xs: number;
  sm?: number;
  name: string;
  value: string;
}
const ModalText: React.FC<IModalText> = ({ xs, sm = 12, name, value }) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid item xs={xs} sm={sm}>
      <Stack direction={"row-reverse"} sx={{ borderBottom: "1px solid #6B6B6B", justifyContent: "left", py: smUp ? 1 : 0, px: smUp ? 1 : 0, margin: smUp ? 1 : 0 }}>
        <Typography variant="body1" sx={{ color: theme.palette.divider, opacity: "85%", whiteSpace: "nowrap" }}>
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
