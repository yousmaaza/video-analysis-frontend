import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUpload, FiClock, FiCheckCircle, FiAlertTriangle, FiPlay } from 'react-icons/fi';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/jobs');
      setJobs(response.data);
      setError(null);
    } catch (error) {
      console.error('Erreur lors de la récupération des jobs:', error);
      setError('Impossible de récupérer la liste des traitements.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="status-icon completed" />;
      case 'error':
        return <FiAlertTriangle className="status-icon error" />;
      default:
        return <FiClock className="status-icon pending" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Date inconnue';
    
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getProgressPercentage = (status) => {
    const statusMap = {
      'initiated': 10,
      'extracting_frames': 20,
      'frames_extracted': 40,
      'creating_batches': 50,
      'batches_created': 60,
      'analyzing': 80,
      'completed': 100,
      'error': 0
    };
    
    return statusMap[status] || 0;
  };

  if (loading) {
    return <LoadingSpinner message="Chargement des traitements vidéo..." />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de bord d'analyse vidéo</h1>
        
        <div className="action-buttons">
          <button onClick={fetchJobs} className="refresh-button">
            Rafraîchir
          </button>
          
          <Link to="/upload" className="upload-button">
            <FiUpload />
            Télécharger une vidéo
          </Link>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          <FiAlertTriangle />
          <p>{error}</p>
        </div>
      )}
      
      {jobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FiPlay size={48} />
          </div>
          <h2>Aucun traitement vidéo</h2>
          <p>Téléchargez votre première vidéo pour commencer l'analyse.</p>
          <Link to="/upload" className="upload-button">
            Télécharger une vidéo
          </Link>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <Link to={`/video/${job.job_id}`} key={job.job_id} className="job-card">
              <div className="job-status">
                {getStatusIcon(job.status)}
              </div>
              
              <div className="job-thumbnail">
                {job.thumbnail_url ? (
                  <img src={job.thumbnail_url} alt="Aperçu vidéo" />
                ) : (
                  <div className="placeholder-thumbnail">
                    <FiPlay />
                  </div>
                )}
              </div>
              
              <div className="job-details">
                <h3 className="job-title">
                  {job.metadata?.filename || `Vidéo ${job.job_id.substring(0, 8)}`}
                </h3>
                
                <div className="job-info">
                  <p className="job-date">
                    Créé le {formatTimestamp(job.created_at)}
                  </p>
                  
                  <div className="job-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${getProgressPercentage(job.status)}%` }}
                        data-status={job.status}
                      />
                    </div>
                    <p className="progress-status">{getStatusText(job.status)}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function getStatusText(status) {
  switch (status) {
    case 'initiated':
      return 'Traitement initialisé';
    case 'extracting_frames':
      return 'Extraction des frames';
    case 'frames_extracted':
      return 'Frames extraites';
    case 'creating_batches':
      return 'Création des batchs';
    case 'batches_created':
      return 'Batchs créés';
    case 'analyzing':
      return 'Analyse en cours';
    case 'completed':
      return 'Terminé';
    case 'error':
      return 'Erreur';
    default:
      return 'Statut inconnu';
  }
}

export default Dashboard;