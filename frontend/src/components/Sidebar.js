import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, Typography, Divider } from '@mui/material';

const Sidebar = () => {
  const customerId = localStorage.getItem('id');
  console.log({ customerId });

  return (
    <Box
      sx={{
        width: '250px',
        bgcolor: '#F5F5DC', // Cream color background
        padding: '20px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
        Customer Menu
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ padding: 0 }}>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/view-tickets`}
            style={{
              textDecoration: 'none',
              color: '#6F4F28', // Darker shade of light brown for text
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
            }}
          >
            View My Tickets
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/create-ticket`}
            style={{
              textDecoration: 'none',
              color: '#6F4F28',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
            }}
          >
            Create a Ticket
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/closed-tickets`}
            style={{
              textDecoration: 'none',
              color: '#6F4F28',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
            }}
          >
            Closed Tickets
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/find-store`}
            style={{
              textDecoration: 'none',
              color: '#6F4F28',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
            }}
          >
            Find a Store
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/help`}
            style={{
              textDecoration: 'none',
              color: '#6F4F28',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
            }}
          >
            Help
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/about`}
            style={{
              textDecoration: 'none',
              color: '#6F4F28',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
            }}
          >
            About
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/privacy-terms`}
            style={{
              textDecoration: 'none',
              color: '#6F4F28',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
            }}
          >
            Privacy Terms
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
