import React, { useState, useEffect } from 'react';
import { MenuItem, Select, Box, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';

const TicketActions = ({ ticketId, initialStatus, initialPriority, onUpdate }) => {
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState(initialPriority);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', value: '' });

  const token = localStorage.getItem('token');

  // Reset the status and priority when ticketId, initialStatus, or initialPriority change
  useEffect(() => {
    setStatus(initialStatus);
    setPriority(initialPriority);
  }, [ticketId, initialStatus, initialPriority]);

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

  const openConfirmDialog = (type, value) => {
    setConfirmDialog({ open: true, type, value });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ open: false, type: '', value: '' });
  };

  const handleConfirmedChange = async () => {
    closeConfirmDialog();
    setLoading(true);
    setError(null);

    try {
      if (confirmDialog.type === 'status') {
        await api.put(`/tickets/${ticketId}/status`, { status: confirmDialog.value }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setStatus(confirmDialog.value);
        showToast('Status updated successfully!');
      } else if (confirmDialog.type === 'priority') {
        await api.put(`/tickets/${ticketId}/priority`, { priority: confirmDialog.value }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setPriority(confirmDialog.value);
        showToast('Priority updated successfully!');
      }

      onUpdate();
    } catch (err) {
      setError(`Failed to update ${confirmDialog.type}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    openConfirmDialog('status', newStatus);
  };

  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    openConfirmDialog('priority', newPriority);
  };

  return (
    <Box sx={{ mt: 1, p: 1 }}>
      <ToastContainer />
      <Grid container alignItems="center">
  <Grid item xs={12}>
    <Box display="flex" alignItems="center">
      <Select
        value={status}
        onChange={handleStatusChange}
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
          marginRight: '4px', // Adjust margin to bring fields closer
        }}
        variant="outlined"
        fullWidth
        disabled={loading}
      >
        <MenuItem value="open">Open</MenuItem>
        <MenuItem value="in progress">In Progress</MenuItem>
        <MenuItem value="closed">Closed</MenuItem>
      </Select>

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
          marginLeft: '4px', // Adjust margin to bring fields closer
        }}
        variant="outlined"
        fullWidth
        disabled={loading}
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </Select>
    </Box>
  </Grid>
</Grid>


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
          Confirm {confirmDialog.type === 'status' ? 'Status' : 'Priority'} Change
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to change the {confirmDialog.type} to "{confirmDialog.value}"?
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

export default TicketActions;
