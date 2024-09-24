import React, { useState, useEffect } from 'react';
import { MenuItem, Select, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';

const PriorityUpdate = ({ ticketId, initialPriority, onUpdate }) => {
  const [priority, setPriority] = useState(initialPriority);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, value: '' });

  const token = localStorage.getItem('token');

  // Reset the priority when ticketId or initialPriority change
  useEffect(() => {
    setPriority(initialPriority);
  }, [ticketId, initialPriority]);

  const showToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const openConfirmDialog = (value) => {
    setConfirmDialog({ open: true, value });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ open: false, value: '' });
  };

  const handleConfirmedChange = async () => {
    closeConfirmDialog();
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.put(`/tickets/${ticketId}/priority`, { priority: confirmDialog.value }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      // Check if the response indicates a successful update
      if (response.status === 200) {
        setPriority(confirmDialog.value);
        showToast('Priority updated successfully!');
        onUpdate(); // Notify parent component of the change
      } else {
        // Handle unexpected response
        throw new Error('Unexpected response from server');
      }
    } catch (err) {
      // Only set the error if it's not a success response
      console.log(err);
      setError(err.response?.data?.message || 'Failed to update priority');
    } finally {
      setLoading(false);
    }
  };
  

  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    openConfirmDialog(newPriority);
  };

  return (
    <Box sx={{ mt: 1, p: 1 }}>
      <ToastContainer />
      
      <Select
        value={priority}
        onChange={handlePriorityChange}
        sx={{
          height: 35,
          maxWidth: '150px',
          borderRadius: '4px',
          fontSize: '0.875rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ccc',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#888',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0056b3',
          },
        }}
        variant="outlined"
        fullWidth
        disabled={loading}
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </Select>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {loading && <Typography sx={{ mt: 2 }}>Updating...</Typography>}

      <Dialog
        open={confirmDialog.open}
        onClose={closeConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Confirm Priority Change
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to change the priority to "{confirmDialog.value}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmedChange} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PriorityUpdate;
