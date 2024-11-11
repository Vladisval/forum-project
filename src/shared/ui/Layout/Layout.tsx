import React from 'react';
import './Layout.scss';
import { Container } from "@mui/material";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <>
      <Container className='layout' component="main" maxWidth="md">
        {children}
      </Container>;
    </>
  )
};

export default Layout;