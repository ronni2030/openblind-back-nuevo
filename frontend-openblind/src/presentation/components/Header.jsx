import React from 'react';

/**
 * Componente de header/navbar con botón de regreso
 */
export const Header = ({ title, onBack }) => (
  <div className="navbar">
    <button
      onClick={onBack}
      style={{
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <span className="material-icons-round">arrow_back_ios</span>
    </button>
    <span className="navbar-title">{title}</span>
    <div style={{ width: 24 }}></div>
  </div>
);
