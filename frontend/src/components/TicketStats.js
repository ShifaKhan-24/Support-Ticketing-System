import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const TicketStats = () => {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/tickets', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setTicketData(response.data);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchTickets();
  }, []);

  const statusData = ticketData.reduce((acc, ticket) => {
    const status = ticket.status;
    if (status) {
      acc[status] = (acc[status] || 0) + 1;
    }
    return acc;
  }, {});

  const priorityData = ticketData.reduce((acc, ticket) => {
    const priority = ticket.priority;
    if (priority) {
      acc[priority] = (acc[priority] || 0) + 1;
    }
    return acc;
  }, {});

  const renderBarChart = (data, title) => {
    const barData = Object.entries(data).map(([key, value]) => ({ name: key, value }));
  
    return (
      <Paper elevation={3} sx={{ padding: 2, borderRadius: '8px' }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>{title}</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis label={null} /> {/* Hide the YAxis label */}
            <Tooltip content={({ payload, label }) => {
              if (payload && payload.length) {
                return (
                  <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '5px' }}>
                    <p>{label}</p>
                    <p>{`Count: ${payload[0].value}`}</p> {/* Customize tooltip content */}
                  </div>
                );
              }
              return null;
            }} />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    );
  };
  

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      <Grid item xs={12} sm={6}>
        {renderBarChart(statusData, 'Tickets By Status')}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderBarChart(priorityData, 'Tickets By Priority')}
      </Grid>
    </Grid>
  );
};

export default TicketStats;