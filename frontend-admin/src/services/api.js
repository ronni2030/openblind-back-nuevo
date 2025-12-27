/**
 * Cliente API Centralizado - OpenBlind Admin
 *
 * IMPORTANTE: No se usan archivos .env (prohibidos)
 * Cambiar la URL según el entorno:
 * - Desarrollo: 'http://localhost:8888'
 * - Producción: 'https://api.openblind.com' (ejemplo)
 */

const API_URL = 'http://localhost:8888';

/**
 * Wrapper para fetch con manejo de errores
 */
async function apiRequest(endpoint, options = {}) {
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

// ═══════════════════════════════════════════════════
// DASHBOARD - Métricas
// ═══════════════════════════════════════════════════

export const getMetricsResumen = async () => {
  return apiRequest('/api/admin/metricas/resumen');
};

// ═══════════════════════════════════════════════════
// CONFIGURACIÓN GLOBAL
// ═══════════════════════════════════════════════════

export const getConfiguracionGlobal = async () => {
  return apiRequest('/api/admin/configuracion');
};

export const updateConfiguracionGlobal = async (data) => {
  return apiRequest('/api/admin/configuracion', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const updateConfigField = async (field, value) => {
  return apiRequest('/api/admin/configuracion/field', {
    method: 'PATCH',
    body: JSON.stringify({ field, value }),
  });
};

export const resetConfiguracion = async (tipo = 'todo') => {
  return apiRequest('/api/admin/configuracion/reset', {
    method: 'POST',
    body: JSON.stringify({ tipo }),
  });
};

// ═══════════════════════════════════════════════════
// INCIDENCIAS
// ═══════════════════════════════════════════════════

export const getIncidencias = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  return apiRequest(`/api/admin/incidencias?${params}`);
};

export const getIncidencia = async (id) => {
  return apiRequest(`/api/admin/incidencias/${id}`);
};

export const createIncidencia = async (data) => {
  return apiRequest('/api/admin/incidencias', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateIncidencia = async (id, data) => {
  return apiRequest(`/api/admin/incidencias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteIncidencia = async (id) => {
  return apiRequest(`/api/admin/incidencias/${id}`, {
    method: 'DELETE',
  });
};

// ═══════════════════════════════════════════════════
// SOPORTE - Tickets
// ═══════════════════════════════════════════════════

export const getTickets = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  return apiRequest(`/api/admin/soporte?${params}`);
};

export const getTicket = async (id) => {
  return apiRequest(`/api/admin/soporte/${id}`);
};

export const updateTicket = async (id, data) => {
  return apiRequest(`/api/admin/soporte/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteTicket = async (id) => {
  return apiRequest(`/api/admin/soporte/${id}`, {
    method: 'DELETE',
  });
};

export const addRespuestaTicket = async (id, respuesta) => {
  return apiRequest(`/api/admin/soporte/${id}/respuesta`, {
    method: 'POST',
    body: JSON.stringify({ respuesta }),
  });
};

export default {
  // Dashboard
  getMetricsResumen,

  // Configuración
  getConfiguracionGlobal,
  updateConfiguracionGlobal,
  updateConfigField,
  resetConfiguracion,

  // Incidencias
  getIncidencias,
  getIncidencia,
  createIncidencia,
  updateIncidencia,
  deleteIncidencia,

  // Soporte
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  addRespuestaTicket,
};
