import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  MenuItem,
  Avatar
} from '@mui/material';
import axios from 'axios';

const UserInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    profilePicture: null,
  });

  const [preview, setPreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/userinfo');
        setFormData(res.data);
        if (res.data.profilePicture) setPreview(res.data.profilePicture);
      } catch (error) {
        console.error("Error fetching user info", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('profilePicture', file);
  
  //   try {
  //     await axios.post('http://localhost:5000/api/userinfo/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' }
  //     });
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };
  

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5000/api/userinfo', formData);
        setAlert({ show: true, severity: 'success', message: 'Profile saved successfully!' });
        setTimeout(() => navigate('/dashboard'), 1500);
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: error.response?.data?.message || 'An error occurred'
        });
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={6} sx={{ mt: 8, p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5">Complete Your Profile</Typography>
          {alert.show && <Alert severity={alert.severity} sx={{ width: '100%', mt: 2 }}>{alert.message}</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar src={preview} sx={{ width: 100, height: 100 }}>
              {!preview && 'U'}
            </Avatar>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
              {['firstName', 'lastName', 'phone', 'address', 'city', 'country', 'zipCode'].map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    fullWidth
                    label={field.replace(/([A-Z])/g, ' $1').trim()}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    error={!!formErrors[field]}
                    helperText={formErrors[field]}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dob}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{
                    bgcolor: "#8D77AB",
                    color: "#fff",
                    "&:hover": { bgcolor: "#7A6594" },
                    py: 1.7
                  }}
                >
                  Upload Profile Picture
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    bgcolor: "#4A4A4A",
                    color: "#fff",
                    "&:hover": { bgcolor: "#333" },
                    py: 1.5,
                    mt: 2
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save Profile"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserInfoForm;