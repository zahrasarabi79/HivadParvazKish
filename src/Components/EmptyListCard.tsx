import { CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
export interface IEmptyListCardContentProps {
  cardContentTitle: string;
}
const EmptyListCardContent: React.FC<IEmptyListCardContentProps> = ({ cardContentTitle }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <CardContent sx={{ minHeight: "72vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h6">{cardContentTitle}</Typography>
      <Image src={"/icon/Vector.svg"} width={mdUp ? 400 : 300} height={mdUp ? 400 : 300} alt="Vector" />
    </CardContent>
  );
};

export default EmptyListCardContent;
