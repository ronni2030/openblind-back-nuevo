import { useState, useEffect } from 'react';
import * as configuracionApi from '../api/configuracionApi';
import { getUserId } from '../utils/deviceId';

/**
 * HOOK HÍBRIDO: useConfiguracion
 *
 * Intenta usar backend (MySQL) primero.
 * Si falla, usa localStorage como fallback.
 *
 * IDENTIFICACIÓN SIN LOGIN:
 * - Para usuarios ciegos, NO pedimos login/registro
 * - Usamos deviceId único generado la primera vez
 * - Se guarda en localStorage del dispositivo
 * - Si desinstalan y reinstalan, se genera nuevo ID
 *
 * ESTO ES LO QUE DEBES EXPLICAR EN LA MASTER CLASS:
 * - "Primero intenta conectar con backend para CRUD real con MySQL"
 * - "Si no hay backend disponible (offline), usa localStorage"
 * - "Esto se llama 'offline-first' o 'progressive enhancement'"
 * - "Para usuarios ciegos, usar deviceId es más accesible que login/registro"
 */

export const useConfiguracion = () => {
  const [useBackend, setUseBackend] = useState(false);
  // userId basado en deviceId único (sin login/registro)
  const [userId, setUserId] = useState(() => getUserId(true)); // true = modo demo (userId=1)

  // ═══════════════════════════════════════════════════
  // ESTADO INICIAL (valores por defecto)
  // ═══════════════════════════════════════════════════

  const [accesibilidad, setAccesibilidad] = useState({
    tamanoFuente: 'medium',
    temaContraste: 'normal',
    idioma: 'es',
    velocidadVoz: 1.0,
    volumenVoz: 80,
    feedbackHaptico: true,
    nivelDetalle: 'completo'
  });

  const [navegacion, setNavegacion] = useState({
    longitudMaxima: 10,
    paradaSegura: true,
    frecuenciaInstrucciones: 'media',
    tipoInstruccion: 'distancia',
    alertaDesvio: true,
    alertaObstaculo: true
  });

  const [privacidad, setPrivacidad] = useState({
    retencionUbicacion: 30,
    trackingBackground: false,
    compartirUbicacion: true,
    guardarHistorial: true,
    permitirAnonimo: false
  });

  // ═══════════════════════════════════════════════════
  // CARGA INICIAL: Verificar backend y cargar datos
  // ═══════════════════════════════════════════════════

  useEffect(() => {
    const loadConfiguracion = async () => {
      try {
        // 1. Verificar si backend está disponible
        const backendAvailable = await configuracionApi.isBackendAvailable();

        if (backendAvailable) {
          // ─────────────────────────────────────────────
          // BACKEND DISPONIBLE: Cargar desde MySQL
          // ─────────────────────────────────────────────
          console.log('✅ Backend disponible, cargando configuración desde MySQL');
          setUseBackend(true);

          try {
            const config = await configuracionApi.getConfiguracion(userId);

            // Actualizar estados con datos del backend
            setAccesibilidad({
              tamanoFuente: config.tamanoFuente,
              temaContraste: config.temaContraste,
              idioma: config.idioma,
              velocidadVoz: parseFloat(config.velocidadVoz),
              volumenVoz: config.volumenVoz,
              feedbackHaptico: config.feedbackHaptico,
              nivelDetalle: config.nivelDetalle
            });

            setNavegacion({
              longitudMaxima: config.longitudMaxima,
              paradaSegura: config.paradaSegura,
              frecuenciaInstrucciones: config.frecuenciaInstrucciones,
              tipoInstruccion: config.tipoInstruccion,
              alertaDesvio: config.alertaDesvio,
              alertaObstaculo: config.alertaObstaculo
            });

            setPrivacidad({
              retencionUbicacion: config.retencionUbicacion,
              trackingBackground: config.trackingBackground,
              compartirUbicacion: config.compartirUbicacion,
              guardarHistorial: config.guardarHistorial,
              permitirAnonimo: config.permitirAnonimo
            });

            console.log('✅ Configuración cargada desde MySQL');
          } catch (error) {
            console.error('Error cargando desde backend, fallback a localStorage:', error);
            loadFromLocalStorage();
            setUseBackend(false);
          }
        } else {
          // ─────────────────────────────────────────────
          // BACKEND NO DISPONIBLE: Usar localStorage
          // ─────────────────────────────────────────────
          console.log('⚠️ Backend no disponible, usando localStorage');
          setUseBackend(false);
          loadFromLocalStorage();
        }
      } catch (error) {
        console.error('Error en carga inicial:', error);
        loadFromLocalStorage();
        setUseBackend(false);
      }
    };

    loadConfiguracion();
  }, [userId]);

  // ═══════════════════════════════════════════════════
  // HELPERS: localStorage
  // ═══════════════════════════════════════════════════

  const loadFromLocalStorage = () => {
    const savedAccesibilidad = localStorage.getItem('config_accesibilidad');
    const savedNavegacion = localStorage.getItem('config_navegacion');
    const savedPrivacidad = localStorage.getItem('config_privacidad');

    if (savedAccesibilidad) {
      setAccesibilidad(JSON.parse(savedAccesibilidad));
    }
    if (savedNavegacion) {
      setNavegacion(JSON.parse(savedNavegacion));
    }
    if (savedPrivacidad) {
      setPrivacidad(JSON.parse(savedPrivacidad));
    }
  };

  const saveToLocalStorage = (tipo, data) => {
    localStorage.setItem(`config_${tipo}`, JSON.stringify(data));
  };

  // ═══════════════════════════════════════════════════
  // UPDATE: Actualizar configuración (backend o local)
  // ═══════════════════════════════════════════════════

  const updateAccesibilidad = async (key, value) => {
    const newConfig = { ...accesibilidad, [key]: value };
    setAccesibilidad(newConfig);

    if (useBackend) {
      // Guardar en backend (MySQL)
      try {
        await configuracionApi.updateField(userId, key, value);
        console.log(`✅ Campo ${key} actualizado en MySQL`);
      } catch (error) {
        console.error('Error actualizando en backend, guardando en localStorage:', error);
        saveToLocalStorage('accesibilidad', newConfig);
      }
    } else {
      // Guardar en localStorage
      saveToLocalStorage('accesibilidad', newConfig);
    }
  };

  const updateNavegacion = async (key, value) => {
    const newConfig = { ...navegacion, [key]: value };
    setNavegacion(newConfig);

    if (useBackend) {
      try {
        await configuracionApi.updateField(userId, key, value);
        console.log(`✅ Campo ${key} actualizado en MySQL`);
      } catch (error) {
        console.error('Error actualizando en backend, guardando en localStorage:', error);
        saveToLocalStorage('navegacion', newConfig);
      }
    } else {
      saveToLocalStorage('navegacion', newConfig);
    }
  };

  const updatePrivacidad = async (key, value) => {
    const newConfig = { ...privacidad, [key]: value };
    setPrivacidad(newConfig);

    if (useBackend) {
      try {
        await configuracionApi.updateField(userId, key, value);
        console.log(`✅ Campo ${key} actualizado en MySQL`);
      } catch (error) {
        console.error('Error actualizando en backend, guardando en localStorage:', error);
        saveToLocalStorage('privacidad', newConfig);
      }
    } else {
      saveToLocalStorage('privacidad', newConfig);
    }
  };

  // ═══════════════════════════════════════════════════
  // RESET: Resetear a valores por defecto
  // ═══════════════════════════════════════════════════

  const resetearConfig = async (tipo) => {
    const defaults = {
      accesibilidad: {
        tamanoFuente: 'medium',
        temaContraste: 'normal',
        idioma: 'es',
        velocidadVoz: 1.0,
        volumenVoz: 80,
        feedbackHaptico: true,
        nivelDetalle: 'completo'
      },
      navegacion: {
        longitudMaxima: 10,
        paradaSegura: true,
        frecuenciaInstrucciones: 'media',
        tipoInstruccion: 'distancia',
        alertaDesvio: true,
        alertaObstaculo: true
      },
      privacidad: {
        retencionUbicacion: 30,
        trackingBackground: false,
        compartirUbicacion: true,
        guardarHistorial: true,
        permitirAnonimo: false
      }
    };

    if (useBackend) {
      try {
        await configuracionApi.resetConfiguracion(userId, tipo);
        console.log(`✅ Configuración ${tipo} reseteada en MySQL`);

        // Actualizar estado local
        if (tipo === 'accesibilidad') setAccesibilidad(defaults.accesibilidad);
        if (tipo === 'navegacion') setNavegacion(defaults.navegacion);
        if (tipo === 'privacidad') setPrivacidad(defaults.privacidad);
      } catch (error) {
        console.error('Error reseteando en backend, usando localStorage:', error);
        if (tipo === 'accesibilidad') {
          setAccesibilidad(defaults.accesibilidad);
          saveToLocalStorage('accesibilidad', defaults.accesibilidad);
        }
        if (tipo === 'navegacion') {
          setNavegacion(defaults.navegacion);
          saveToLocalStorage('navegacion', defaults.navegacion);
        }
        if (tipo === 'privacidad') {
          setPrivacidad(defaults.privacidad);
          saveToLocalStorage('privacidad', defaults.privacidad);
        }
      }
    } else {
      if (tipo === 'accesibilidad') {
        setAccesibilidad(defaults.accesibilidad);
        saveToLocalStorage('accesibilidad', defaults.accesibilidad);
      }
      if (tipo === 'navegacion') {
        setNavegacion(defaults.navegacion);
        saveToLocalStorage('navegacion', defaults.navegacion);
      }
      if (tipo === 'privacidad') {
        setPrivacidad(defaults.privacidad);
        saveToLocalStorage('privacidad', defaults.privacidad);
      }
    }
  };

  // ═══════════════════════════════════════════════════
  // API PÚBLICA DEL HOOK
  // ═══════════════════════════════════════════════════

  return {
    // Estados actuales
    accesibilidad,
    navegacion,
    privacidad,

    // Funciones de actualización
    updateAccesibilidad,
    updateNavegacion,
    updatePrivacidad,

    // Funciones de reset
    resetearConfig,

    // Info de conexión (útil para debug)
    useBackend,
    userId
  };
};
