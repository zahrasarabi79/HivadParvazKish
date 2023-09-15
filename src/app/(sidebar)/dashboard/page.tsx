import { Button, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Dashboard = () => {
  return (
    <Card>
      <CardHeader
        title={"داشبورد"}
        
      />
      <Divider variant="middle" />
      <CardContent
        sx={{
          height: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">در حال حاضر درخواستی وجود ندارد</Typography>
        <Image src={"icon/Vector.svg"} width={400} height={400} alt="Vector" />
      </CardContent>
    </Card>
  );
};

export default Dashboard;
