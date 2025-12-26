import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../../presentation/components/Header';
import { VoiceCentralButton } from '../components/VoiceCentralButton';
import { useConfiguracion } from '../hooks/useConfiguracion';
import useVoiceCommands from '../../../application/hooks/useVoiceCommands';
import { speak } from '../../../application/utils/speechUtils';
import '../styles.css';

export const ConfiguracionPrivacidad = ({ onBack }) => {
  const { privacidad, updatePrivacidad, resetearConfig } = useConfiguracion();

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate([50]);
  };

  const handleVoiceCommand = (command) => {
    const cmd = command.toLowerCase();

    // Retención ubicación
    if (cmd.includes('retener siete días') || cmd.includes('7 días')) {
      updatePrivacidad('retencionUbicacion', 7);
      speak('Retención de ubicaciones: 7 días');
      vibrate();
    } else if (cmd.includes('retener catorce días') || cmd.includes('14 días')) {
      updatePrivacidad('retencionUbicacion', 14);
      speak('Retención de ubicaciones: 14 días');
      vibrate();
    } else if (cmd.includes('retener treinta días') || cmd.includes('30 días')) {
      updatePrivacidad('retencionUbicacion', 30);
      speak('Retención de ubicaciones: 30 días');
      vibrate();
    } else if (cmd.includes('retener noventa días') || cmd.includes('90 días')) {
      updatePrivacidad('retencionUbicacion', 90);
      speak('Retención de ubicaciones: 90 días');
      vibrate();
    }

    // Tracking background
    else if (cmd.includes('tracking sí') || cmd.includes('segundo plano sí')) {
      updatePrivacidad('trackingBackground', true);
      speak('Tracking en segundo plano activado');
      vibrate();
    } else if (cmd.includes('tracking no') || cmd.includes('segundo plano no')) {
      updatePrivacidad('trackingBackground', false);
      speak('Tracking en segundo plano desactivado');
      vibrate();
    }

    // Compartir ubicación
    else if (cmd.includes('compartir ubicación sí')) {
      updatePrivacidad('compartirUbicacion', true);
      speak('Compartir ubicación activado');
      vibrate();
    } else if (cmd.includes('compartir ubicación no')) {
      updatePrivacidad('compartirUbicacion', false);
      speak('Compartir ubicación desactivado');
      vibrate();
    }

    // Guardar historial
    else if (cmd.includes('historial sí')) {
      updatePrivacidad('guardarHistorial', true);
      speak('Guardar historial activado');
      vibrate();
    } else if (cmd.includes('historial no')) {
      updatePrivacidad('guardarHistorial', false);
      speak('Guardar historial desactivado');
      vibrate();
    }

    // Modo anónimo
    else if (cmd.includes('anónimo sí') || cmd.includes('modo anónimo')) {
      updatePrivacidad('permitirAnonimo', true);
      speak('Modo anónimo activado');
      vibrate();
    } else if (cmd.includes('anónimo no')) {
      updatePrivacidad('permitirAnonimo', false);
      speak('Modo anónimo desactivado');
      vibrate();
    }

    // Resetear
    else if (cmd.includes('resetear') || cmd.includes('valores por defecto')) {
      resetearConfig('privacidad');
      speak('Configuración de privacidad reseteada');
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
    speak('Configuración de privacidad. Retención de ubicaciones y tracking en segundo plano');
  }, []);

  const retenciones = [
    { value: 7, label: '7 días', desc: 'Recomendado para mayor privacidad' },
    { value: 14, label: '14 días', desc: 'Balance entre privacidad y utilidad' },
    { value: 30, label: '30 días', desc: 'Historial completo de un mes' },
    { value: 90, label: '90 días', desc: 'Máximo permitido' }
  ];

  return (
    <div className="mobile-container">
      <Header title="Privacidad" onBack={onBack} />

      <div className="voice-announcement" style={{ margin: '1rem' }}>
        <div className="voice-announcement-icon">
          <span className="material-icons-round">record_voice_over</span>
        </div>
        <div className="voice-announcement-text">
          <h3>Comandos disponibles:</h3>
          <p>"7 días", "Tracking sí", "Compartir ubicación no", "Historial sí", "Anónimo no"</p>
        </div>
      </div>

      <div className="view-content" style={{ paddingBottom: '120px' }}>
        {/* Retención de Ubicaciones */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}>
              <span className="material-icons-round">history</span>
            </div>
            <h3 className="config-title">Retención de Ubicaciones</h3>
          </div>

          {retenciones.map((ret) => (
            <div
              key={ret.value}
              className="config-option"
              onClick={() => {
                updatePrivacidad('retencionUbicacion', ret.value);
                speak(`Retención ${ret.label}`);
                vibrate();
              }}
              style={{
                border: privacidad.retencionUbicacion === ret.value ? '2px solid #8B5CF6' : 'none'
              }}
            >
              <div>
                <p className="config-option-label">{ret.label}</p>
                <p className="config-option-desc">{ret.desc}</p>
              </div>
              {privacidad.retencionUbicacion === ret.value && (
                <span className="material-icons-round" style={{ color: '#8B5CF6' }}>
                  check_circle
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Tracking en Segundo Plano */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}>
              <span className="material-icons-round">location_on</span>
            </div>
            <h3 className="config-title">Tracking en Segundo Plano</h3>
          </div>

          <div className="config-option">
            <div>
              <p className="config-option-label">Permitir tracking background</p>
              <p className="config-option-desc">Seguir tu ubicación aunque la app esté cerrada</p>
            </div>
            <div
              className={`toggle-switch ${privacidad.trackingBackground ? 'active' : ''}`}
              onClick={() => {
                updatePrivacidad('trackingBackground', !privacidad.trackingBackground);
                speak(privacidad.trackingBackground ? 'Tracking en segundo plano desactivado' : 'Tracking en segundo plano activado');
                vibrate();
              }}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>

          {privacidad.trackingBackground && (
            <div className="config-option" style={{ marginTop: '0.75rem', background: '#FEF3C7' }}>
              <div>
                <p className="config-option-label" style={{ color: '#D97706' }}>
                    Consume más batería
                </p>
                <p className="config-option-desc" style={{ color: '#D97706' }}>
                  El tracking continuo puede reducir la duración de la batería
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Compartir Ubicación */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}>
              <span className="material-icons-round">share_location</span>
            </div>
            <h3 className="config-title">Compartir Ubicación</h3>
          </div>

          <div className="config-option">
            <div>
              <p className="config-option-label">Compartir ubicación en tiempo real</p>
              <p className="config-option-desc">Permite a tus contactos ver dónde estás</p>
            </div>
            <div
              className={`toggle-switch ${privacidad.compartirUbicacion ? 'active' : ''}`}
              onClick={() => {
                updatePrivacidad('compartirUbicacion', !privacidad.compartirUbicacion);
                speak(privacidad.compartirUbicacion ? 'Compartir ubicación desactivado' : 'Compartir ubicación activado');
                vibrate();
              }}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>
        </motion.div>

        {/* Guardar Historial */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}>
              <span className="material-icons-round">bookmark</span>
            </div>
            <h3 className="config-title">Historial de Navegación</h3>
          </div>

          <div className="config-option">
            <div>
              <p className="config-option-label">Guardar historial de rutas</p>
              <p className="config-option-desc">Almacena tus rutas recorridas</p>
            </div>
            <div
              className={`toggle-switch ${privacidad.guardarHistorial ? 'active' : ''}`}
              onClick={() => {
                updatePrivacidad('guardarHistorial', !privacidad.guardarHistorial);
                speak(privacidad.guardarHistorial ? 'Guardar historial desactivado' : 'Guardar historial activado');
                vibrate();
              }}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>
        </motion.div>

        {/* Modo Anónimo */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="config-header">
            <div className="config-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}>
              <span className="material-icons-round">visibility_off</span>
            </div>
            <h3 className="config-title">Modo Anónimo</h3>
          </div>

          <div className="config-option">
            <div>
              <p className="config-option-label">Permitir uso anónimo</p>
              <p className="config-option-desc">Usar la app sin cuenta registrada</p>
            </div>
            <div
              className={`toggle-switch ${privacidad.permitirAnonimo ? 'active' : ''}`}
              onClick={() => {
                updatePrivacidad('permitirAnonimo', !privacidad.permitirAnonimo);
                speak(privacidad.permitirAnonimo ? 'Modo anónimo desactivado' : 'Modo anónimo activado');
                vibrate();
              }}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>

          {privacidad.permitirAnonimo && (
            <div className="config-option" style={{ marginTop: '0.75rem', background: '#FEE2E2' }}>
              <div>
                <p className="config-option-label" style={{ color: '#DC2626' }}>
                    Limitaciones en modo anónimo
                </p>
                <p className="config-option-desc" style={{ color: '#DC2626' }}>
                  No podrás sincronizar datos entre dispositivos
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Información de Privacidad */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ background: 'linear-gradient(135deg, #DDD6FE 0%, #EDE9FE 100%)', border: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span className="material-icons-round" style={{ color: '#7C3AED', fontSize: '2rem' }}>
              shield
            </span>
            <div>
              <h4 style={{ fontWeight: '700', color: '#5B21B6', marginBottom: '0.5rem' }}>
                Tu privacidad es importante
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                OpenBlind protege tus datos con encriptación end-to-end. Solo tú tienes acceso a tu información de ubicación e historial. Nunca compartimos tus datos con terceros sin tu consentimiento.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Botón Resetear */}
        <button
          className="btn-secondary-config"
          onClick={() => {
            resetearConfig('privacidad');
            speak('Configuración de privacidad reseteada');
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
