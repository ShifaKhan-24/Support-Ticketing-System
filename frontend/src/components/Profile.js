import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, CircularProgress, Divider, Box } from '@mui/material';
import api from '../services/api';
import LogoutButton from './LogoutButton';
import AvailabilityButton from './AvailabilityButton';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');
  const [roleDetails, setRoleDetails] = useState(null); // State for role-specific details

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      const userRole = localStorage.getItem('role');
      setRole(userRole);

      if (!userId) {
        console.error('No user ID found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchRoleDetails = async () => {
      if (!user || !role) return;

      try {
        let response;
        const token = localStorage.getItem('token');

        if (role === 'agent') {
          const agentId = localStorage.getItem('id');
          console.log(agentId);
          response = await api.get(`/agents/agentId/${agentId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRoleDetails(response.data);
        } else if (role === 'customer') {
          const customerId = localStorage.getItem('roleId');

          response = await api.get(`/customers/${customerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRoleDetails(response.data);
        } else if (role === 'manager') {
          const managerId = localStorage.getItem('roleId');
          response = await api.get(`/managers/${managerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRoleDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching role-specific data', error);
      }
    };

    fetchRoleDetails();
  }, [user, role]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper
        elevation={0}
        sx={{
          padding: '24px',
          minWidth: '250px', // Increase width here to make it wider
          width: '100%',
          margin: '0 auto',
          border: '1px solid #e0e0e0',
          // borderRadius: '12px',
          boxShadow: 'none',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: '500', color: '#333' }}>
          {user.fullName}
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          {user.email}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">Phone: {user.phone ? user.phone : 'Not provided'}</Typography>
            {/* <Typography variant="body1" sx={{ color: '#555' }}>
              {user.phone ? user.phone : 'Not provided'}
            </Typography> */}
          
            {roleDetails && (
              <>
                {role === 'agent' && (
                  <>
                    <Typography variant="body2" color="textSecondary">Agent ID: {roleDetails.agentId}</Typography>
                    {/* <Typography variant="body1" sx={{ color: '#555' }}>{roleDetails.agentId}</Typography> */}

                    <Typography variant="body2" color="textSecondary">Category: {roleDetails.categoryName}</Typography>
                    {/* <Typography variant="body1" sx={{ color: '#555' }}>{roleDetails.categoryName}</Typography> */}

                    <Typography variant="body2" color="textSecondary">Status: <AvailabilityButton  agentId={roleDetails.agentId} /></Typography>
                    {/* <Typography variant="body1" sx={{ color: '#555' }}>{roleDetails.availabilityStatus}</Typography> */}
                  </>
                )}
                {role === 'customer' && (
                  <>
                    <Typography variant="body2" color="textSecondary">Address: {roleDetails.address}</Typography>
                    {/* <Typography variant="body1" sx={{ color: '#555' }}>{roleDetails.address}</Typography> */}
                  </>
                )}
                {role === 'manager' && (
                  <>
                    <Typography variant="body2" color="textSecondary">Manager ID: {roleDetails.managerId}</Typography>
                    {/* <Typography variant="body1" sx={{ color: '#555' }}>{roleDetails.managerId}</Typography> */}

                    <Typography variant="body2" color="textSecondary">Department: {roleDetails.department}</Typography>
                    {/* <Typography variant="body1" sx={{ color: '#555' }}>{roleDetails.department}</Typography> */}
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        <LogoutButton />
      </Paper>
    </Box>
  );
};

export default Profile;
