import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  SnackbarContent,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import api from '../services/api'; // Adjust the path as necessary

const AssignAgent = ({ ticketId, onAssign }) => {
  const [agents, setAgents] = useState([]);
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Fetch the agents when the component mounts
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await api.get('/agents', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust as needed
          },
        });
        setAgents(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch agents');
      }
    };

    fetchAgents();
  }, []);

  const handleAssign = async () => {
    if (loading) return; // Prevent re-entrance
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(`/tickets/${ticketId}/assign`, { agentId: selectedAgentId }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust as needed
        },
      });

      return response.status; // Return response status
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to assign agent');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAssign = async () => {
    setConfirmDialogOpen(false);

    const status = await handleAssign(); // Call handleAssign here

    // Only invoke the onAssign callback if the assignment was successful
    if (status === 200) {
      onAssign();
      setSelectedAgentId(''); // Reset selection
      setNotificationOpen(true); // Show notification
      setTimeout(() => setNotificationOpen(false), 5000); // Hide after 5 seconds
    }
  };

  const handleSnackbarClose = () => {
    setNotificationOpen(false);
  };

  const notificationStyle = {
    backgroundColor: '#4caf50', // Green background for success
    color: 'white', // White text
    borderRadius: '4px',
  };

  return (
    <>
      <Select
        value={selectedAgentId}
        onChange={(e) => {
          setSelectedAgentId(e.target.value);
          setError(null); // Clear the error message when a new agent is selected
        }}
        sx={{
          mt: 1,
          height: '40px',
          width: '220px',
        }}
        variant="outlined"
        displayEmpty 
        disabled={loading}
      >
        <MenuItem value="" disabled>
          Select Agent
        </MenuItem>
        {agents.map((agent) => (
          <MenuItem key={agent.agentId} value={agent.agentId}>
            {agent.email}
          </MenuItem>
        ))}
      </Select>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        onClick={() => {
          if (selectedAgentId) {
            setConfirmDialogOpen(true); // Open the dialog
          }
        }}
        disabled={loading || !selectedAgentId}
        variant="contained"
        sx={{
          borderRadius: '50%', // Make the button circular
          height: '40px',
          width: '40px', // Set a fixed width for a round button effect
          minWidth: '0', // Prevent the button from expanding
          padding: '0', // Remove padding
          boxShadow: 'none', // Remove box shadow
          backgroundColor: 'transparent', // Make background transparent
          '&:hover': {
            backgroundColor: 'transparent', // Keep background transparent on hover
          },
          '&:disabled': {
            backgroundColor: 'transparent', // Keep background transparent when disabled
            color: 'lightgrey', // Maintain light grey color when disabled
          },
        }}
      >
        <CheckCircle sx={{ fontSize: '1.5rem', color: 'grey' }} /> {/* Icon for the button */}
      </Button>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Assignment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to assign this agent?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setConfirmDialogOpen(false);
            setSelectedAgentId(''); // Clear the dropdown selection when canceling
          }} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAssign} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning the notification
      >
        <SnackbarContent
          message="Agent assigned successfully!"
          sx={notificationStyle}
        />
      </Snackbar>
    </>
  );
};

export default AssignAgent;
