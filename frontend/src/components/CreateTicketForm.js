import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography, FormControl, InputLabel, Alert, CircularProgress, IconButton, Divider } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Import the attachment icon
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'; // Import the remove icon
import api from '../services/api'; // Adjust import according to your project structure

const CreateTicketForm = () => {
  const customerId = localStorage.getItem('id');
  const [customerEmail, setCustomerEmail] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [priority, setPriority] = useState('low');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false); // Track file upload status

  // Form validation logic
  const validateForm = () => {
    if (!customerEmail || !categoryName || !subject || !description) {
      setError('Please fill out all required fields.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // Handle file removal
  const handleRemoveFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setUploadingFiles(true); // Show uploading status

    try {
      const formData = new FormData();
      formData.append('customerId', customerId);
      formData.append('customerEmail', customerEmail);
      formData.append('categoryName', categoryName);
      formData.append('priority', priority);
      formData.append('subject', subject);
      formData.append('description', description);

      // Append files to formData
      for (const file of files) {
        formData.append('files', file);
      }

      console.log('Submitting ticket with files:', formData);

      await api.post('/tickets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Ticket created successfully!');
      // Clear the form
      setCustomerEmail('');
      setCategoryName('');
      setPriority('low');
      setSubject('');
      setDescription('');
      setFiles([]);
      // Hide the success message after a few seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Failed to create ticket.');
    } finally {
      setIsLoading(false);
      setUploadingFiles(false); // Hide uploading status
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
        <Box
          sx={{
            mb: 2,
            border: '1px solid #9E9E9E', // Darker grey border
            padding: '16px',
            borderRadius: '8px',
            bgcolor: '#FFFFFF', // Match background color of other fields
          }}
        >
          <Typography variant="body1" sx={{ mb: 2, color: '#9E9E9E' }}> {/* Darker grey text color */}
            Attach Files
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon sx={{ color: '#9E9E9E' }} />} // Darker grey icon color
              sx={{
                borderColor: '#9E9E9E', // Darker grey border color
                color: '#9E9E9E', // Darker grey text color
                '&:hover': { borderColor: '#7D7D7D', color: '#7D7D7D' }, // Even darker grey on hover
              }}
            >
              Select File
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                hidden
              />
            </Button>
          </Box>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Drag and drop files here or click "Select File" to upload
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mt: 2 }}>
            {files.length > 0 && (
              <Typography variant="body2" sx={{ mb: 1, color: '#9E9E9E' }}> {/* Darker grey text color */}
                Attached files:
              </Typography>
            )}
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {files.map((file, index) => (
                <li key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                  {file.name}
                  <IconButton
                    size="small"
                    sx={{ ml: 2, color: '#FF3D00' }}
                    onClick={() => handleRemoveFile(file.name)}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ bgcolor: '#0033A0', '&:hover': { bgcolor: '#002080' }, position: 'relative', mt: 2 }}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Creating...' : 'Create Ticket'}
        </Button>
        {uploadingFiles && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={24} sx={{ mr: 2 }} />
            <Typography variant="body2">Uploading files...</Typography>
          </Box>
        )}
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
