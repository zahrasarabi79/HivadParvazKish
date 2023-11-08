"use client";
import { Card, CardContent, Container, Grid } from "@mui/material";
import ProfileForm from "./ProfileForm";
import ProfileProviderContext from "@/context/ProfileContext/ProfileProviderContext";

const Profile = () => {
  return (
    <Container component="main" sx={{ justifyContent: "center", alignItems: "center", minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: "sm" }}>
      <Card sx={{ maxWidth: "445px", height: "445px" }}>
        <CardContent sx={{ margin: "0px 0px 16px 0px" }}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <ProfileForm />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
export default Profile;
