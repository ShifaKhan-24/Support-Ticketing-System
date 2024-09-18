import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Grid,
} from '@mui/material';
import api from '../services/api';
import Conversation from './ConversationComponent'; // Import the Conversation component

const ManageAssignedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const agentId = localStorage.getItem('id'); // Get the agent's ID

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get(`/agent/${agentId}/tickets`);
        setTickets(response.data);
      } catch (err) {
        setError('Currently there are no tickets assigned to you.');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [agentId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#F5F5F5' }}>
        <CircularProgress sx={{ color: '#007BFF' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center" sx={{ bgcolor: '#F8D7DA', color: '#721C24', p: 2 }}>
        {error}
      </Typography>
    );
  }

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const getBorderColor = (status) => {
    switch (status) {
      case 'open':
        return '#28a745'; // Green for open
      case 'closed':
        return '#dc3545'; // Red for closed
      case 'in-progress':
        return '#ffc107'; // Yellow for in-progress
      default:
        return '#6c757d'; // Grey for default
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F5F5F5' }}>
      {/* Sidebar with List */}
      <Box sx={{ width: '30%', padding: '20px', bgcolor: '#FFFFFF', borderRight: '1px solid #DDDDDD', overflowY: 'auto' }}>
        <Typography variant="h6" sx={{ color: '#007BFF', mb: 2, fontWeight: 600 }}>
          Ticket List
        </Typography>
        <Grid container spacing={2}>
          {tickets.map((ticket) => (
            <Grid item xs={12} key={ticket.ticketId}>
              <Card 
                variant="outlined"
                sx={{ 
                  borderRadius: '8px', 
                  borderColor: getBorderColor(ticket.status),
                  cursor: 'pointer', 
                  '&:hover': { borderColor: '#007BFF' },
                  bgcolor: '#F9F9F9',
                  p: 1
                }}
                onClick={() => handleTicketClick(ticket)}
              >
                <CardContent sx={{ padding: '8px' }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Ticket #{ticket.ticketId}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                    <Chip 
                      label={ticket.status} 
                      color={getStatusColor(ticket.status)} 
                      sx={{ borderRadius: '4px', fontWeight: 500, width: '100px' }} 
                    />
                    <Chip 
                      label={ticket.priority} 
                      color={getPriorityColor(ticket.priority)} 
                      sx={{ borderRadius: '4px', fontWeight: 500, width: '100px' }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: '20px', bgcolor: '#FFFFFF', overflowY: 'auto' }}>
        {selectedTicket ? (
          <>
            <Card sx={{ p: 3, borderRadius: '8px', mb: 3 }}>
              <Typography variant="h5" sx={{ color: '#007BFF', mb: 2 }}>
                Ticket #{selectedTicket.ticketId}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Customer Email:</strong> {selectedTicket.customerEmail}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Category:</strong> {selectedTicket.categoryName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Subject:</strong> {selectedTicket.subject}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Description:</strong> {selectedTicket.description}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Created At:</strong> {new Date(selectedTicket.created_at).toLocaleDateString()}
                </Typography>
                <Chip
                  label={`Status: ${selectedTicket.status}`}
                  color={getStatusColor(selectedTicket.status)}
                  sx={{ borderRadius: '4px', fontWeight: 500, mr: 1 }}
                />
                <Chip
                  label={`Priority: ${selectedTicket.priority}`}
                  color={getPriorityColor(selectedTicket.priority)}
                  sx={{ borderRadius: '4px', fontWeight: 500 }}
                />
                <Typography variant="body1" sx={{ color: '#333333', mb: 0  }}>
                  <strong>Discussion:</strong>
                </Typography>
              </CardContent>
              <Conversation ticketId={selectedTicket.ticketId} currentUser="support team"/>
            </Card>
          </>
        ) : (
          <Typography variant="h6" align="center" sx={{ color: '#333333', mt: 5 }}>
            Select a ticket to view details
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// Helper functions for colors
const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'success';
    case 'closed':
      return 'error';
    case 'in-progress':
      return 'warning';
    default:
      return 'default';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'default';
    default:
      return 'default';
  }
};

export default ManageAssignedTickets;
