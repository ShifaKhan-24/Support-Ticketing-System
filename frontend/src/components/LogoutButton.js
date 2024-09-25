import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout'; // Replace with your desired logout icon

const LogoutButton = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = () => {
    setOpenDialog(true);
  };

  const handleConfirmLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Navigate to the login page
    navigate('/');
  };

  const handleCancelLogout = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <IconButton onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
      <Dialog open={openDialog} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleConfirmLogout}>
            Logout
          </Button>
          <Button variant="outlined" color="primary" onClick={handleCancelLogout}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;