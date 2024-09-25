import React, { useState } from 'react';
import { Box, Button, AppBar, Toolbar, Typography, IconButton, Popover } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TicketOverview from './TicketOverview';
import TeamPerformance from './TeamPerformance';
import Profile from './Profile';

const ManagerDashboard = () => {
  const [view, setView] = useState('ticketOverview'); // default to 'Ticket Overview'
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
    <Box sx={{ width: '100%', bgcolor: '#F5F5F5', minHeight: '100vh' }}>
      {/* App Bar for Navigation */}
      <AppBar position="static" sx={{ bgcolor: '#0033A0' }}>
        <Toolbar>
          {/* Profile Icon Button on the left side */}
          <IconButton sx={{ color: '#fff', marginRight: 'auto' }} onClick={handleProfileClick}>
            <AccountCircleIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Manager Dashboard
          </Typography>
          <Button color="inherit" onClick={() => setView('ticketOverview')}>
            Ticket Overview
          </Button>
          <Button color="inherit" onClick={() => setView('teamPerformance')}>
            Team Performance
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box>
        {view === 'ticketOverview' && <TicketOverview />}
        {view === 'teamPerformance' && <TeamPerformance />}
      </Box>

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
          style: { marginTop: 34, marginRight:20 }, // Adjust for better positioning
        }}
      >
        <Profile />
      </Popover>
    </Box>
  );
};

export default ManagerDashboard;
