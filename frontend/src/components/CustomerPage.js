import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import ViewTicketsPage from './ViewTicketsPage';
import CreateTicketForm from './CreateTicketForm'; // Placeholder
import ClosedTickets from './ClosedTickets'; // Placeholder
import FindStore from './FindStore'; // Placeholder
import Help from './Help'; // Placeholder
import About from './About'; // Placeholder
import PrivacyTerms from './PrivacyTerms'; // Placeholder
import { Box, Paper, CssBaseline } from '@mui/material';

const CustomerPage = () => {
  const customerId = localStorage.getItem('id');
  console.log("CustomerPage customerId:", customerId);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F4F6F9' }}> {/* Light gray background */ }
      <CssBaseline /> {/* Normalize CSS */}
      <Sidebar customerId={customerId} /> {/* Pass customerId to Sidebar */}
      <Box
        sx={{
          flex: 1,
          padding: '20px',
          bgcolor: '#F4F6F9', // Consistent background color
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            bgcolor: '#FFFFFF', // White background for content
            borderRadius: '16px', // Matching rounded corners
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Light shadow for paper
          }}
        >
          <Routes>
            <Route path="view-tickets" element={<ViewTicketsPage />} />
            <Route path="create-ticket" element={<CreateTicketForm />} />
            <Route path="closed-tickets" element={<ClosedTickets />} />
            <Route path="find-store" element={<FindStore />} />
            <Route path="help" element={<Help />} />
            <Route path="about" element={<About />} />
            <Route path="privacy-terms" element={<PrivacyTerms />} />
            <Route path="/" element={<ViewTicketsPage />} /> {/* Default route */}
          </Routes>
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomerPage;
