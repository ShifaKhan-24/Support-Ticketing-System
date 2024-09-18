import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Chip,
  Grid,
  Paper,
  Card
} from '@mui/material';
import api from '../services/api';
import Conversation from './ConversationComponent';

const ViewTicketsPage = () => {
  const customerId = localStorage.getItem('id');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get(`/customers/${customerId}/tickets`);
        setTickets(response.data);
      } catch (err) {
        setError('You don\'t have any tickets. Go to create tickets to report a problem.');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [customerId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress sx={{ color: '#6F4F28' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center">
        {error}
      </Typography>
    );
  }

  // Function to determine chip colors based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return '#4CAF50'; // Green for open
      case 'closed':
        return '#F44336'; // Red for closed
      case 'in-progress':
        return '#FFC107'; // Yellow for in-progress
      default:
        return '#9E9E9E'; // Grey for others
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '20px', bgcolor: '#F4F6F9', display: 'flex' }}>
      
      {/* Side panel for ticket IDs */}
      <Box sx={{ width: '25%', maxHeight: '100vh', overflowY: 'auto', paddingRight: 2, borderRight: '1px solid #E0E0E0' }}>
        <Box sx={{ mb: 2, borderBottom: '2px solid #0033A0', paddingBottom: 1 }}>
          <Typography variant="h6" sx={{ color: '#0033A0', fontWeight: 'bold' }}>Ticket List</Typography>
        </Box>
        <Grid container spacing={2} direction="column">
          {tickets.map((ticket) => (
            <Grid item key={ticket.ticketId}>
              <Card
                sx={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                  },
                  padding: 2,
                  textAlign: 'center',
                  backgroundColor: selectedTicket && selectedTicket.ticketId === ticket.ticketId ? '#E0F7FA' : '#FFFFFF',
                  transition: '0.3s',
                  border: `2px solid ${getStatusColor(ticket.status)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: 2
                }}
                onClick={() => setSelectedTicket(ticket)}
              >
                <Typography variant="h6" sx={{ color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Ticket #{ticket.ticketId}
                </Typography>
                <Chip
                  label={ticket.status}
                  sx={{
                    backgroundColor: getStatusColor(ticket.status),
                    color: '#fff',
                    borderRadius: '16px',
                    marginTop: 1
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Main panel for selected ticket details */}
      <Box sx={{ width: '75%', paddingLeft: 2 }}>
        {selectedTicket ? (
          <>
            <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#0033A0' }}>
              Ticket Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Paper
                  sx={{
                    backgroundColor: '#00ACC1',
                    color: '#fff',
                    padding: 2,
                    textAlign: 'center',
                    borderRadius: '8px',
                    height: '180px', // Increased height
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    TICKET ID
                  </Typography>
                  <Typography variant="h6" sx={{fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selectedTicket.ticketId}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  sx={{
                    backgroundColor: '#FF9800',
                    color: '#fff',
                    padding: 2,
                    textAlign: 'center',
                    borderRadius: '8px',
                    height: '180px', // Increased height
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    ASSIGNED TO
                  </Typography>
                  <Typography variant="h6" sx={{fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selectedTicket.categoryName || 'Unassigned'} support team
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  sx={{
                    backgroundColor: '#03A9F4',
                    color: '#fff',
                    padding: 2,
                    textAlign: 'center',
                    borderRadius: '8px',
                    height: '180px', // Increased height
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    USER
                  </Typography>
                  <Typography variant="h6" sx={{fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selectedTicket.customerEmail}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  sx={{
                    backgroundColor: getStatusColor(selectedTicket.status),
                    color: '#fff',
                    padding: 2,
                    textAlign: 'center',
                    borderRadius: '8px',
                    height: '180px', // Increased height
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    STATUS
                  </Typography>
                  <Typography variant="h6" sx={{fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selectedTicket.status}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Ticket Details and Conversation */}
            <Box sx={{ mt: 4, padding: 2, bgcolor: '#FFFFFF', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ color: '#333333', mb: 1 }}>
                  <strong>Category:</strong> {selectedTicket.categoryName}
                </Typography>
                <Typography variant="body1" sx={{ color: '#333333', mb: 1 }}>
                  <strong>Subject:</strong> {selectedTicket.subject}
                </Typography>
                <Typography variant="body1" sx={{ color: '#333333', mb: 1 }}>
                  <strong>Description:</strong>
                </Typography>
                <Typography variant="body1" sx={{ color: '#333333', mb: 1, whiteSpace: 'pre-wrap', backgroundColor: '#F1F8E9', padding: 2, borderRadius: '4px' }}>
                  {selectedTicket.description}
                </Typography>
                <Typography variant="body1" sx={{ color: '#333333', mb: 1 }}>
                  <strong>Created At:</strong> {new Date(selectedTicket.created_at).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ color: '#333333', mb: 0  }}>
                  <strong>Discussion:</strong>
                </Typography>
              </Box>
              <Conversation ticketId={selectedTicket.ticketId} currentUser={selectedTicket.customerEmail}/>
            </Box>
          </>
        ) : (
          <Typography variant="h6" align="center">
            Select a ticket to view details.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ViewTicketsPage;
