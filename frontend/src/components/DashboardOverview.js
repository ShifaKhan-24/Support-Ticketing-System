import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const DashboardOverview = () => {
  const [ticketData, setTicketData] = useState([]);
  const [trendData, setTrendData] = useState([]);

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
        // Process trend data here
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchTickets();
  }, []);

  // Example processing for trend data
  useEffect(() => {
    const processedTrendData = ticketData.map(ticket => ({
      date: new Date(ticket.created_at).toLocaleDateString(),
      count: 1, // Example, replace with actual count logic
    }));

    const groupedTrendData = processedTrendData.reduce((acc, curr) => {
      acc[curr.date] = (acc[curr.date] || 0) + curr.count;
      return acc;
    }, {});

    setTrendData(Object.entries(groupedTrendData).map(([key, value]) => ({ date: key, count: value })));
  }, [ticketData]);

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>Ticket Trends Over Time</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      {/* Include the TicketStats component here or in a higher-level component */}
    </Grid>
  );
};

export default DashboardOverview;
