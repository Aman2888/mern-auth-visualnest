// File: src/pages/SignIn.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });

  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const checkUserInfo = async () => {
        try {
          await axios.get('http://localhost:5000/api/userinfo');
          navigate('/dashboard');
        } catch (error) {
          navigate('/userinfo');
        }
      };

      checkUserInfo();
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!formData.email) {
      errors.email = 'Email is required';
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { email, password } = formData;
      const result = await signin(email, password);

      if (result.success) {
        // Check if user has completed profile
        try {
          await axios.get('http://localhost:5000/api/userinfo');
          navigate('/dashboard');
        } catch (error) {
          // If user info doesn't exist, redirect to user info form
          navigate('/userinfo');
        }
      } else {
        setAlert({
          show: true,
          severity: 'error',
          message: result.error
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 3, color: "#6A6A6A" }}>
            Please enter your credentials to sign in.
          </Typography>

          {alert.show && (
            <Alert severity={alert.severity} sx={{ width: '100%', mt: 2 }}>
              {alert.message}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: '#7A6594' }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "#8D77AB", fontWeight: "bold" }}>
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;