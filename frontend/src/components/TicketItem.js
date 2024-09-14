import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const TicketItem = ({ ticket }) => {
  return (
    <TableRow
      sx={{
        '&:nth-of-type(even)': {
          bgcolor: '#F4F6F9', // Light gray for alternating rows
        },
        '&:hover': {
          bgcolor: '#E0E0E0', // Slightly darker gray on hover
        },
      }}
    >
      <TableCell>{ticket._id}</TableCell>
      {/* <TableCell>{ticket.title}</TableCell> */}
      <TableCell>{ticket.description}</TableCell>
      <TableCell>{ticket.status}</TableCell>
      <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
    </TableRow>
  );
};

export default TicketItem;
