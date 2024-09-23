import React, { useState } from 'react';
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import TicketOverview from './TicketOverview';
import TeamPerformance from './TeamPerformance';

const ManagerDashboard = () => {
  const [view, setView] = useState('ticketOverview'); // default to 'Ticket Overview'

  return (
    <Box sx={{ width: '100%', bgcolor: '#F5F5F5', minHeight: '100vh' }}>
      {/* App Bar for Navigation */}
      <AppBar position="static" sx={{ bgcolor: '#0033A0' }}>
        <Toolbar>
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
      <Box >
        {/* Conditionally Render Based on Selected View */}
        {view === 'ticketOverview' && <TicketOverview />}
        {view === 'teamPerformance' && <TeamPerformance />}
      </Box>
    </Box>
  );
};

export default ManagerDashboard;
