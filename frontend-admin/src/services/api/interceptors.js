/**
 * Interceptores HTTP
 * @description Funciones que interceptan peticiones y respuestas HTTP
 */

/**
 * Interceptor de peticiones
 * Agrega el token de autenticación automáticamente
 * @param {object} options - Opciones de la petición
 * @returns {object} Opciones modificadas
 */
export const requestInterceptor = (options) => {
  const token = localStorage.getItem('token');

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Log en desarrollo
  if (import.meta.env.MODE === 'development') {
    console.log('🔵 Request:', options);
  }

  return options;
};

/**
 * Interceptor de respuestas exitosas
 * @param {Response} response - Respuesta HTTP
 * @returns {Response} Respuesta procesada
 */
export const responseInterceptor = (response) => {
  // Log en desarrollo
  if (import.meta.env.MODE === 'development') {
    console.log('🟢 Response:', response);
  }

  return response;
};

/**
 * Interceptor de errores
 * Maneja errores comunes (401, 403, 500, etc.)
 * @param {Error} error - Error HTTP
 * @returns {Promise} Promesa rechazada
 */
export const errorInterceptor = (error) => {
  // Log en desarrollo
  if (import.meta.env.MODE === 'development') {
    console.error('🔴 Error:', error);
  }

  // 401 Unauthorized - Token expirado o inválido
  if (error.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  // 403 Forbidden - Sin permisos
  if (error.status === 403) {
    console.error('No tienes permisos para realizar esta acción');
  }

  // 500 Server Error
  if (error.status === 500) {
    console.error('Error del servidor. Intenta más tarde.');
  }

  return Promise.reject(error);
};

export default {
  requestInterceptor,
  responseInterceptor,
  errorInterceptor,
};
