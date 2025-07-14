import React, { useState } from 'react';
import { Box, Button, Collapse, Typography } from '@mui/material';
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const MenuBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
      {/* Expandable Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
        <Button
          variant="text"
          color="inherit"
          onClick={() => setExpanded(!expanded)}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          Additional Information
        </Button>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1, maxWidth: '800px' }}>
          <Typography paragraph>
            U.S. Department of Defenses takes all reports of civilian harm seriously and maintains processes to conduct thorough 
            assessments using all available information that may factor into findings. Please include the date and location 
            of the incident, as well as any other details that can help the assessment.
            <br />
            <span style={{ color: 'red' }}>
                <strong>Fields marked by an asterisk * are required.</strong>
            </span>
          </Typography>
          <Typography paragraph>
            <strong>Publication of Department of Defense Instruction 3000.17 “Civilian Harm Mitigation and Response”</strong>
          </Typography>
          <Typography paragraph>
            The Department of Defense published the Department of Defense Instruction 3000.17 “Civilian Harm Mitigation and Response” on Dec. 21, 2023. 
            This instruction requires that combatant commands publish reports at least quarterly on the command’s unclassified, publicly accessible website 
            that provide information on the status and results of reviews, assessments, and investigations relating to civilian harm. U.S. Department of Defenses 
            reviews and assesses all information related to civilian harm and publishes quarterly reports in accordance with this guidance.
          </Typography>
          <Typography paragraph>
            <strong>Discrepancies between U.S. Department of Defenses civilian harm assessments and NGO Reports</strong>
          </Typography>
          <Typography paragraph>
            U.S. Department of Defenses civilian harm assessment reports occasionally differ from other organizations’ reports, including non-governmental organizations, 
            for a number of reasons. The command’s reviews rely on a variety of sources, including open-source information and information from reliable and 
            multi-layered intelligence sources, as well as classified operational reporting, some of which is not accessible to the public. This can contribute 
            to perceived discrepancies between the command’s assessments and those of others.
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default MenuBar;