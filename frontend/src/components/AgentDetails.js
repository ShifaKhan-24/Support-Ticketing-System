// AgentDetails.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Available
import CancelIcon from '@mui/icons-material/Cancel'; // Offline
import AlarmIcon from '@mui/icons-material/AccessAlarm'; // Busy
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'; // Unknown status
import api from '../services/api';

const AgentDetails = ({ agentId }) => {
  const [agentDetails, setAgentDetails] = useState(null);
  const [assignedTickets, setAssignedTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const agentResponse = await api.get(`/agents/agentId/${agentId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        setAgentDetails(agentResponse.data);
        
        // Fetching assigned tickets
        const assignedResponse = await api.get(`/agent/${agentId}/tickets`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setAssignedTickets(assignedResponse.data.length);
        
        // Fetching closed tickets
        const closedResponse = await api.get(`/agent/${agentId}/closed-tickets`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setClosedTickets(closedResponse.data.length);
      } catch (error) {
        console.error('Error fetching agent details:', error);
      }
    };

    if (agentId) {
      fetchAgentDetails();
    }
  }, [agentId]);

  if (!agentDetails) {
    return null; // Or a loading spinner if you prefer
  }

  // Function to get availability icon based on status
  const getAvailabilityIcon = (status) => {
    switch (status) {
      case 'available':
        return <CheckCircleIcon sx={{ color: 'green', fontSize: '24px' }} />;
      case 'busy':
        return <AlarmIcon sx={{ color: 'red', fontSize: '24px' }} />;
      case 'offline':
        return <CancelIcon sx={{ color: 'grey', fontSize: '24px' }} />;
      default:
        return <CircleOutlinedIcon sx={{ color: 'grey', fontSize: '24px' }} />;
    }
  };

  return (
    <Card sx={{ padding: '20px', marginBottom: '20px', boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Typography variant="body1" sx={{ flex: 1 }}><strong>Agent ID:</strong> {agentDetails.agentId}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getAvailabilityIcon(agentDetails.availabilityStatus)}
            <Typography variant="body2" sx={{ marginLeft: '5px' }}>{agentDetails.availabilityStatus}</Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ marginBottom: '5px' }}><strong>Email:</strong> {agentDetails.email}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '5px' }}><strong>Category:</strong> {agentDetails.categoryName}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '5px' }}><strong>Total Assigned Tickets:</strong> {assignedTickets}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '5px' }}><strong>Total Closed Tickets:</strong> {closedTickets}</Typography>
      </CardContent>
    </Card>
  );
};

export default AgentDetails;
