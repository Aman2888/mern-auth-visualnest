import React from "react";
import { Box, Button, Container, Grid, Typography, Card} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80vh", bgcolor: "#F5F5F5" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
          Welcome to Our Platform
        </Typography>
        <Typography variant="h5" sx={{ color: "#777", mb: 3 }}>
          Build your profile, connect, and explore amazing features.
        </Typography>
        <Button variant="contained" sx={{ bgcolor: "#8D77AB", color: "#fff", "&:hover": { bgcolor: "#7A6594" } }}>
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>Get Started</Link>
        </Button>
      </Box>

      {/* Key Features Section */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>Key Features</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">Personalized Profile</Typography>
              <Typography variant="body2">Customize your profile with personal details and a unique picture.</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">Secure Authentication</Typography>
              <Typography variant="body2">Your data is safe with secure login and registration options.</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">Interactive Dashboard</Typography>
              <Typography variant="body2">Track your progress and manage your profile easily through a dynamic dashboard.</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container sx={{ py: 5, bgcolor: "#F9F9F9" }}>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>What Our Users Say</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="body1">"I love how easy it is to update my profile and stay connected!"</Typography>
              <Typography variant="body2" sx={{ textAlign: "right" }}>- User A</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="body1">"The dashboard is super helpful for tracking my progress."</Typography>
              <Typography variant="body2" sx={{ textAlign: "right" }}>- User B</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box sx={{ bgcolor: "#333", color: "#fff", py: 3 }}>
        <Container>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2">© 2025 AccessHub</Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item><Link to="/about" style={{ color: "#fff" }}>About Us</Link></Grid>
                <Grid item><Link to="/contact" style={{ color: "#fff" }}>Contact</Link></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
