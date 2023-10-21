"use client";
import { Card, CardContent, Container, Grid } from "@mui/material";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  return (
    <Container component="main" sx={{ justifyContent: "center", alignItems: "center", minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: "sm" }}>
      <Card sx={{ maxWidth: "444px", marginBottom: 1 }}>
        <CardContent >
          <Grid container spacing={"40px"} direction="column" justifyContent="center" alignItems="center">
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
