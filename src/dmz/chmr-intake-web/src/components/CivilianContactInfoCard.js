import React from "react";
import { Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";

const CivilianContactInfoCard = () => {
  return (
    <Card sx={{ mb: 5 }}>
      <CardHeader title="Contact Information" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              name="full_name"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              name="phone_number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              name="email_address"
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CivilianContactInfoCard;
