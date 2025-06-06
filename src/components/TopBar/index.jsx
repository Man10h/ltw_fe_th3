import React, { useEffect, useState, useRef } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './styles.css';

function TopBar() {
  const nav = useNavigate();

 return (
  <AppBar position="absolute" className="topbar-appbar">
    <Toolbar className="topbar-toolbar">
      {/* Trái: Username */}
      <Box className="topbar-left">
        <Typography variant="h6" className="topbar-username">
          {"PhotoShare"}
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

}

export default TopBar;