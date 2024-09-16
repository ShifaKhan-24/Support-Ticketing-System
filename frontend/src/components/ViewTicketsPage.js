import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  CircularProgress,
  Typography,
  Chip,
  Grid,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import CategoryIcon from '@mui/icons-material/Category';
import SubjectIcon from '@mui/icons-material/Subject';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';
import api from '../services/api';

const ViewTicketsPage = () => {
  const customerId = localStorage.getItem('id');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get(`/customers/${customerId}/tickets`);
        setTickets(response.data);
      } catch (err) {
        setError('You dont have any tickets go to create tickets to report a problem.');
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
        return 'success';
      case 'closed':
        return 'error';
      case 'in-progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '20px', bgcolor: '#F4F6F9', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#0033A0' }}> {/* Consistent color */}
        My Tickets
      </Typography>
      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} key={ticket.ticketId}>
            <Accordion
              sx={{ 
                marginBottom: 2, 
                border: '1px solid #B0BEC5', // Soft blue-gray border
                borderRadius: '16px', // Curved edges
                boxShadow: 'none', // Remove box shadow
                '&:before': { // Remove default border-top for Accordion
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  backgroundColor: '#FFFFFF', 
                  borderBottom: '1px solid #B0BEC5'
                }}
              >
                <Typography variant="h6" sx={{ color: '#333333' }}>
                  Ticket #{ticket.ticketId}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ padding: 2, bgcolor: '#FFFFFF', borderRadius: '0 0 16px 16px' }}>
                  <Typography variant="body1" sx={{ color: '#333333', mb: 1 }}>
                    <IconButton size="small" sx={{ color: '#00ACC1' }}><EmailIcon /></IconButton>
                    <strong>Customer Email:</strong> {ticket.customerEmail}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333333', mb: 1 }}>
                    <IconButton size="small" sx={{ color: '#00ACC1' }}><CategoryIcon /></IconButton>
                    <strong>Category:</strong> {ticket.categoryName}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333333', mb: 1 }}>
                    <IconButton size="small" sx={{ color: '#00ACC1' }}><SubjectIcon /></IconButton>
                    <strong>Subject:</strong> {ticket.subject}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333333', mb: 1 }}>
                    <IconButton size="small" sx={{ color: '#00ACC1' }}><DescriptionIcon /></IconButton>
                    <strong>Description:</strong> {ticket.description}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333333', mb: 2 }}>
                    <IconButton size="small" sx={{ color: '#00ACC1' }}><DateRangeIcon /></IconButton>
                    <strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Chip
                      label={`Status: ${ticket.status}`}
                      color={getStatusColor(ticket.status)}
                      sx={{ borderRadius: '16px', padding: '8px', fontWeight: 500 }}
                    />
                    {/* Priority chip is omitted for customers */}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewTicketsPage;
