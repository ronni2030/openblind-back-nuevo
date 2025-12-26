import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../../presentation/components/Header';
import { VoiceCentralButton } from '../components/VoiceCentralButton';
import { useConfiguracion } from '../hooks/useConfiguracion';
import useVoiceCommands from '../../../application/hooks/useVoiceCommands';
import { speak } from '../../../application/utils/speechUtils';
import '../styles.css';

export const ConfiguracionNavegacion = ({ onBack }) => {
  const { navegacion, updateNavegacion, resetearConfig } = useConfiguracion();

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate([50]);
  };

  const handleVoiceCommand = (command) => {
    const cmd = command.toLowerCase();

    // Longitud máxima
    if (cmd.includes('cinco kilómetros') || cmd.includes('5 km')) {
      updateNavegacion('longitudMaxima', 5);
      speak('Longitud máxima de ruta: 5 kilómetros');
      vibrate();
    } else if (cmd.includes('diez kilómetros') || cmd.includes('10 km')) {
      updateNavegacion('longitudMaxima', 10);
      speak('Longitud máxima de ruta: 10 kilómetros');
      vibrate();
    } else if (cmd.includes('veinte kilómetros') || cmd.includes('20 km')) {
      updateNavegacion('longitudMaxima', 20);
      speak('Longitud máxima de ruta: 20 kilómetros');
      vibrate();
    }

    // Parada segura
    else if (cmd.includes('parada segura sí') || cmd.includes('activar parada')) {
      updateNavegacion('paradaSegura', true);
      speak('Sugerencia de paradas seguras activada');
      vibrate();
    } else if (cmd.includes('parada segura no') || cmd.includes('desactivar parada')) {
      updateNavegacion('paradaSegura', false);
      speak('Sugerencia de paradas seguras desactivada');
      vibrate();
    }

    // Frecuencia instrucciones
    else if (cmd.includes('frecuencia baja') || cmd.includes('instrucciones bajas')) {
      updateNavegacion('frecuenciaInstrucciones', 'baja');
      speak('Frecuencia de instrucciones baja');
      vibrate();
    } else if (cmd.includes('frecuencia media') || cmd.includes('instrucciones medias')) {
      updateNavegacion('frecuenciaInstrucciones', 'media');
      speak('Frecuencia de instrucciones media');
      vibrate();
    } else if (cmd.includes('frecuencia alta') || cmd.includes('instrucciones altas')) {
      updateNavegacion('frecuenciaInstrucciones', 'alta');
      speak('Frecuencia de instrucciones alta');
      vibrate();
    }

    // Tipo instrucción
    else if (cmd.includes('por distancia') || cmd.includes('instrucción distancia')) {
      updateNavegacion('tipoInstruccion', 'distancia');
      speak('Instrucciones por distancia');
      vibrate();
    } else if (cmd.includes('por tiempo') || cmd.includes('instrucción tiempo')) {
      updateNavegacion('tipoInstruccion', 'tiempo');
      speak('Instrucciones por tiempo');
      vibrate();
    }

    // Alertas
    else if (cmd.includes('alerta desvío sí')) {
      updateNavegacion('alertaDesvio', true);
      speak('Alerta de desvío activada');
      vibrate();
    } else if (cmd.includes('alerta desvío no')) {
      updateNavegacion('alertaDesvio', false);
      speak('Alerta de desvío desactivada');
      vibrate();
    } else if (cmd.includes('alerta obstáculo sí')) {
      updateNavegacion('alertaObstaculo', true);
      speak('Alerta de obstáculo activada');
      vibrate();
    } else if (cmd.includes('alerta obstáculo no')) {
      updateNavegacion('alertaObstaculo', false);
      speak('Alerta de obstáculo desactivada');
      vibrate();
    }

    // Resetear
    else if (cmd.includes('resetear') || cmd.includes('valores por defecto')) {
      resetearConfig('navegacion');
      speak('Configuración de navegación reseteada');
      vibrate();
    }

    // Volver
    else if (cmd.includes('volver') || cmd.includes('atrás')) {
      speak('Volviendo');
      onBack();
    }
  };

  const { isListening, toggleListening } = useVoiceCommands(handleVoiceCommand);

  useEffect(() => {
    speak('Configuración de navegación. Longitud de ruta, paradas seguras y frecuencia de instrucciones');
  }, []);

  const frecuencias = [
    { value: 'baja', label: 'Baja', desc: 'Cada 200 metros' },
    { value: 'media', label: 'Media', desc: 'Cada 100 metros' },
    { value: 'alta', label: 'Alta', desc: 'Cada 50 metros' }
  ];

  const tiposInstruccion = [
    { value: 'distancia', label: 'Por distancia', desc: 'En 100 metros gira a la derecha' },
    { value: 'tiempo', label: 'Por tiempo', desc: 'En 30 segundos gira a la derecha' }
  ];

  return (
    <div className="mobile-container">
      <Header title="Navegación" onBack={onBack} />

      <div className="voice-announcement" style={{ margin: '1rem' }}>
        <div className="voice-announcement-icon">
          <span className="material-icons-round">record_voice_over</span>
        </div>
        <div className="voice-announcement-text">
          <h3>Comandos disponibles:</h3>
          <p>"10 km", "Parada segura sí", "Frecuencia alta", "Por tiempo", "Alerta desvío sí"</p>
        </div>
      </div>

      <div className="view-content" style={{ paddingBottom: '120px' }}>
        {/* Longitud Máxima */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
              <span className="material-icons-round">straighten</span>
            </div>
            <h3 className="config-title">Longitud Máxima de Ruta</h3>
          </div>

          <div className="config-option">
            <div style={{ width: '100%' }}>
              <p className="config-option-label">{navegacion.longitudMaxima} km</p>
              <input
                type="range"
                className="config-slider"
                min="1"
                max="50"
                step="1"
                value={navegacion.longitudMaxima}
                onChange={(e) => {
                  const longitud = parseInt(e.target.value);
                  updateNavegacion('longitudMaxima', longitud);
                  vibrate();
                }}
                onMouseUp={() => speak(`${navegacion.longitudMaxima} kilómetros`)}
              />
              <p className="config-option-desc">Máxima distancia permitida para rutas</p>
            </div>
          </div>
        </motion.div>

        {/* Sugerir Paradas Seguras */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
              <span className="material-icons-round">directions_bus</span>
            </div>
            <h3 className="config-title">Paradas Seguras</h3>
          </div>

          <div className="config-option">
            <div>
              <p className="config-option-label">Sugerir paradas seguras</p>
              <p className="config-option-desc">Recomienda puntos seguros en la ruta</p>
            </div>
            <div
              className={`toggle-switch ${navegacion.paradaSegura ? 'active' : ''}`}
              onClick={() => {
                updateNavegacion('paradaSegura', !navegacion.paradaSegura);
                speak(navegacion.paradaSegura ? 'Paradas seguras desactivadas' : 'Paradas seguras activadas');
                vibrate();
              }}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>
        </motion.div>

        {/* Frecuencia de Instrucciones */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
              <span className="material-icons-round">schedule</span>
            </div>
            <h3 className="config-title">Frecuencia de Instrucciones</h3>
          </div>

          {frecuencias.map((freq) => (
            <div
              key={freq.value}
              className="config-option"
              onClick={() => {
                updateNavegacion('frecuenciaInstrucciones', freq.value);
                speak(`Frecuencia ${freq.label}`);
                vibrate();
              }}
              style={{
                border: navegacion.frecuenciaInstrucciones === freq.value ? '2px solid #F59E0B' : 'none'
              }}
            >
              <div>
                <p className="config-option-label">{freq.label}</p>
                <p className="config-option-desc">{freq.desc}</p>
              </div>
              {navegacion.frecuenciaInstrucciones === freq.value && (
                <span className="material-icons-round" style={{ color: '#F59E0B' }}>
                  check_circle
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Tipo de Instrucción */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
              <span className="material-icons-round">info</span>
            </div>
            <h3 className="config-title">Tipo de Instrucción</h3>
          </div>

          {tiposInstruccion.map((tipo) => (
            <div
              key={tipo.value}
              className="config-option"
              onClick={() => {
                updateNavegacion('tipoInstruccion', tipo.value);
                speak(tipo.label);
                vibrate();
              }}
              style={{
                border: navegacion.tipoInstruccion === tipo.value ? '2px solid #F59E0B' : 'none'
              }}
            >
              <div>
                <p className="config-option-label">{tipo.label}</p>
                <p className="config-option-desc">{tipo.desc}</p>
              </div>
              {navegacion.tipoInstruccion === tipo.value && (
                <span className="material-icons-round" style={{ color: '#F59E0B' }}>
                  check_circle
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Alertas */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
              <span className="material-icons-round">warning</span>
            </div>
            <h3 className="config-title">Alertas</h3>
          </div>

          <div className="config-option">
            <div>
              <p className="config-option-label">Alerta de desvío</p>
              <p className="config-option-desc">Aviso si te sales de la ruta</p>
            </div>
            <div
              className={`toggle-switch ${navegacion.alertaDesvio ? 'active' : ''}`}
              onClick={() => {
                updateNavegacion('alertaDesvio', !navegacion.alertaDesvio);
                speak(navegacion.alertaDesvio ? 'Alerta de desvío desactivada' : 'Alerta de desvío activada');
                vibrate();
              }}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>

          <div className="config-option" style={{ marginTop: '0.75rem' }}>
            <div>
              <p className="config-option-label">Alerta de obstáculo</p>
              <p className="config-option-desc">Aviso de obstáculos en la ruta</p>
            </div>
            <div
              className={`toggle-switch ${navegacion.alertaObstaculo ? 'active' : ''}`}
              onClick={() => {
                updateNavegacion('alertaObstaculo', !navegacion.alertaObstaculo);
                speak(navegacion.alertaObstaculo ? 'Alerta de obstáculo desactivada' : 'Alerta de obstáculo activada');
                vibrate();
              }}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>
        </motion.div>

        {/* Botón Resetear */}
        <button
          className="btn-secondary-config"
          onClick={() => {
            resetearConfig('navegacion');
            speak('Configuración de navegación reseteada');
            vibrate();
          }}
        >
          <span className="material-icons-round">restore</span>
          Resetear a valores por defecto
        </button>
      </div>

      <VoiceCentralButton isListening={isListening} onToggle={toggleListening} />
    </div>
  );
};
