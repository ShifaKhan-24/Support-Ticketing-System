import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import api from '../services/api';

const AttachmentButton = ({ ticketId }) => {
  const [open, setOpen] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAttachments = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get(`/tickets/${ticketId}/attachments`);
      console.log(response.data);
      setAttachment(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('No files attached for this ticket.');
      } else {
        setErrorMessage('Error fetching attachments. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    fetchAttachments();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAttachment(null);
  };

  return (
    <div>
      <Button
      variant="contained"
      color="primary"
      onClick={handleClickOpen}
      style={{
        backgroundColor: '#ffffff', // White background
        color: '#9E9E9E', // Text color
        border: '1px solid #9E9E9E', // Thin black border
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: 'none', // Remove shadow
        '&:hover': {
          backgroundColor: '#e0e0e0', // Light gray on hover
        },
      }}
    >
        View Attachments
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Attachments</DialogTitle>
        <DialogContent style={{ padding: '16px' }}>
          {loading ? (
            <CircularProgress />
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : attachment ? (
            <List>
              <ListItem key={attachment._id}>
                <ListItemText
                  primary={attachment.fileUrl}
                  secondary={
                    <>
                      <div>Type: {attachment.fileType}</div>
                    </>
                  }
                />
                <a href={attachment.presignedUrl} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </ListItem>
            </List>
          ) : (
            <p>No files attached for this ticket.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AttachmentButton;