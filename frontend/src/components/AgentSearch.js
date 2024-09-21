import React, { useState, useEffect } from 'react';
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
    <div>
      <input
        type="text"
        placeholder="Enter Agent ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default AgentSearch;
