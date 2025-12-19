import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './presentation/styles/index.css';

// Configuración y Dependencias
import {
  speechService,
  lugarUseCases,
  contactoUseCases,
  voiceCommandService,
  ID_CLIENTE
} from './config.js';

// Hooks
import { useSpeech } from './application/hooks/useSpeech.js';
import { useLugares } from './application/hooks/useLugares.js';
import { useContactos } from './application/hooks/useContactos.js';

// Componentes de Presentación
import { StarBackground } from './presentation/components/StarBackground.jsx';
import { VoiceButton } from './presentation/components/VoiceButton.jsx';
import { Dashboard } from './presentation/pages/Dashboard.jsx';
import { LoadingSpinner } from './presentation/components/LoadingSpinner.jsx';

/**
 * Componente Principal de la Aplicación
 * Implementa Arquitectura Hexagonal
 */
function App() {
  // Estados de navegación
  const [currentView, setCurrentView] = useState('dashboard');

  // Hooks personalizados (Capa de Aplicación)
  const { isListening, speak, startListening } = useSpeech(speechService);
  const lugares = useLugares(lugarUseCases, ID_CLIENTE);
  const contactos = useContactos(contactoUseCases, ID_CLIENTE);

  /**
   * Manejar comandos de voz
   */
  const handleVoiceCommand = async (transcript) => {
    console.log('🎤 Comando:', transcript);

    const result = await voiceCommandService.processCommand(transcript, {
      currentView
    });

    // Procesar resultado del comando
    if (result.type === 'VIEW_CHANGE') {
      setCurrentView(result.view);
    } else if (result.type === 'CREATE_LUGAR') {
      await lugares.loadLugares();
    } else if (result.type === 'CREATE_CONTACTO') {
      await contactos.loadContactos();
    }
  };

  /**
   * Iniciar comando de voz
   */
  const handleVoiceButtonClick = () => {
    if (!isListening) {
      speak('Escuchando comando');
      startListening(handleVoiceCommand);
    }
  };

  /**
   * Navegar entre vistas
   */
  const handleNavigate = async (view) => {
    setCurrentView(view);

    if (view === 'dashboard') {
      speak('Dashboard');
    } else if (view === 'lugares') {
      speak(`Lugares favoritos. Tienes ${lugares.lugares.length} lugares guardados`);
    } else if (view === 'contactos') {
      speak(`Contactos de emergencia. Tienes ${contactos.contactos.length} contactos`);
    }
  };

  /**
   * Renderizar vista actual
   */
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;

      case 'lugares':
        return (
          <div style={{ padding: '20px', color: 'white' }}>
            <h2>Lugares Favoritos</h2>
            <button onClick={() => handleNavigate('dashboard')}>Volver</button>
            {lugares.loading && <LoadingSpinner />}
            {lugares.lugares.map(lugar => (
              <div key={lugar.idLugarFavorito} style={{ padding: '10px', border: '1px solid white', margin: '10px 0' }}>
                <h3>{lugar.nombreLugar}</h3>
                <p>{lugar.direccion}</p>
                <button onClick={() => lugares.navigateToLugar(lugar.idLugarFavorito)}>
                  Navegar
                </button>
                <button onClick={() => lugares.deleteLugar(lugar.idLugarFavorito)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        );

      case 'contactos':
        return (
          <div style={{ padding: '20px', color: 'white' }}>
            <h2>Contactos de Emergencia</h2>
            <button onClick={() => handleNavigate('dashboard')}>Volver</button>
            {contactos.loading && <LoadingSpinner />}
            {contactos.contactos.map(contacto => (
              <div key={contacto.idContactoEmergencia} style={{ padding: '10px', border: '1px solid white', margin: '10px 0' }}>
                <h3>{contacto.nombreContacto}</h3>
                <p>{contacto.telefono}</p>
                {contacto.relacion && <p>Relación: {contacto.relacion}</p>}
                <button onClick={() => contactos.callContacto(contacto.idContactoEmergencia)}>
                  Llamar
                </button>
                <button onClick={() => contactos.deleteContacto(contacto.idContactoEmergencia)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        );

      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      <StarBackground />

      <AnimatePresence mode="wait">
        {renderView()}
      </AnimatePresence>

      <VoiceButton
        isListening={isListening}
        onClick={handleVoiceButtonClick}
      />
    </div>
  );
}

export default App;
