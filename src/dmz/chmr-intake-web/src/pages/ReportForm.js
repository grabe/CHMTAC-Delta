import React from "react";
import { Grid2, Box, Container } from "@mui/material";
import IntakeFormComponent from "../components/IntakeFormComponent.js";
import { submitReport } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header.js';
import MenuBar from '../components/MenuBar.js';
import { v4 as uuidv4 } from 'uuid';
import { useMessage } from "../components/MessageContext.js";
const ReportForm = () => {
  const navigate = useNavigate();
  const  { push }  = useMessage();

  const handleFormSubmit = async (formData) => {
    try {
      // Generate a UUID and merge it with the form data
      formData.append("publicUUID", uuidv4());

      // Debugging: Log any files being submitted
      console.log("Files being submitted:", formData.getAll("document_files").map(f => f.name));
  
      await submitReport(formData);

      const plain = {};
      for (const [key, value] of formData.entries()) {
        if (key !== "files") {
          plain[key] = value;
        }
      }

      const fileNames = formData.getAll("document_files").map((f) => f.name);
      if (fileNames.length) plain.files = fileNames;
      // Navigate to the submission page with the submitted data
      navigate("/SubmissionPage", { state: { plain } });
    } catch (error) {
      console.error("Error submitting the report:", error);
      push({ severity:'error', text:'Submission failed - please retry.' });
    }
  };



  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Header headerText="Report Suspected Civilian Harm Below:" />
      <MenuBar />

      {/* Form Container */}
      <Container sx={{ pt: 1 }}>
        <Grid2 container justifyContent="center">
          <Grid2 item xs={12} sm={10} md={8} lg={6}>
            <IntakeFormComponent onSubmit={handleFormSubmit} />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default ReportForm;
