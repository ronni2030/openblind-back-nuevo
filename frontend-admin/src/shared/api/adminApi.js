/**
 * API Layer - Conexión con Backend Admin
 *
 * Se conecta al backend principal en /api/admin
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888';

// ═══════════════════════════════════════════════════
// CONFIGURACIÓN GLOBAL
// ═══════════════════════════════════════════════════

/**
 * GET - Obtener configuración global del sistema
 */
export const getConfiguracionGlobal = async () => {
  try {
    const response = await fetch(`${API_URL}/api/admin/configuracion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[AdminAPI] Error al obtener configuración global:', error);
    throw error;
  }
};

/**
 * PUT - Actualizar configuración global completa
 */
export const updateConfiguracionGlobal = async (configuracion) => {
  try {
    const response = await fetch(`${API_URL}/api/admin/configuracion`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(configuracion)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[AdminAPI] Error al actualizar configuración global:', error);
    throw error;
  }
};

/**
 * PATCH - Actualizar un solo campo de la configuración
 */
export const updateField = async (field, value, modificadoPor = 'admin') => {
  try {
    const response = await fetch(`${API_URL}/api/admin/configuracion/field`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ field, value, modificadoPor })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[AdminAPI] Error al actualizar campo:', error);
    throw error;
  }
};

/**
 * POST - Resetear configuración a valores por defecto
 */
export const resetConfiguracion = async (modificadoPor = 'admin') => {
  try {
    const response = await fetch(`${API_URL}/api/admin/configuracion/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ modificadoPor })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[AdminAPI] Error al resetear configuración:', error);
    throw error;
  }
};

// ═══════════════════════════════════════════════════
// MÉTRICAS DEL DASHBOARD
// ═══════════════════════════════════════════════════

/**
 * GET - Resumen general de métricas
 */
export const getMetricasResumen = async () => {
  try {
    const response = await fetch(`${API_URL}/api/admin/metricas/resumen`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[AdminAPI] Error al obtener resumen de métricas:', error);
    throw error;
  }
};

/**
 * GET - Métricas de usuarios
 */
export const getMetricasUsuarios = async () => {
  try {
    const response = await fetch(`${API_URL}/api/admin/metricas/usuarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[AdminAPI] Error al obtener métricas de usuarios:', error);
    throw error;
  }
};

/**
 * GET - Métricas de rutas
 */
export const getMetricasRutas = async (periodo = 'semana') => {
  try {
    const response = await fetch(`${API_URL}/api/admin/metricas/rutas?periodo=${periodo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[AdminAPI] Error al obtener métricas de rutas:', error);
    throw error;
  }
};

/**
 * GET - Métricas de incidencias
 */
export const getMetricasIncidencias = async () => {
  try {
    const response = await fetch(`${API_URL}/api/admin/metricas/incidencias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[AdminAPI] Error al obtener métricas de incidencias:', error);
    throw error;
  }
};

/**
 * GET - Métricas de uso de módulos
 */
export const getMetricasUsoModulos = async () => {
  try {
    const response = await fetch(`${API_URL}/api/admin/metricas/uso-modulos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[AdminAPI] Error al obtener métricas de uso de módulos:', error);
    throw error;
  }
};

export default {
  // Configuración Global
  getConfiguracionGlobal,
  updateConfiguracionGlobal,
  updateField,
  resetConfiguracion,
  // Métricas
  getMetricasResumen,
  getMetricasUsuarios,
  getMetricasRutas,
  getMetricasIncidencias,
  getMetricasUsoModulos
};
