/**
 * Configuración HTTP
 * @description Configuración base para peticiones HTTP
 */

import appConfig from '../../core/config/app.config';

export const httpConfig = {
  baseURL: appConfig.apiUrl,
  timeout: appConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Obtiene headers con autenticación
 * @returns {object} Headers con token
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    ...httpConfig.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export default httpConfig;
