import React from 'react';
import './Layout.scss';
import { Container } from "@mui/material";
import Header from "../../../widgets/Header/Header.tsx";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <>
      <Header/>
      <Container className='layout' component="main" maxWidth="md">{children}</Container>;
    </>
  )
};

export default Layout;