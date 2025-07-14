import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, Grid, MenuItem, TextField } from "@mui/material";

const rankMap = {
  Enlisted: [
    "E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9"
  ],
  WarrantOfficer: [
    "W-1", "W-2", "W-3", "W-4", "W-5"
  ],
  Officer: [
    "O-1", "O-2", "O-3", "O-4", "O-5", "O-6", "O-7", "O-8", "O-9", "O-10"
  ],
  Civilian: [
    "GS-1", "GS-2", "GS-3", "GS-4", "GS-5", "GS-6", "GS-7", "GS-8", "GS-9",
    "GS-10", "GS-11", "GS-12", "GS-13", "GS-14", "GS-15", "SES", "Unknown"
  ]
};

const combatantCommands = [
  { value: "",          label: "Please Select" },
  { value: "None",      label: "None" },
  { value: "AFRICOM",   label: "Africa Command" },
  { value: "CENTCOM",   label: "Central Command" },
  { value: "CYBERCOM",  label: "Cyber Command" },
  { value: "EUCOM",     label: "European Command" },
  { value: "INDOPACOM", label: "Indo-Pacific Command" },
  { value: "NORTHCOM",  label: "Northern Command" },
  { value: "NATO",      label: "North Atlantic Treaty Organization" },
  { value: "SOCOM",     label: "Special Operations Command" },
  { value: "SOUTHCOM",  label: "Southern Command" },
  { value: "SPACECOM",  label: "Space Command" },
  { value: "STRATCOM",  label: "Strategic Command" },
  { value: "TRANSCOM",  label: "Transportation Command" },
  { value: "Other",     label: "Other" }
];

const dutyTypeOptions = Object.keys(rankMap);


const DodContactInfoCard = () => {

  const [selectedDutyType, setSelectedDutyType] = useState(""); // Track the selected Duty Type
  const [selectedDutyRank, setSelectedDutyRank] = useState(''); // Track the selected Duty Rank
  const dutyRankRef = useRef(null); // Ref for the Duty Rank field
  const [selectedCommand, setSelectedCommand] = useState("");

  const handleDutyTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedDutyType(selectedType); // Update the selected Duty Type
    setSelectedDutyRank(''); // Reset the Duty Rank when Duty Type changes

    // Enable or disable the Duty Rank field based on the selected Duty Type
    if (dutyRankRef.current) {
      dutyRankRef.current.disabled = !selectedType; // Disable if no Duty Type is selected
    }
  };

  const showOtherCommand = selectedCommand === "Other";


  return (
    <Card sx={{ mb: 5 }}>
      <CardHeader title="Contact Information" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="full_name"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Reporting Unit"
              name="reporting_unit"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Duty Title"
              name="duty_title"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Duty Type"
              name="duty_type"
              fullWidth
              required
              value={selectedDutyType || ''}
              onChange={handleDutyTypeChange}
            >
              {dutyTypeOptions.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Duty Rank"
              name="duty_rank"
              fullWidth
              required
              inputRef={dutyRankRef} // Reference to the Duty Rank field
              value={selectedDutyRank || ''}
              onChange={(e) => setSelectedDutyRank(e.target.value)}
              disabled={!selectedDutyType} // Initially disabled
            >
              {(rankMap[selectedDutyType] || []).map((rank) => (
                <MenuItem key={rank} value={rank}>
                  {rank}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone (Commercial)"
              name="phone_number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone (DSN)"
              name="phone_dsn"
              fullWidth
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
          <Grid item xs={12}>
            <TextField
              label="Assigned Unit"
              name="assigned_unit"
              fullWidth
              required
            />
          </Grid>
        <Grid item xs={12} md={6}>
            <TextField
              select
              label="Combatant Command"
              name="combat_command"
              fullWidth
              required
              value={selectedCommand}
              onChange={(e) => setSelectedCommand(e.target.value)}
            >
              {combatantCommands.map((cmd) => (
                <MenuItem key={cmd.value} value={cmd.value}>
                  {cmd.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {showOtherCommand && (
            <Grid item xs={12} md={6}>
              <TextField
                label="Other Command"
                name="other_command"
                fullWidth
                required
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DodContactInfoCard;
