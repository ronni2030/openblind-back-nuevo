import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '../components/AnimatedButton.jsx';

/**
 * Página principal (Dashboard)
 */
export const Dashboard = ({ onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="page-container"
    >
      <div className="logo-container">
        <span className="material-icons-round" style={{ fontSize: '5rem', color: 'var(--neon-purple)' }}>
          accessibility_new
        </span>
        <h1 className="app-title">OpenBlind</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>
          Accesibilidad para todos
        </p>
      </div>

      <div className="dashboard-grid">
        <AnimatedButton
          className="dashboard-card"
          onClick={() => onNavigate('lugares')}
        >
          <span className="material-icons-round" style={{ fontSize: '3rem' }}>
            place
          </span>
          <div className="card-title">Lugares Favoritos</div>
          <div className="card-subtitle">Guarda y navega a tus lugares</div>
        </AnimatedButton>

        <AnimatedButton
          className="dashboard-card"
          onClick={() => onNavigate('contactos')}
        >
          <span className="material-icons-round" style={{ fontSize: '3rem' }}>
            contacts
          </span>
          <div className="card-title">Contactos de Emergencia</div>
          <div className="card-subtitle">Llama rápidamente en emergencias</div>
        </AnimatedButton>
      </div>
    </motion.div>
  );
};
