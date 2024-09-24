import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import api from '../services/api';

const SearchTicketById = ({ onSearchResult, resetSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/tickets/ticketId/${searchTerm}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      onSearchResult(response.data);
    } catch (error) {
      console.error('Error fetching ticket data by ID:', error);
      onSearchResult(null); // Reset search result on error
    }
  };

  const handleClear = () => {
    setSearchTerm(''); // Clear the search input
    onSearchResult(null); // Reset search result
  };

  // Call handleClear when resetSearch changes
  useEffect(() => {
    if (resetSearch) {
      handleClear();
    }
  }, [resetSearch,handleClear]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search by Ticket ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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

export default SearchTicketById;
