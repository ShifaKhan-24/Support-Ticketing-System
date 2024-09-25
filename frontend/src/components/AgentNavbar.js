import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, Popover, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Profile from './Profile'; // Adjust the path as necessary

const AgentNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the popover anchor

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the clicked icon
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the popover
  };

  const open = Boolean(anchorEl); // Determine if the popover is open
  const id = open ? 'simple-popover' : undefined; // Set the id for the popover

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#0033A0' }}>
        <Toolbar>
        <IconButton sx={{ color: '#FFFFFF' }} onClick={handleProfileClick}>
            <AccountCircleIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
              Agent Dashboard
            </Typography>
          </Box>
          {/* Profile Icon Button */}
          
          <Button
            component={Link}
            to="/agent/manage-assigned-tickets"
            sx={{
              color: '#FFFFFF',
              textTransform: 'none',
              marginLeft: '20px',
              fontWeight: '500'
            }}
          >
            Assigned Tickets
          </Button>
          <Button
            component={Link}
            to="/agent/closed-tickets"
            sx={{
              color: '#FFFFFF',
              textTransform: 'none',
              marginLeft: '20px',
              fontWeight: '500'
            }}
          >
            Closed Tickets
          </Button>
        </Toolbar>
      </AppBar>

      {/* Profile Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: { marginTop: 34, marginRight: 20 }, // Adjust for better positioning
        }}
      >
        <Profile /> {/* Render Profile component inside the popover */}
      </Popover>
    </>
  );
};

export default AgentNavbar;
