import React from 'react';
import './Header.scss'
import { Link } from "react-router-dom";

const Header : React.FC = () => {
  return (    <header className="header">
      <h1 className="header__title">Vladislav's forum</h1>
      <h2 className="header__subtitle">Your go-to platform for learning and resources</h2>
      <nav className="header__nav">
        <Link to="/" className="header__link">Home</Link>
        <Link to="/tasks" className="header__link">Tasks</Link>
      </nav>
    </header>
  );
};

export default Header;