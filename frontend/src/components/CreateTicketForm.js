import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography, FormControl, InputLabel, Alert, CircularProgress } from '@mui/material';
import api from '../services/api'; // Adjust import according to your project structure

const CreateTicketForm = () => {
  const customerId = localStorage.getItem('id');
  const [customerEmail, setCustomerEmail] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [priority, setPriority] = useState('low');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form validation logic
  const validateForm = () => {
    if (!customerEmail || !categoryName || !subject || !description) {
      setError('Please fill out all required fields.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

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
      setSuccessMessage('Ticket created successfully!');
      // Clear the form
      setCustomerEmail('');
      setCategoryName('');
      setSubject('');
      setDescription('');
      // Hide the success message after a few seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Failed to create ticket.');
    } finally {
      setIsLoading(false);
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
        position: 'relative', // For positioning the loading indicator
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#0033A0' }}>
        Create a New Ticket
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
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
            sx={{ bgcolor: '#FFFFFF' }} // White background for input
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
            sx={{ bgcolor: '#FFFFFF' }} // White background for input
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
            sx={{ bgcolor: '#FFFFFF' }} // White background for input
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ bgcolor: '#0033A0', '&:hover': { bgcolor: '#002080' }, position: 'relative' }} // Make button relative for proper alignment
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Creating...' : 'Create Ticket'}
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </form>
    </Box>
  );
};

export default CreateTicketForm;
