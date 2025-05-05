import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiHome } from 'react-icons/fi';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-icon">
        <FiAlertCircle size={64} />
      </div>
      <h1>Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link to="/" className="home-button">
        <FiHome />
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;