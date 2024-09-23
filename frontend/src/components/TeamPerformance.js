import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import api from '../services/api';
import AgentSearch from './AgentSearch';
import TeamStats from './TeamStats';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Green tick for available
import CancelIcon from '@mui/icons-material/Cancel'; // Grey cross for offline
import AlarmIcon from '@mui/icons-material/AccessAlarm'; // Red circle for busy
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'; // Empty grey circle

const TeamPerformance = () => {
  const [teamData, setTeamData] = useState([]);
  const [searchedAgent, setSearchedAgent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchId, setSearchId] = useState('');
  const [resetSearch, setResetSearch] = useState(false);

  const fetchTeamData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/agents', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: {
          availabilityStatus: filterStatus === 'all' ? undefined : filterStatus,
          categoryName: filterCategory === 'all' ? undefined : filterCategory,
        },
      });
      setTeamData(response.data);
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, [filterStatus, filterCategory]);

  const clearSearchAndFilter = () => {
    setSearchedAgent(null);
    setFilterStatus('all');
    setFilterCategory('all');
    setSearchId('');
    setResetSearch(true);
    setTimeout(() => setResetSearch(false), 0);
    fetchTeamData();
  };

  const getAvailabilityIcon = (status) => {
    switch (status) {
      case 'available':
        return <CheckCircleIcon sx={{ color: 'green', fontSize: '20px' }} />;
      case 'busy':
        return <AlarmIcon sx={{ color: 'red', fontSize: '20px' }} />;
      case 'offline':
        return <CancelIcon sx={{ color: 'grey', fontSize: '20px' }} />;
      default:
        return <CircleOutlinedIcon sx={{ color: 'grey', fontSize: '20px' }} />; // Empty grey circle
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#FFFFFF' }}>
      <Grid container sx={{ flex: 1, height: '100%' }}>
        {/* Left Side - Search and Filters */}
        <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #DDDDDD', padding: '20px', overflowY: 'auto' }}>
          {/* Search with Clear Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <AgentSearch setSearchedAgent={setSearchedAgent} searchId={searchId} setSearchId={setSearchId} />
            <IconButton
              onClick={clearSearchAndFilter}
              sx={{
                marginLeft: '8px',
                backgroundColor: '#F0F0F0',
                '&:hover': { backgroundColor: '#E0E0E0' },
              }}
            >
              <RefreshIcon sx={{ color: '#333333' }} />
            </IconButton>
          </Box>

          {/* Filters */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Availability Status</InputLabel>
                <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="busy">Busy</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="technical">Technical</MenuItem>
                  <MenuItem value="billing">Billing</MenuItem>
                  <MenuItem value="support">Support</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Agent List */}
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', marginTop: '20px' }}>
            {searchedAgent ? (
              <Card sx={{ padding: '20px', marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h6">Searched Agent:</Typography>
                  <Typography variant="body1"><strong>Agent ID:</strong> {searchedAgent.agentId}</Typography>
                  {getAvailabilityIcon(searchedAgent.availabilityStatus)}
                </CardContent>
              </Card>
            ) : (
              teamData.map((agent) => (
                <Card key={agent.agentId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '10px' }}>
                  <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ marginRight: '10px' }}>Agent ID: {agent.agentId}</Typography>
                    {getAvailabilityIcon(agent.availabilityStatus)}
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Grid>

        {/* Right Side - Agent Details */}
        <Grid item xs={12} md={8} sx={{ padding: '20px', overflowY: 'auto', height: '100%' }}>
          {/* You can add the agent details section here if needed */}
          {/* <Typography variant="h5" sx={{ color: '#007BFF' }}>Agent Details</Typography> */}
          <TeamStats />
          {/* Details content would go here */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamPerformance;
