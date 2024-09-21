import React, { useState, useEffect } from 'react';
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
  }, [resetSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Ticket ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchTicketById;
