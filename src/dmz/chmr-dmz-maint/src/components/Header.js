import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import dodLogo from '../assets/dod_logo.png'; // Adjust the path if needed


const Header = ({ headerText }) => {
  return (
    <AppBar position="static" sx={{ background: "linear-gradient(45deg, #3f51b5, #1d2d50)", py: 1.5 }}>
        <Toolbar sx={{ flexDirection: "column", textAlign: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <Typography
                variant="h4"
                sx={{
                fontWeight: "bold",
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#fff",
                textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                mr: 2, // Add spacing between text and logo
                }}
            >
                Civilian Harm Reports MAINTENANCE
            </Typography>
            <img
                src={dodLogo}
                alt = "Department of Defense logo"
                style={{
                    height: "50px", 
                    width: "auto",
                }}
            />
            </Box>

            <Typography 
                variant="h6" 
                sx={{ 
                color: "#e0e0e0", 
                mt: 0.5, 
                fontWeight: "bold",
                fontSize: "1.1rem"
                }}
            >
                { headerText }
            </Typography>
        </Toolbar>
    </AppBar>
  );
};

export default Header;