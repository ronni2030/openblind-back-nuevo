import React from 'react';
import { motion } from 'framer-motion';

/**
 * Indicador de carga animado
 */
export const LoadingSpinner = () => (
  <motion.div
    className="loading-spinner"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    style={{
      width: '40px',
      height: '40px',
      border: '4px solid rgba(155, 89, 214, 0.2)',
      borderTop: '4px solid var(--neon-purple)',
      borderRadius: '50%',
      margin: '20px auto'
    }}
  />
);
