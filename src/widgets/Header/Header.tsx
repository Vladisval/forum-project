import React from 'react';
import './Header.scss'
import { Link, useLocation } from "react-router-dom";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";

const Header : React.FC = () => {

  const location = useLocation();
  const currentTab = location.pathname;

  return (
    <AppBar sx={{display: "flex", flexDirection: "row"}} >
      <Box display="flex" alignItems="center" >
        <Typography className="header-title">Vladislav's forum</ Typography>
      </Box>

      <Box display="flex" justifyContent="center" p={2} gap={2}>
        <Tabs value={currentTab}>
          <Tab
            label="Posts"
            value="/"
            component={Link}
            to="/"
            sx={{ minWidth: 100, background: "white" }}
          />
          <Tab
            label="Users"
            value="/users"
            component={Link}
            to="/users"
            sx={{ minWidth: 100,  background: "white" }}
          />
        </Tabs>
      </Box>
    </AppBar>
  );
};

export default Header;