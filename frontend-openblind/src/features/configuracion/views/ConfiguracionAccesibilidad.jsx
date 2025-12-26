import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../../presentation/components/Header';
import { VoiceCentralButton } from '../components/VoiceCentralButton';
import { useConfiguracion } from '../hooks/useConfiguracion';
import useVoiceCommands from '../../../application/hooks/useVoiceCommands';
import { speak } from '../../../application/utils/speechUtils';
import '../styles.css';

export const ConfiguracionAccesibilidad = ({ onBack }) => {
  const { accesibilidad, updateAccesibilidad, resetearConfig } = useConfiguracion();

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate([50]);
  };

  const handleVoiceCommand = (command) => {
    const cmd = command.toLowerCase();

    // Tamaño de fuente
    if (cmd.includes('fuente pequeña') || cmd.includes('letra pequeña')) {
      updateAccesibilidad('tamanoFuente', 'small');
      speak('Tamaño de fuente pequeña activado');
      vibrate();
    } else if (cmd.includes('fuente mediana') || cmd.includes('letra mediana')) {
      updateAccesibilidad('tamanoFuente', 'medium');
      speak('Tamaño de fuente mediana activado');
      vibrate();
    } else if (cmd.includes('fuente grande') || cmd.includes('letra grande')) {
      updateAccesibilidad('tamanoFuente', 'large');
      speak('Tamaño de fuente grande activado');
      vibrate();
    } else if (cmd.includes('fuente extra grande') || cmd.includes('letra extra grande')) {
      updateAccesibilidad('tamanoFuente', 'extra-large');
      speak('Tamaño de fuente extra grande activado');
      vibrate();
    }

    // Tema contraste
    else if (cmd.includes('alto contraste') || cmd.includes('contraste alto')) {
      updateAccesibilidad('temaContraste', 'alto-contraste');
      speak('Tema de alto contraste activado');
      vibrate();
    } else if (cmd.includes('contraste normal')) {
      updateAccesibilidad('temaContraste', 'normal');
      speak('Tema normal activado');
      vibrate();
    }

    // Idioma
    else if (cmd.includes('idioma español') || cmd.includes('español')) {
      updateAccesibilidad('idioma', 'es');
      speak('Idioma español activado');
      vibrate();
    } else if (cmd.includes('idioma inglés') || cmd.includes('english')) {
      updateAccesibilidad('idioma', 'en');
      speak('English language activated');
      vibrate();
    }

    // Velocidad voz
    else if (cmd.includes('voz lenta') || cmd.includes('hablar lento')) {
      updateAccesibilidad('velocidadVoz', 0.7);
      speak('Velocidad de voz lenta', 0.7);
      vibrate();
    } else if (cmd.includes('voz normal') || cmd.includes('velocidad normal')) {
      updateAccesibilidad('velocidadVoz', 1.0);
      speak('Velocidad de voz normal');
      vibrate();
    } else if (cmd.includes('voz rápida') || cmd.includes('hablar rápido')) {
      updateAccesibilidad('velocidadVoz', 1.5);
      speak('Velocidad de voz rápida', 1.5);
      vibrate();
    }

    // Feedback háptico
    else if (cmd.includes('activar vibración') || cmd.includes('vibración sí')) {
      updateAccesibilidad('feedbackHaptico', true);
      speak('Vibración activada');
      vibrate();
    } else if (cmd.includes('desactivar vibración') || cmd.includes('vibración no')) {
      updateAccesibilidad('feedbackHaptico', false);
      speak('Vibración desactivada');
    }

    // Nivel detalle
    else if (cmd.includes('detalle básico')) {
      updateAccesibilidad('nivelDetalle', 'basico');
      speak('Nivel de detalle básico');
      vibrate();
    } else if (cmd.includes('detalle completo')) {
      updateAccesibilidad('nivelDetalle', 'completo');
      speak('Nivel de detalle completo');
      vibrate();
    } else if (cmd.includes('detalle experto')) {
      updateAccesibilidad('nivelDetalle', 'experto');
      speak('Nivel de detalle experto');
      vibrate();
    }

    // Resetear
    else if (cmd.includes('resetear') || cmd.includes('valores por defecto')) {
      resetearConfig('accesibilidad');
      speak('Configuración de accesibilidad reseteada');
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
    speak('Configuración de accesibilidad. Tamaño de fuente, tema, idioma y voz');
  }, []);

  const fontSizes = [
    { value: 'small', label: 'Pequeña' },
    { value: 'medium', label: 'Mediana' },
    { value: 'large', label: 'Grande' },
    { value: 'extra-large', label: 'Extra Grande' }
  ];

  const temas = [
    { value: 'normal', label: 'Normal' },
    { value: 'alto-contraste', label: 'Alto Contraste' }
  ];

  const idiomas = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' }
  ];

  const detalles = [
    { value: 'basico', label: 'Básico' },
    { value: 'completo', label: 'Completo' },
    { value: 'experto', label: 'Experto' }
  ];

  return (
    <div className="mobile-container">
      <Header title="Accesibilidad" onBack={onBack} />

      <div className="voice-announcement" style={{ margin: '1rem' }}>
        <div className="voice-announcement-icon">
          <span className="material-icons-round">record_voice_over</span>
        </div>
        <div className="voice-announcement-text">
          <h3>Comandos disponibles:</h3>
          <p>"Fuente grande", "Alto contraste", "Idioma español", "Voz rápida", "Vibración sí"</p>
        </div>
      </div>

      <div className="view-content" style={{ paddingBottom: '120px' }}>
        {/* Tamaño de Fuente */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="config-header">
            <div className="config-icon">
              <span className="material-icons-round">format_size</span>
            </div>
            <h3 className="config-title">Tamaño de Fuente</h3>
          </div>

          {fontSizes.map((size) => (
            <div
              key={size.value}
              className="config-option"
              onClick={() => {
                updateAccesibilidad('tamanoFuente', size.value);
                speak(`Tamaño ${size.label}`);
                vibrate();
              }}
              style={{
                border: accesibilidad.tamanoFuente === size.value ? '2px solid #7C3AED' : 'none'
              }}
            >
              <span className="config-option-label">{size.label}</span>
              {accesibilidad.tamanoFuente === size.value && (
                <span className="material-icons-round" style={{ color: '#7C3AED' }}>
                  check_circle
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Tema de Contraste */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="config-header">
            <div className="config-icon">
              <span className="material-icons-round">contrast</span>
            </div>
            <h3 className="config-title">Tema de Contraste</h3>
          </div>

          {temas.map((tema) => (
            <div
              key={tema.value}
              className="config-option"
              onClick={() => {
                updateAccesibilidad('temaContraste', tema.value);
                speak(`Tema ${tema.label}`);
                vibrate();
              }}
              style={{
                border: accesibilidad.temaContraste === tema.value ? '2px solid #7C3AED' : 'none'
              }}
            >
              <span className="config-option-label">{tema.label}</span>
              {accesibilidad.temaContraste === tema.value && (
                <span className="material-icons-round" style={{ color: '#7C3AED' }}>
                  check_circle
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Idioma */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="config-header">
            <div className="config-icon">
              <span className="material-icons-round">language</span>
            </div>
            <h3 className="config-title">Idioma</h3>
          </div>

          {idiomas.map((idioma) => (
            <div
              key={idioma.value}
              className="config-option"
              onClick={() => {
                updateAccesibilidad('idioma', idioma.value);
                speak(idioma.label);
                vibrate();
              }}
              style={{
                border: accesibilidad.idioma === idioma.value ? '2px solid #7C3AED' : 'none'
              }}
            >
              <span className="config-option-label">{idioma.label}</span>
              {accesibilidad.idioma === idioma.value && (
                <span className="material-icons-round" style={{ color: '#7C3AED' }}>
                  check_circle
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Velocidad de Voz */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="config-header">
            <div className="config-icon">
              <span className="material-icons-round">speed</span>
            </div>
            <h3 className="config-title">Velocidad de Voz</h3>
          </div>

          <div className="config-option">
            <div>
              <p className="config-option-label">
                {accesibilidad.velocidadVoz === 0.5 ? 'Muy lenta' :
                 accesibilidad.velocidadVoz === 0.7 ? 'Lenta' :
                 accesibilidad.velocidadVoz === 1.0 ? 'Normal' :
                 accesibilidad.velocidadVoz === 1.3 ? 'Rápida' : 'Muy rápida'}
              </p>
              <input
                type="range"
                className="config-slider"
                min="0.5"
                max="2.0"
                step="0.1"
                value={accesibilidad.velocidadVoz}
                onChange={(e) => {
                  const vel = parseFloat(e.target.value);
                  updateAccesibilidad('velocidadVoz', vel);
                  vibrate();
                }}
                onMouseUp={() => speak('Prueba de velocidad', accesibilidad.velocidadVoz)}
              />
            </div>
          </div>
        </motion.div>

        {/* Feedback Háptico */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="config-header">
            <div className="config-icon">
              <span className="material-icons-round">vibration</span>
            </div>
            <h3 className="config-title">Vibración</h3>
          </div>

          <div className="config-option">
            <span className="config-option-label">Feedback Háptico</span>
            <div
              className={`toggle-switch ${accesibilidad.feedbackHaptico ? 'active' : ''}`}
              onClick={() => {
                updateAccesibilidad('feedbackHaptico', !accesibilidad.feedbackHaptico);
                speak(accesibilidad.feedbackHaptico ? 'Vibración desactivada' : 'Vibración activada');
                if (!accesibilidad.feedbackHaptico) vibrate();
              }}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>
        </motion.div>

        {/* Nivel de Detalle */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="config-header">
            <div className="config-icon">
              <span className="material-icons-round">info</span>
            </div>
            <h3 className="config-title">Nivel de Detalle</h3>
          </div>

          {detalles.map((detalle) => (
            <div
              key={detalle.value}
              className="config-option"
              onClick={() => {
                updateAccesibilidad('nivelDetalle', detalle.value);
                speak(`Nivel ${detalle.label}`);
                vibrate();
              }}
              style={{
                border: accesibilidad.nivelDetalle === detalle.value ? '2px solid #7C3AED' : 'none'
              }}
            >
              <span className="config-option-label">{detalle.label}</span>
              {accesibilidad.nivelDetalle === detalle.value && (
                <span className="material-icons-round" style={{ color: '#7C3AED' }}>
                  check_circle
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Botón Resetear */}
        <button
          className="btn-secondary-config"
          onClick={() => {
            resetearConfig('accesibilidad');
            speak('Configuración reseteada a valores por defecto');
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
