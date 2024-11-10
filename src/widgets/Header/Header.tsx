import React from 'react';
import './Header.scss'

const Header : React.FC = () => {
  return (    <header className="header">
      <h1 className="header__title">Vladislav's forum</h1>
      <h2 className="header__subtitle">Your go-to platform for learning and resources</h2>
      <nav className="header__nav">
        <a href="/public" className="header__link">Home</a>
        <a href="/about" className="header__link">About</a>
        <a href="/contact" className="header__link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;