import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, Typography, Divider } from '@mui/material';

const Sidebar = () => {
  const customerId = localStorage.getItem('id');
  console.log({ customerId });

  return (
    <Box
      sx={{
        width: '220px',
        bgcolor: '#F4F6F9', // Cream color background consistent with other components
        padding: '20px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow to match theme
        borderRadius: '12px', // Rounded corners to match other components
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#0033A0' }}>
        Customer Menu
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ padding: 0 }}>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/view-tickets`}
            style={{
              textDecoration: 'none',
              color: '#333333', // Dark grey text color
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
              transition: 'color 0.3s ease', // Smooth transition for hover effect
            }}
            onMouseEnter={(e) => (e.target.style.color = '#0033A0')} // Change color on hover
            onMouseLeave={(e) => (e.target.style.color = '#333333')} // Revert on mouse leave
          >
            View My Tickets
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/create-ticket`}
            style={{
              textDecoration: 'none',
              color: '#333333',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#0033A0')}
            onMouseLeave={(e) => (e.target.style.color = '#333333')}
          >
            Create a Ticket
          </Link>
        </ListItem>
        {/* <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/closed-tickets`}
            style={{
              textDecoration: 'none',
              color: '#333333',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#0033A0')}
            onMouseLeave={(e) => (e.target.style.color = '#333333')}
          >
            Closed Tickets
          </Link>
        </ListItem> */}
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/find-store`}
            style={{
              textDecoration: 'none',
              color: '#333333',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#0033A0')}
            onMouseLeave={(e) => (e.target.style.color = '#333333')}
          >
            Find a Store
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/help`}
            style={{
              textDecoration: 'none',
              color: '#333333',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#0033A0')}
            onMouseLeave={(e) => (e.target.style.color = '#333333')}
          >
            Help
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/about`}
            style={{
              textDecoration: 'none',
              color: '#333333',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#0033A0')}
            onMouseLeave={(e) => (e.target.style.color = '#333333')}
          >
            About
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to={`/customer/privacy-terms`}
            style={{
              textDecoration: 'none',
              color: '#333333',
              display: 'block',
              padding: '10px 0',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#0033A0')}
            onMouseLeave={(e) => (e.target.style.color = '#333333')}
          >
            Privacy Terms
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
