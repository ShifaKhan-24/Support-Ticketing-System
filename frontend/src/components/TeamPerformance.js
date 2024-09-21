import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AgentSearch from './AgentSearch';

const TeamPerformance = () => {
  const [teamData, setTeamData] = useState([]);
  const [searchedAgent, setSearchedAgent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all'); // New state for category filter
  const [searchId, setSearchId] = useState('');

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
    fetchTeamData(); // Fetch data whenever filters change
  }, [filterStatus, filterCategory]);

  const clearSearchAndFilter = () => {
    setSearchedAgent(null);
    setFilterStatus('all');
    setFilterCategory('all'); // Clear the category filter
    setSearchId('');
    fetchTeamData(); // Refetch data to reset the list
  };

  return (
    <div>
      <h2>Team Performance</h2>

      {/* Filter Dropdown for Availability Status */}
      <div>
        <label htmlFor="availability-status">Filter by Availability Status:</label>
        <select 
          id="availability-status" 
          onChange={(e) => setFilterStatus(e.target.value)} 
          value={filterStatus}
        >
          <option value="all">All Availability Statuses</option>
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Filter Dropdown for Category */}
      <div>
        <label htmlFor="category-filter">Filter by Category:</label>
        <select 
          id="category-filter" 
          onChange={(e) => setFilterCategory(e.target.value)} 
          value={filterCategory}
        >
          <option value="all">All Categories</option>
          <option value="technical">Technical</option>
          <option value="billing">Billing</option>
          <option value="support">Support</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {/* Search Component */}
      <AgentSearch 
        setSearchedAgent={setSearchedAgent} 
        searchId={searchId} 
        setSearchId={setSearchId} 
      />

      {/* Clear Button */}
      <button onClick={clearSearchAndFilter}>Clear Search and Filter</button>

      {/* Display Searched Agent */}
      {searchedAgent ? (
        <div>
          <h3>Searched Agent:</h3>
          <strong>Agent ID:</strong> {searchedAgent.agentId}<br />
          <strong>Email:</strong> {searchedAgent.email}<br />
          <strong>Category Name:</strong> {searchedAgent.categoryName}<br />
          <strong>Availability Status:</strong> {searchedAgent.availabilityStatus}<br />
        </div>
      ) : (
        <ul>
          {teamData.map((agent) => (
            <li key={agent.agentId}>
              <strong>Agent ID:</strong> {agent.agentId}<br />
              <strong>Email:</strong> {agent.email}<br />
              <strong>Category Name:</strong> {agent.categoryName}<br />
              <strong>Availability Status:</strong> {agent.availabilityStatus}<br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamPerformance;
