import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

const AgentNavbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#0033A0' }}> {/* Consistent blue background */}
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
            Agent Dashboard
          </Typography>
        </Box>
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
  );
};

export default AgentNavbar;
