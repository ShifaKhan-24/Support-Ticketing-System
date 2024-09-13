import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ManageAssignedTickets from './ManageAssignedTickets';
import AgentClosedTickets from './AgentClosedTickets';
import AgentNavbar from './AgentNavbar'; // Import the new top navigation bar
import { Box, Paper, CssBaseline, Typography } from '@mui/material';

const AgentPage = () => {
  const location = useLocation();

  // Function to get the page title based on the current pathname
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/agent/manage-assigned-tickets':
        return 'Assigned Tickets';
      case '/agent/closed-tickets':
        return 'Closed Tickets';
      default:
        return 'Assigned Tickets'; // Default title
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: '#F4F6F9', // Consistent background color
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Industry standard fonts
    }}>
      <CssBaseline /> {/* Normalize CSS */}
      
      {/* Top Navigation Bar */}
      <AgentNavbar />

      {/* Main Content Area */}
      <Box sx={{
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F4F6F9' // Consistent light gray background
      }}>
        <Paper elevation={2} sx={{
          flex: 1,
          bgcolor: '#FFFFFF', // White background for paper
          borderRadius: '16px', // Matching the rounded corners
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Light shadow for paper
        }}>
          <Typography variant="h6" sx={{
            marginBottom: '20px',
            fontWeight: 600,
            color: '#0033A0' // Standard blue for text
          }}>
            {getPageTitle()}
          </Typography>
          <Routes>
            <Route path="manage-assigned-tickets" element={<ManageAssignedTickets />} />
            <Route path="closed-tickets" element={<AgentClosedTickets />} />
            <Route path="/" element={<ManageAssignedTickets />} /> {/* Default route */}
          </Routes>
        </Paper>
      </Box>
    </Box>
  );
};

export default AgentPage;
