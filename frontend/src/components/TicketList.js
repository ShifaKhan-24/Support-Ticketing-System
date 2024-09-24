import React from 'react';
import TicketItem from '../components/TicketItem'; // Import TicketItem component
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TicketList = ({ tickets }) => {
  if (tickets.length === 0) {
    return (
      <Box
        sx={{
          padding: '20px',
          bgcolor: '#F4F6F9', // Light gray background
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No tickets assigned to you.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: '20px',
        bgcolor: '#F4F6F9', // Light gray background
      }}
    >
      <TableContainer component={Paper} sx={{ bgcolor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }} aria-label="ticket table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#0033A0' }}>Ticket ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#0033A0' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#0033A0' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#0033A0' }}>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map(ticket => (
              <TicketItem key={ticket.ticketId} ticket={ticket} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TicketList;
