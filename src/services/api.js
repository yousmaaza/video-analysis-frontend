import axios from 'axios';
import { toast } from 'react-toastify';

// Configuration de base de l'API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:7071/api',
  timeout: 30000, // 30 secondes
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour afficher les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'Une erreur est survenue';
    
    // Ne pas afficher d'erreur pour les appels périodiques de statut
    if (!error.config.url.includes('get-status')) {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;