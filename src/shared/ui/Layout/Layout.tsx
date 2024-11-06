import React from 'react';
import './Layout.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;