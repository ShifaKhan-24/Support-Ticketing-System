import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, IconButton, Popover } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Profile from './Profile'; // Ensure the correct path to your Profile component

const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the popover anchor

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#0033A0' : '#333333',
    display: 'block',
    padding: '10px 0',
    fontWeight: location.pathname === path ? '600' : '500',
    transition: 'color 0.3s ease',
  });

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the clicked icon
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the popover
  };

  const open = Boolean(anchorEl); // Determine if the popover is open
  const id = open ? 'simple-popover' : undefined; // Set the id for the popover

  return (
    <Box
      sx={{
        width: '180px',
        bgcolor: '#F4F6F9',
        padding: '20px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton sx={{ color: '#0033A0' }} onClick={handleProfileClick}>
          <AccountCircleIcon />
        </IconButton>
      </Box>
      {/* <Divider sx={{ mb: 2 }} /> */}
      <List sx={{ padding: 0 }}>
        <ListItem sx={{ padding: 0 }}>
          <Link to={`/customer/view-tickets`} style={linkStyle('/customer/view-tickets')}>
            View My Tickets
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link to={`/customer/create-ticket`} style={linkStyle('/customer/create-ticket')}>
            Create a Ticket
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link to={`/customer/help`} style={linkStyle('/customer/help')}>
            Help
          </Link>
        </ListItem>
      </List>

      {/* Profile Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        
        PaperProps={{
          style: { marginTop: 40, marginRight: 20 }, // Add extra margin for more bottom-right effect
        }}
      >
          <Profile />
      </Popover>
    </Box>
  );
};

export default Sidebar;
