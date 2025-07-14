import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  Alert,
  MenuItem,
  Stack,
} from "@mui/material";
import CaptchaComponent from "./CaptchaComponent.js";
import DodContactInfoCard from "./DodContactInfoCard.js";
import CivilianContactInfoCard from "./CivilianContactInfoCard.js";
import FileUploadComponent from "./FileUploadComponent.js";
import moment from "moment-timezone";
import { useMessage } from "./MessageContext.js";

// Choose between DOD or CIVILIAN form
const REACT_APP_CONTACT_TYPE = process.env.REACT_APP_CONTACT_TYPE || "DOD"; // Default to "DOD"

const IntakeFormComponent = ({ onSubmit }) => {
  const formRef = useRef(null); // Create a ref for the form element
  const [captchaVerified, setCaptchaVerified] = useState(true); // Set to true for testing
  const { push } = useMessage();
  const [error, setError] = useState([]);
  const [location, setLocation] = useState('');
  const [showPOC2, setShowPOC2] = useState(false); 

  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const timeZoneOptions = moment.tz.names(); // Get a list of all time zones

  useEffect(() => {
    // Dynamically add the honeypot field to the form
    if (formRef.current) {
      const honeypot2Field = document.createElement("input");
      honeypot2Field.type = "text";
      honeypot2Field.name = "honeypot2"; // Dynamic honeypot field
      honeypot2Field.style.position = "absolute"; // Move off-screen
      honeypot2Field.style.left = "-9999px"; // Position it far to the left
      honeypot2Field.style.top = "0"; // Keep it aligned vertically
      honeypot2Field.tabIndex = "-1"; // Exclude from tab navigation
      honeypot2Field.autocomplete = "off"; // Prevent autofill
      honeypot2Field.value = ""; // Ensure it's empty
      formRef.current.appendChild(honeypot2Field); // Append to the form using the ref
    }
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      setLocation("Loading coordinates..."); // Set loading text
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude}, Long: ${longitude}`); // Update with actual coordinates
        },
        () => {
          setLocation("Unable to retrieve location."); // Handle errors
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    console.log("Files count:", formData.getAll('document_files').length);

    const startDateValue = formData.get("start_datetime"); // Retrieve start date
    const endDateValue = formData.get("end_datetime"); // Retrieve end date
    const now = new Date(); // Current date and time

    // Validate start date (required field)
    const startDate = new Date(startDateValue);
    if (startDate > now) {
      setError(["Start date cannot be in the future."]);
      return;
    }

    // Validate end date (optional field)
    if (endDateValue) {
      const endDate = new Date(endDateValue);

      if (endDate > now) {
        setError(["End date cannot be in the future."]);
        return;
      }

      if (endDate <= startDate) {
        setError(["Incident end time must be later than start time."]);
        return;
      }
    }

    if (!captchaVerified) {
      setError(["Please complete the CAPTCHA before submitting."]);
      return;
    }

    try {
      //await onSubmit(jsonData); // Pass the form data to the parent component
      await onSubmit(formData);
    } catch (err) {
      console.error("Error submitting the form:", err);
     push({ severity:'error',
             text:'Server error - please try again later.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} encType="multipart/form-data" sx={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>

      {/* Displays Contacts Card based on .env file*/}
      {REACT_APP_CONTACT_TYPE === "DOD" ? (
        <DodContactInfoCard />
      ) : (
        <CivilianContactInfoCard />
      )}

      {/* Additional Contacts Card */}
      <Card sx={{ mb: 5 }}>
        <CardHeader title="POC Contact Information" />
        <CardContent>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="POC 1 Name"
                  name="poc_1_name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="POC 1 Info"
                  name="poc_1_info"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button
              variant="text"
              onClick={() => setShowPOC2(!showPOC2)} // Toggle visibility
              sx={{ mt: 2 }}
            >
              {showPOC2 ? "Hide POC 2" : "Add POC 2"}
            </Button>

            <Collapse in={showPOC2}>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="POC 2 Name"
                    name="poc_2_name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="POC 2 Info"
                    name="poc_2_info"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 5 }}>
        <CardHeader title="Where might civilian harm have occurred?" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Coordinates/Location"
                name="location"
                value={location} // Controlled input
                onChange={(e) => setLocation(e.target.value)} // Allow manual input
                fullWidth
                required
                InputLabelProps={{
                  shrink: true, // Ensure the label shrinks when the field has a value
                }}
              />
              <Button variant="contained" sx={{ mt: 2, backgroundColor: "#7280ce" }} onClick={getLocation}>Get Location</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField type="datetime-local" label="Start Date and Time" name="start_datetime" fullWidth required InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField type="datetime-local" label="End Date and Time" name="end_datetime" fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Time Zone"
                name="time_zone"
                fullWidth
                required
                value={selectedTimeZone || ''} // Ensure the value is always a string
                onChange={(e) => setSelectedTimeZone(e.target.value)} // Update the selected time zone
              >
                {timeZoneOptions.map((zone) => (
                  <MenuItem key={zone} value={zone}>
                    {zone}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 5 }}>
        <CardHeader title="What happened?" />
        <CardContent>
          <TextField label="Describe all civilian harm you suspect" name="total_harm" fullWidth required multiline rows={3} sx={{ mb: 3 }} />
          <TextField label="What might have involved the U.S. military?" name="us_harm" fullWidth required multiline rows={3} />
        </CardContent>
      </Card>

      <Card sx={{ mb: 5 }}>
        <CardHeader title="External Information Sources" />
        <CardContent>
          {/* File Upload Input */}
          <Grid spacing={3} direction="column" >
            <Grid item xs={12}>
              <label>Upload External Information Sources</label>
              <FileUploadComponent />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="url"
                label="Provide a URL link to documentation"
                name="information_url"
                fullWidth
                sx={{ mt: 3 }} // Add spacing here
              />
            </Grid>
            <input
              type="text"
              name="honeypot1"
              tabIndex="-1"
              autoComplete="off"
              style={{
                position: "absolute",
                left: "-9999px",
                top: "0",
              }}
            />
          </Grid>
        </CardContent>
      </Card>

      {error.map((msg,i)=>(
        <Alert key={i} severity="error" sx={{ mb:1 }}>{msg}</Alert>
      ))}

      {/* Submit and reset buttons stacked */}
      <Box sx={{ mt: 3 }}>
        <Stack direction="row" spacing={8} justifyContent="flex-start" alignItems="center">
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#3f51b5",
              minWidth: 140,
              mt: 2
            }}
          >
            Submit Form
          </Button>

          {/* Captcha Component */}
          <CaptchaComponent onVerify={(verified) => setCaptchaVerified(verified)} />
        </Stack>
      </Box>
    </form>
  );
};

export default IntakeFormComponent;
