"use client";
import React, { FC } from "react";
import { Box, useTheme } from "@mui/material";

export interface IconComponentProps {
  pathName: string;
  color?: string;
  size?: string;
  focused?: boolean;
  style?: React.CSSProperties;
}

const Icon: FC<IconComponentProps> = ({ pathName, color = "white", size = "24px", focused, style }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        component="div"
        sx={{
          maskImage: `url(/icon/${pathName})`,
          WebkitMaskImage: `url(/icon/${pathName})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: size,
          backgroundColor: focused ? theme.palette.primary.main : color,
          width: size,
          height: size,
          fontWeight: "100",
          ...style,
        }}
      />
    </>
  );
};

export default Icon;
