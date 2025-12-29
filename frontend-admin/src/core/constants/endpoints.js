/**
 * Endpoints de API
 * @description Todas las URLs de endpoints del backend
 */

export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/api/admin/login',
    LOGOUT: '/api/admin/logout',
    VERIFY: '/api/admin/verify',
  },

  // Dashboard
  DASHBOARD: {
    METRICS: '/api/admin/metricas/resumen',
  },

  // Configuración
  CONFIG: {
    GET: '/api/admin/configuracion',
    UPDATE: '/api/admin/configuracion',
    UPDATE_FIELD: '/api/admin/configuracion/field',
    RESET: '/api/admin/configuracion/reset',
  },

  // Incidencias
  INCIDENCIAS: {
    LIST: '/api/admin/incidencias',
    GET: (id) => `/api/admin/incidencias/${id}`,
    CREATE: '/api/admin/incidencias',
    UPDATE: (id) => `/api/admin/incidencias/${id}`,
    DELETE: (id) => `/api/admin/incidencias/${id}`,
  },

  // Soporte
  SOPORTE: {
    LIST: '/api/admin/soporte',
    GET: (id) => `/api/admin/soporte/${id}`,
    UPDATE: (id) => `/api/admin/soporte/${id}`,
    DELETE: (id) => `/api/admin/soporte/${id}`,
    ADD_RESPUESTA: (id) => `/api/admin/soporte/${id}/respuesta`,
  },
};

export default API_ENDPOINTS;
