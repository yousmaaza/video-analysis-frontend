import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUpload } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Video Analysis</Link>
      </div>
      
      <ul className="nav-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">
            <FiHome />
            <span>Accueil</span>
          </Link>
        </li>
        <li className={location.pathname === '/upload' ? 'active' : ''}>
          <Link to="/upload">
            <FiUpload />
            <span>Télécharger</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;