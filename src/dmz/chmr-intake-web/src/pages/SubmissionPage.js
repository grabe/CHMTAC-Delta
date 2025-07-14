import React from "react";
import { AppBar, Grid2, Toolbar, Typography, Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";


const SubmissionPage = () => {
  const { state } = useLocation();
  const reportData = state?.plain ?? state;


  if (!reportData) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography variant="h5">
          No Report was submitted, Please submit a report.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Big Header */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(45deg, #3f51b5, #1d2d50)",
          py: 1.5,
        }}
      >
        <Toolbar sx={{ flexDirection: "column", textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#fff",
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
             Civilian Harm Mitigation
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#e0e0e0",
              mt: 0.5,
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Review Your Submission Below:
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ pt: 5 }}>
        <Grid2 container justifyContent="center">
          <Grid2 item xs={12} sm={10} md={8} lg={6}>
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 3,
                boxShadow: 1,
                borderRadius: 1,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Report UUID: {reportData.publicUUID || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Full Name:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.full_name || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Phone (Commercial):
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.phone_number || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Phone (DSN):
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.phone_dsn || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Email Address:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.email_address || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Reporting Unit:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.reporting_unit || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Duty Title:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.duty_title || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Duty Rank:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.duty_rank || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Assigned Unit:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.assigned_unit || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Combat Command:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.combat_command || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Other Command:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.other_command || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Location:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.location || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Start Datetime:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.start_datetime || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                End Datetime:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.end_datetime || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Time Zone:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.time_zone || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Total Harm:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.total_harm || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                US Harm:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.us_harm || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Information URL:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.information_url || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Files:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {Array.isArray(reportData.files) && reportData.files.length > 0
                  ? reportData.files.join(", ")
                  : "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                POC #1 Name:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.poc_1_name || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                POC #1 Info:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.poc_1_info || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                POC #2 Name:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.poc_2_name || "N/A"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                POC #2 Info:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportData.poc_2_info || "N/A"}
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default SubmissionPage;
