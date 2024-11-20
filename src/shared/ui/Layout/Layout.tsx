import React from 'react';
import { Container } from "@mui/material";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <>
      <Container component="main" maxWidth="md" sx={{margin: '100px auto 20px auto'}}>
        {children}
      </Container>
    </>
  )
};

export default Layout;