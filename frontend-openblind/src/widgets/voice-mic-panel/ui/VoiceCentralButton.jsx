import React from 'react';
import { speak } from '../../../application/utils/speechUtils';
import '../styles.css';

export const VoiceCentralButton = ({ isListening, onToggle }) => {
  const vibrate = (pattern = [100]) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleClick = () => {
    vibrate([50, 100, 50]);
    onToggle();

    if (!isListening) {
      speak('Estoy escuchando');
    } else {
      speak('Comandos desactivados');
    }
  };

  return (
    <div className="voice-central">
      <button
        className={`voice-pulse-btn ${isListening ? 'listening' : ''}`}
        onClick={handleClick}
        aria-label="Activar comando de voz"
      >
        <span className="material-icons-round">
          {isListening ? 'graphic_eq' : 'mic'}
        </span>
      </button>
    </div>
  );
};
