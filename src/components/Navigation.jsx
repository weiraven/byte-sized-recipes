import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navigation = () => {
  return (
    <header className="navbar">
      <h1>Byte-Sized Recipes</h1>
      <nav className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/about">About</Link>
        <Link to="/viewed">Viewed Bytes</Link>
      </nav>
    </header>
  );
};

export default Navigation;
