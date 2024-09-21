import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SearchTicketById from './SearchTicketById';

const TicketOverview = () => {
  const [ticketData, setTicketData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [createdDate, setCreatedDate] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [resetSearch, setResetSearch] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null); // Track selected ticket ID

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/tickets', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          params: {
            status: filterStatus === 'all' ? undefined : filterStatus,
            priority: filterPriority === 'all' ? undefined : filterPriority,
            category: filterCategory === 'all' ? undefined : filterCategory,
            createdDate: createdDate || undefined,
          },
        });
        setTicketData(response.data);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchTickets();
  }, [filterStatus, filterPriority, filterCategory, createdDate]);

  const clearFiltersAndSearch = () => {
    setFilterStatus('all');
    setFilterPriority('all');
    setFilterCategory('all');
    setCreatedDate('');
    setSearchResult(null);
    setResetSearch(true);
    setSelectedTicketId(null); // Reset selected ticket on clear
    setTimeout(() => setResetSearch(false), 0);
  };

  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId);
  };

  return (
    <div>
      <h2>Ticket Overview</h2>

      {/* Filter UI */}
      <div>
        <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select onChange={(e) => setFilterPriority(e.target.value)} value={filterPriority}>
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Category Filter */}
        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="all">All Categories</option>
          <option value="billing">Billing</option>
          <option value="technical">Technical</option>
        </select>

        {/* Created Date Filter */}
        <input
          type="date"
          value={createdDate}
          onChange={(e) => setCreatedDate(e.target.value)}
          placeholder="Created Date"
        />
      </div>

      {/* Search Component */}
      <SearchTicketById onSearchResult={setSearchResult} resetSearch={resetSearch} />

      {/* Clear Button */}
      <button onClick={clearFiltersAndSearch}>Clear Filters and Search</button>

      {/* Display ticket information */}
      <ul>
        {searchResult ? (
          <li key={searchResult.ticketId} onClick={() => handleTicketClick(searchResult.ticketId)}>
            <strong>Ticket ID:</strong> {searchResult.ticketId} <br />
            <strong>Status:</strong> {searchResult.status} <br />
            <strong>Priority:</strong> {searchResult.priority} <br />
            <strong>Agent ID:</strong> {searchResult.agentId || 'Unassigned'} <br />
            {/* Show full details on click */}
            {selectedTicketId === searchResult.ticketId && (
              <>
                <strong>Category:</strong> {searchResult.categoryName} <br />
                <strong>Subject:</strong> {searchResult.subject} <br />
                <strong>Description:</strong> {searchResult.description} <br />
                <strong>Customer Email:</strong> {searchResult.customerEmail} <br />
                <strong>Created At:</strong> {new Date(searchResult.created_at).toLocaleString()} <br />
                <strong>Updated At:</strong> {searchResult.updated_at ? new Date(searchResult.updated_at).toLocaleString() : 'N/A'} <br />
              </>
            )}
          </li>
        ) : (
          ticketData.map((ticket) => (
            <li key={ticket.ticketId} onClick={() => handleTicketClick(ticket.ticketId)}>
              <strong>Ticket ID:</strong> {ticket.ticketId} <br />
              <strong>Status:</strong> {ticket.status} <br />
              <strong>Priority:</strong> {ticket.priority} <br />
              <strong>Agent ID:</strong> {ticket.agentId || 'Unassigned'} <br />
              {/* Show full details on click */}
              {selectedTicketId === ticket.ticketId && (
                <>
                  <strong>Category:</strong> {ticket.categoryName} <br />
                  <strong>Subject:</strong> {ticket.subject} <br />
                  <strong>Description:</strong> {ticket.description} <br />
                  <strong>Customer Email:</strong> {ticket.customerEmail} <br />
                  <strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()} <br />
                  <strong>Updated At:</strong> {ticket.updated_at ? new Date(ticket.updated_at).toLocaleString() : 'N/A'} <br />
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TicketOverview;
