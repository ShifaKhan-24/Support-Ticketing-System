import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh'; // Import the Refresh icon
import api from '../services/api';
import TicketStats from './TicketStats';
import SearchTicketById from './SearchTicketById';
import TicketCommunications from './TicketCommunications'; // Import the TicketCommunications component
import DashboardOverview from './DashboardOverview'; // Import the DashboardOverview component
import AssignAgent from './AssignAgent';
import PriorityUpdate from './PriorityUpdate';

const TicketOverview = () => {
  const [ticketData, setTicketData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [createdDate, setCreatedDate] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [resetSearch, setResetSearch] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

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
    setSelectedTicket(null);
    setTimeout(() => setResetSearch(false), 0);
  };

  const handleTicketClick = (ticketId) => {
    const ticket = searchResult ? searchResult : ticketData.find(t => t.ticketId === ticketId);
    setSelectedTicket(ticket);
  };
  const refreshTicketData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/tickets', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setTicketData(response.data);
      if (selectedTicket) {
        const updatedTicket = response.data.find(ticket => ticket._id === selectedTicket._id);
        setSelectedTicket(updatedTicket);
      }
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'success';
      case 'closed': return 'error';
      case 'in progress': return 'warning';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#FFFFFF' }}>
      <Grid container sx={{ flex: 1, height: '100%' }}>
        {/* Left Side - Search and Filters */}
        <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #DDDDDD', padding: '20px', overflowY: 'auto' }}>
          {/* Search with Clear Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <SearchTicketById onSearchResult={setSearchResult} resetSearch={resetSearch} />
            <IconButton
              onClick={clearFiltersAndSearch}
              sx={{
                marginLeft: '8px',
                backgroundColor: '#F0F0F0',
                '&:hover': { backgroundColor: '#E0E0E0' }
              }}
            >
              <RefreshIcon sx={{ color: '#333333' }} />
            </IconButton>
          </Box>

          {/* Filters */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="technical">Technical</MenuItem>
                  <MenuItem value="billing">Billing</MenuItem>
                  {/* Add more categories as needed */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Ticket List */}
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', marginTop: '20px' }}>
            {searchResult ? (
              <Card
                key={searchResult.ticketId}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '10px', border: `1px solid ${getStatusColor(searchResult.status)}` }}>
                <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">ID: {searchResult.ticketId}</Typography>
                  <Chip label={searchResult.status} color={getStatusColor(searchResult.status)} />
                  <Chip label={searchResult.priority} color={getPriorityColor(searchResult.priority)} />
                </CardContent>
              </Card>
            ) : (
              ticketData.map(ticket => (
                <Card
                  key={ticket.ticketId}
                  onClick={() => handleTicketClick(ticket.ticketId)}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '10px', border: `1px solid ${getStatusColor(ticket.status)}` }}>
                  <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">ID: {ticket.ticketId}</Typography>
                    <Chip label={ticket.status} color={getStatusColor(ticket.status)} />
                    <Chip label={ticket.priority} color={getPriorityColor(ticket.priority)} />
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Grid>

        {/* Right Side - Ticket Details and Communications */}
        <Grid item xs={12} md={8} sx={{ padding: '20px', overflowY: 'auto', height: '100%' }}>
          {selectedTicket ? (
            <Card sx={{ p: 3, borderRadius: '8px', mb: 3, bgcolor: '#FFFFFF' }}>
              <Typography variant="h5" sx={{ color: '#007BFF', mb: 2 }}>
                Ticket Details - #{selectedTicket.ticketId}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}><strong>Customer Email:</strong> {selectedTicket.customerEmail}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}><strong>Category:</strong> {selectedTicket.categoryName}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}><strong>Subject:</strong> {selectedTicket.subject}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}><strong>Description:</strong> {selectedTicket.description}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}><strong>AgentId:</strong> {selectedTicket.agentId}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}><strong>Assign/Reassign the ticket:</strong></Typography>
                {/* Include the AssignAgent component */}
                <AssignAgent ticketId={selectedTicket._id} onAssign={refreshTicketData} />
                <Typography variant="body1" sx={{ mb: 2 }}><strong>Created At:</strong> {new Date(selectedTicket.created_at).toLocaleDateString()}</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}><strong>Updated At:</strong> {new Date(selectedTicket.updated_at).toLocaleDateString()}</Typography>
                <Chip label={`Status: ${selectedTicket.status}`} color={getStatusColor(selectedTicket.status)} sx={{ mb: 2 }} />
                <Chip label={`Priority: ${selectedTicket.priority}`} color={getPriorityColor(selectedTicket.priority)} sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ mb: 1 }}><strong>Update Priority:</strong></Typography>
                {/* Ticket Actions */}
                <PriorityUpdate 
                  ticketId={selectedTicket._id}
                  initialPriority={selectedTicket.priority} 
                  onUpdate={refreshTicketData} // Refresh data after action
                />  
                <Typography variant="body1" sx={{ mb: 1 }}><strong>Discussion:</strong></Typography>
                {/* Ticket Communications */}
              <TicketCommunications ticketId={selectedTicket.ticketId} />            
              </CardContent>
              

              
            </Card>
          ) : (
            <>
              <TicketStats/>
              <DashboardOverview /> {/* Render the DashboardOverview component here */}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TicketOverview;
