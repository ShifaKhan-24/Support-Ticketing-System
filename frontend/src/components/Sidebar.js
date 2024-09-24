import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, Typography, Divider } from '@mui/material';

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#0033A0' : '#333333', // Change color for the active link
    display: 'block',
    padding: '10px 0',
    fontWeight: location.pathname === path ? '600' : '500', // Make active link bold
    transition: 'color 0.3s ease',
  });

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
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#0033A0' }}>
        Main Menu
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ padding: 0 }}>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/view-tickets`}
            style={linkStyle('/customer/view-tickets')}
          >
            View My Tickets
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/create-ticket`}
            style={linkStyle('/customer/create-ticket')}
          >
            Create a Ticket
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/find-store`}
            style={linkStyle('/customer/find-store')}
          >
            Find a Store
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/help`}
            style={linkStyle('/customer/help')}
          >
            Help
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/about`}
            style={linkStyle('/customer/about')}
          >
            About
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/privacy-terms`}
            style={linkStyle('/customer/privacy-terms')}
          >
            Privacy Terms
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
