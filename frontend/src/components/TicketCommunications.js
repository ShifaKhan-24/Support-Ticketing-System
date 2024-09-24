import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';
import api from '../services/api';

const TicketCommunications = ({ ticketId }) => {
  const [communications, setCommunications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const response = await api.get(`/tickets/${ticketId}/communications`);
        setCommunications(response.data);
      } catch (error) {
        console.error('Error fetching communications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunications();
  }, [ticketId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (communications.length === 0) {
    return <Typography>No Discussion on this ticket yet.</Typography>;
  }

  return (
    <Box
      sx={{
        marginTop: '20px',
        bgcolor: '#F4F6F9',
        borderRadius: '8px',
        padding: 2,
        height: '60vh', // Adjust height as per design
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        id="communicationContainer"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 1,
        }}
      >
        <List>
          {communications.map((comm, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`From: ${comm.sender}`}
                secondary={
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    {comm.message}
                  </Typography>
                }
                sx={{
                  bgcolor: '#FFFFFF',
                  borderRadius: '4px',
                  padding: '8px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default TicketCommunications;
