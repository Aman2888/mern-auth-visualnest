import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#8D77AB" }}>
      <Toolbar>
        {/* Website Name / Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          VisualNest
        </Typography>

        {/* Desktop Navigation */}
        <Button component={Link} to="/home" color="inherit" sx={{ display: { xs: "none", md: "block" } }}>Home</Button>

        <Button component={Link} to="/signin" sx={{ display: { xs: "none", md: "block", color: "white" } }}>
          Sign In
        </Button>
        <Button variant="contained" component={Link} to="/signup" sx={{ bgcolor: "#F9F6E6", color: "#8D77AB", ml: 2, "&:hover": { bgcolor: "#E1EACD" } }}>
          Sign Up
        </Button>

        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu Items */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem component={Link} to="/home" onClick={handleMenuClose}>Home</MenuItem>
          {/* <MenuItem component={Link} to="/sigin" onClick={handleMenuClose}>Sign In</MenuItem> */}
          <MenuItem component={Link} to="/signin" onClick={handleMenuClose}>
            Sign In
          </MenuItem>
          <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>Sign Up</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
