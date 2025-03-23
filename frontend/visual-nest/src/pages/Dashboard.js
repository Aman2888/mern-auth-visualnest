import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Avatar
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/userinfo");
        setUserInfo(res.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch user information"
        );
        if (error.response?.status === 404) {
          navigate("/userinfo");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (loading) {
    return (
      <Container
        component="main"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" sx={{ mt: 8 }}>
        <Card sx={{ p: 4, boxShadow: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography color="error" variant="h6">{error}</Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/userinfo")}
            sx={{ mt: 3 }}
          >
            Complete Your Profile
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Card sx={{ p: 4, boxShadow: 4, borderRadius: 3, bgcolor: "#FBFBFB" }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
              Welcome, {userInfo.firstName}!
            </Typography>
            <Button
              variant="contained"
              onClick={signout}
              sx={{ bgcolor: "#8D77AB", color: "#fff", "&:hover": { bgcolor: "#7A6594" } }}
              startIcon={<LogoutIcon />}
            >
              Sign Out
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar
                src={userInfo.profilePicture}
                sx={{ width: 150, height: 150, bgcolor: "#8D77AB", marginBottom: 2 }}
                onError={(e) => (e.target.src = "/default-avatar.png")}
              >
                {!userInfo.profilePicture && userInfo.firstName.charAt(0)}
              </Avatar>
              <Button
                variant="outlined"
                onClick={() => navigate("/userinfo")}
                sx={{ color: "#8D77AB", borderColor: "#8D77AB" }}
                startIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4A4A4A", mb: 2 }}>
                    Personal Information
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Full Name</Typography>
                    <Typography variant="body1">{userInfo.firstName} {userInfo.lastName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                  <Typography variant="body2" color="textSecondary">Gender</Typography>
                    <Typography variant="body1">{userInfo.gender || "Not specified"}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                  <Typography variant="body2" color="textSecondary">Date of Birth</Typography>
                    <Typography variant="body1">{userInfo.dob || "Not specified"}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Box>
                <Typography variant="body2" color="textSecondary">Phone</Typography>
                <Typography variant="body1">{userInfo.phone || "Not specified"}</Typography>
                </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                  <Typography variant="body2" color="textSecondary">Address</Typography>
                    <Typography variant="body1">{userInfo.address || "Not specified"}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                  <Typography variant="body2" color="textSecondary">City</Typography>
                  <Typography variant="body1">{userInfo.city || "Not specified"}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                  <Typography variant="body2" color="textSecondary">Country</Typography>
                  <Typography variant="body1">{userInfo.country || "Not specified"}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                  <Typography variant="body2" color="textSecondary">Zip Code</Typography>
                  <Typography variant="body1">{userInfo.zipCode || "Not specified"}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;