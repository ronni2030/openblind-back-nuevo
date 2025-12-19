import React from 'react';
import { motion } from 'framer-motion';

/**
 * Botón flotante de comandos de voz
 */
export const VoiceButton = ({ isListening, onClick }) => (
  <motion.button
    className="btn-fab"
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    animate={isListening ? { scale: [1, 1.2, 1] } : {}}
    transition={isListening ? { repeat: Infinity, duration: 1 } : {}}
  >
    <span className="material-icons-round" style={{ fontSize: '2rem' }}>
      {isListening ? 'mic' : 'mic_none'}
    </span>
    <div style={{ fontSize: '0.7rem', marginTop: '4px' }}>
      {isListening ? 'ESCUCHANDO...' : 'COMANDO DE VOZ'}
    </div>
  </motion.button>
);
