import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Grid, Link, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token); // Save the token to local storage
      localStorage.setItem('role', res.data.role); // Save the user role to local storage
      localStorage.setItem('id', res.data.id); // Save the additional ID to local storage
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('roleId', res.data.roleId);
      localStorage.setItem('email', res.data.email);

      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px', // Adjust form width
        margin: '0 auto',
        padding: 3,
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <CssBaseline />
      <Avatar sx={{ m: 1, bgcolor: '#007BFF' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          {'Don\'t have an account? '}
          <Link color="inherit" href="/register">
            Register here
          </Link>
        </Typography>
      </div>
    </Box>
  );
};

export default Login;
