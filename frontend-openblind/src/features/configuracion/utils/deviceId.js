/**
 * UTILIDAD: Identificación de Usuario SIN Login
 *
 * Para usuarios con discapacidad visual, NO tiene sentido pedir login/registro.
 * En su lugar, generamos un ID único del dispositivo la primera vez que abren la app.
 *
 * Este ID se guarda en localStorage y funciona como su "userId" permanente.
 */

/**
 * Obtener o generar deviceId único
 *
 * @returns {string} UUID único del dispositivo
 */
export const getDeviceId = () => {
  // Intentar obtener deviceId existente
  let deviceId = localStorage.getItem('openblind_device_id');

  if (!deviceId) {
    // Si no existe, generar nuevo UUID
    deviceId = generateUUID();
    localStorage.setItem('openblind_device_id', deviceId);
    console.log('🆔 Nuevo dispositivo registrado:', deviceId);
  }

  return deviceId;
};

/**
 * Generar UUID v4 (RFC 4122 compliant)
 *
 * @returns {string} UUID formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Obtener userId para usar en la API
 *
 * En producción, esto sería el deviceId.
 * Para prototipo/demo, usamos userId = 1
 *
 * @param {boolean} useDemo - Si true, usa userId = 1 (para desarrollo)
 * @returns {string|number} userId
 */
export const getUserId = (useDemo = false) => {
  if (useDemo) {
    // Modo demo: todos usan userId = 1
    return 1;
  }

  // Modo producción: deviceId único
  return getDeviceId();
};

/**
 * Resetear deviceId (útil para testing)
 *
 * ADVERTENCIA: Esto borrará toda la identificación del usuario.
 * Solo usar en desarrollo o con confirmación explícita.
 */
export const resetDeviceId = () => {
  const oldId = localStorage.getItem('openblind_device_id');
  localStorage.removeItem('openblind_device_id');
  console.warn('⚠️ DeviceId eliminado:', oldId);
  console.log('🆔 Próxima apertura generará nuevo ID');
};

/**
 * Información del dispositivo (para logs/debug)
 *
 * @returns {object} Info del dispositivo
 */
export const getDeviceInfo = () => {
  return {
    deviceId: getDeviceId(),
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
    isOnline: navigator.onLine
  };
};
