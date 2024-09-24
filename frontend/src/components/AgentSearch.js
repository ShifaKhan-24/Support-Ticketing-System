import React from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import api from '../services/api';

const AgentSearch = ({ setSearchedAgent, searchId, setSearchId }) => {
  const handleSearch = async () => {
    if (searchId) {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/agents/agentId/${searchId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setSearchedAgent(response.data);
      } catch (error) {
        console.error('Error fetching agent by ID:', error);
        setSearchedAgent(null); // Clear searched agent on error
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Enter Agent ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '30px', // Round the field to resemble a modern search bar
            paddingRight: 0, // Remove padding to align the search icon closely
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSearch}
                sx={{
                  padding: '10px',
                  color: '#9e9e9e', // Gray color to match the typical search icon color
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default AgentSearch;
