/**
 * HTTP Client Base - Configuración centralizada de fetch
 *
 * @description Cliente HTTP base con manejo de errores
 * @author OpenBlind Team
 */

const API_URL = 'http://localhost:8888';

/**
 * Realiza una petición HTTP con manejo de errores
 * @param {string} endpoint - Endpoint de la API
 * @param {object} options - Opciones de fetch
 * @returns {Promise<object>} Respuesta de la API
 */
export async function httpClient(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la petición');
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Métodos HTTP de conveniencia
 */
export const http = {
  get: (endpoint, options = {}) => httpClient(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, data, options = {}) => httpClient(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  }),

  put: (endpoint, data, options = {}) => httpClient(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  patch: (endpoint, data, options = {}) => httpClient(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  }),

  delete: (endpoint, options = {}) => httpClient(endpoint, {
    ...options,
    method: 'DELETE',
  }),
};

export default http;
