import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Composants
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import UploadVideo from './pages/UploadVideo';
import VideoDetail from './pages/VideoDetail';
import NotFound from './pages/NotFound';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadVideo />} />
            <Route path="/video/:jobId" element={<VideoDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;