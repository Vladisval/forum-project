import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { AppBar, Avatar, Box, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { userById } from "../../entities/user/model/userSlice.ts";
import { RootState } from "../../app/store/store.ts";

const Header : React.FC = () => {

  const location = useLocation();
  const [currentTab, setCurrentTab] = useState<string | null>('/')
  const user = useSelector((state: RootState) => userById(state,1));

  useEffect(() => {
    if (location.pathname === '/' || location.pathname.includes('post')) {
      setCurrentTab('/');
    }
    if (location.pathname.includes('users')) {
      setCurrentTab('/users')
    }
    if (location.pathname.includes('profile')){
      setCurrentTab(null);
    }
  }, [location.pathname])

  return (
    <AppBar sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0 20px" }} >
      <Box display="flex" alignItems="center" >
        <Typography className="header-title">Vladislav's forum</ Typography>
      </Box>

      <Box display="flex" justifyContent="center" p={2} gap={2}>
        <Tabs value={currentTab}   textColor="secondary" indicatorColor="secondary" >
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
      <Box component={Link} to="/profile" display="flex" alignItems="center">
        <Avatar src={user ? user.avatarUrl : ''} alt={user ? user.name : 'unknown'} />
      </Box>
    </AppBar>
  );
};

export default Header;