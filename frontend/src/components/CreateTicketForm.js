import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography, FormControl, InputLabel, Alert } from '@mui/material';
import api from '../services/api'; // Adjust import according to your project structure

const CreateTicketForm = () => {
  const customerId = localStorage.getItem('id');
  const [customerEmail, setCustomerEmail] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [priority, setPriority] = useState('low');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTicket = {
        customerId,
        customerEmail,
        categoryName,
        priority,
        subject,
        description,
      };

      console.log('Submitting ticket:', newTicket);

      await api.post('/tickets', newTicket); // Adjust endpoint as needed
      alert('Ticket created successfully!');
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Failed to create ticket.');
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        bgcolor: '#FFFFFF', // White background for consistency
        maxWidth: '600px',
        margin: 'auto',
        borderRadius: '16px', // Rounded corners to match other components
        boxShadow: 2, // Light shadow for elevation
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#0033A0' }}> {/* Consistent color */}
        Create a New Ticket
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            variant="outlined"
            sx={{ bgcolor: '#F9F9F9' }} // Light gray background for input
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              label="Category"
              required
            >
              <MenuItem value="billing">Billing</MenuItem>
              <MenuItem value="technical">Technical</MenuItem>
              <MenuItem value="network issue">Network Issue</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Priority field removed for customers */}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Subject"
            type="text"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            variant="outlined"
            sx={{ bgcolor: '#F9F9F9' }} // Light gray background for input
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            variant="outlined"
            sx={{ bgcolor: '#F9F9F9' }} // Light gray background for input
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ bgcolor: '#0033A0', '&:hover': { bgcolor: '#002080' } }} // Consistent color and hover
        >
          Create Ticket
        </Button>
      </form>
    </Box>
  );
};

export default CreateTicketForm;
