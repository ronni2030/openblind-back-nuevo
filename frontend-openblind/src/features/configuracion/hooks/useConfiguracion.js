import { useState, useEffect } from 'react';

/**
 * Hook para manejar configuraciones globales de OpenBlind
 * Incluye accesibilidad, navegación y privacidad
 */
export const useConfiguracion = () => {
  // Estado de configuración de accesibilidad
  const [accesibilidad, setAccesibilidad] = useState({
    tamanoFuente: 'medium', // small, medium, large, extra-large
    temaContraste: 'normal', // normal, alto-contraste
    idioma: 'es', // es, en
    velocidadVoz: 1.0, // 0.5 - 2.0
    volumenVoz: 80, // 0 - 100
    feedbackHaptico: true,
    nivelDetalle: 'completo' // basico, completo, experto
  });

  // Estado de configuración de navegación
  const [navegacion, setNavegacion] = useState({
    longitudMaxima: 10, // km
    paradaSegura: true,
    frecuenciaInstrucciones: 'media', // baja, media, alta
    tipoInstruccion: 'tiempo', // distancia, tiempo
    alertaDesvio: true,
    alertaObstaculo: true
  });

  // Estado de configuración de privacidad
  const [privacidad, setPrivacidad] = useState({
    retencionUbicacion: 7, // días
    trackingBackground: false,
    compartirUbicacion: false,
    guardarHistorial: true,
    permitirAnonimo: false
  });

  // Cargar configuración desde localStorage
  useEffect(() => {
    const savedAccesibilidad = localStorage.getItem('config_accesibilidad');
    const savedNavegacion = localStorage.getItem('config_navegacion');
    const savedPrivacidad = localStorage.getItem('config_privacidad');

    if (savedAccesibilidad) setAccesibilidad(JSON.parse(savedAccesibilidad));
    if (savedNavegacion) setNavegacion(JSON.parse(savedNavegacion));
    if (savedPrivacidad) setPrivacidad(JSON.parse(savedPrivacidad));
  }, []);

  // Guardar configuración en localStorage
  const guardarConfig = (tipo, config) => {
    localStorage.setItem(`config_${tipo}`, JSON.stringify(config));
  };

  // Actualizar accesibilidad
  const updateAccesibilidad = (key, value) => {
    const newConfig = { ...accesibilidad, [key]: value };
    setAccesibilidad(newConfig);
    guardarConfig('accesibilidad', newConfig);
  };

  // Actualizar navegación
  const updateNavegacion = (key, value) => {
    const newConfig = { ...navegacion, [key]: value };
    setNavegacion(newConfig);
    guardarConfig('navegacion', newConfig);
  };

  // Actualizar privacidad
  const updatePrivacidad = (key, value) => {
    const newConfig = { ...privacidad, [key]: value };
    setPrivacidad(newConfig);
    guardarConfig('privacidad', newConfig);
  };

  // Resetear a valores por defecto
  const resetearConfig = (tipo) => {
    switch (tipo) {
      case 'accesibilidad':
        setAccesibilidad({
          tamanoFuente: 'medium',
          temaContraste: 'normal',
          idioma: 'es',
          velocidadVoz: 1.0,
          volumenVoz: 80,
          feedbackHaptico: true,
          nivelDetalle: 'completo'
        });
        localStorage.removeItem('config_accesibilidad');
        break;
      case 'navegacion':
        setNavegacion({
          longitudMaxima: 10,
          paradaSegura: true,
          frecuenciaInstrucciones: 'media',
          tipoInstruccion: 'tiempo',
          alertaDesvio: true,
          alertaObstaculo: true
        });
        localStorage.removeItem('config_navegacion');
        break;
      case 'privacidad':
        setPrivacidad({
          retencionUbicacion: 7,
          trackingBackground: false,
          compartirUbicacion: false,
          guardarHistorial: true,
          permitirAnonimo: false
        });
        localStorage.removeItem('config_privacidad');
        break;
    }
  };

  return {
    accesibilidad,
    navegacion,
    privacidad,
    updateAccesibilidad,
    updateNavegacion,
    updatePrivacidad,
    resetearConfig
  };
};
