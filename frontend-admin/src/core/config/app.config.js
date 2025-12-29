/**
 * Configuración General de la Aplicación
 * @description Valores de configuración base para toda la aplicación
 */

export const appConfig = {
  appName: 'OpenBlind Admin',
  version: '1.0.0',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8888',
  environment: import.meta.env.MODE || 'development',
  timeout: 30000, // 30 segundos
  maxFileSize: 5242880, // 5MB en bytes
  itemsPerPage: 10,
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm:ss',
};

export default appConfig;
