import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../services/api';

const TeamStats = () => {
  const [backlogData, setBacklogData] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const agentsResponse = await api.get('/agents', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const availabilityCount = {
        available: 0,
        busy: 0,
        offline: 0,
      };

      // Calculate availability status
      agentsResponse.data.forEach(agent => {
        availabilityCount[agent.availabilityStatus]++;
      });

      setAvailabilityData([
        { name: 'Available', value: availabilityCount.available },
        { name: 'Busy', value: availabilityCount.busy },
        { name: 'Offline', value: availabilityCount.offline },
      ]);

      // Fetch open and closed tickets for each agent
      const ticketBacklogPromises = agentsResponse.data.map(async (agent) => {
        let openTickets = 0;
        let closedTickets = 0;

        try {
          const openTicketsResponse = await api.get(`/agent/${agent.agentId}/open-tickets`);
          openTickets = openTicketsResponse.data.length;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            openTickets = 0; // Set to zero if 404
          }
        }

        try {
          const closedTicketsResponse = await api.get(`/agent/${agent.agentId}/closed-tickets`);
          closedTickets = closedTicketsResponse.data.length;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            closedTickets = 0; // Set to zero if 404
          }
        }

        return {
          agentId: agent.agentId,
          openTickets,
          closedTickets,
        };
      });

      const backlogDataResults = await Promise.all(ticketBacklogPromises);
      setBacklogData(backlogDataResults);
      
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (<div style={{ 
    maxHeight: '1000px', 
    overflowY: 'scroll', 
    position: 'relative', 
    scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none', // For Internet Explorer and Edge
  }}>
    <style>
      {`
        div::-webkit-scrollbar {
          display: none; // Hides scrollbar in Chrome, Safari, and Opera
        }
      `}
    </style>
    <Grid container spacing={3} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: '8px' }}>
          <Typography variant="h6">Agents Available</Typography>
          <ResponsiveContainer width="100%" height={400}> {/* Increased height */}
          <PieChart>
            <Pie
              data={availabilityData}
              cx="50%"
              cy="50%"
              outerRadius={100} // Increased outer radius for a larger pie
              fill="#8884d8"
              dataKey="value"
            >
              {availabilityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#00C49F' : index === 1 ? '#FF8042' : '#AAAAAA'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: '8px' }}>
          <Typography variant="h6">Ticket Backlog</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={backlogData}>
              <XAxis dataKey="agentId" />
              <YAxis label={null} />
              <Tooltip />
              <Legend />
              <Bar dataKey="openTickets" fill="#82ca9d" />
              <Bar dataKey="closedTickets" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
    </div>
  );
};

export default TeamStats;
