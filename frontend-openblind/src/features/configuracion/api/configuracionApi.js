/**
 * API DE CONFIGURACIÓN
 *
 * Maneja las llamadas al backend de configuración.
 * Incluye fallback a localStorage si el backend no está disponible.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888';
const ENDPOINTS = {
  base: `${API_URL}/api/configuracion`,
  byUser: (userId) => `${API_URL}/api/configuracion/${userId}`,
  updateField: (userId) => `${API_URL}/api/configuracion/${userId}/field`,
  reset: (userId) => `${API_URL}/api/configuracion/${userId}/reset`
};

/**
 * Verificar si el backend está disponible
 */
export const isBackendAvailable = async () => {
  try {
    const response = await fetch(API_URL, { method: 'HEAD', mode: 'no-cors' });
    return true;
  } catch (error) {
    console.warn('Backend no disponible, usando localStorage');
    return false;
  }
};

/**
 * GET: Obtener configuración del usuario
 */
export const getConfiguracion = async (userId = 1) => {
  try {
    const response = await fetch(ENDPOINTS.byUser(userId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Retorna el objeto de configuración
  } catch (error) {
    console.error('Error obteniendo configuración del backend:', error);
    throw error;
  }
};

/**
 * POST: Crear configuración inicial
 */
export const createConfiguracion = async (userId = 1, initialData = {}) => {
  try {
    const response = await fetch(ENDPOINTS.base, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        ...initialData
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creando configuración en backend:', error);
    throw error;
  }
};

/**
 * PUT: Actualizar configuración completa
 */
export const updateConfiguracion = async (userId = 1, newData) => {
  try {
    const response = await fetch(ENDPOINTS.byUser(userId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error actualizando configuración en backend:', error);
    throw error;
  }
};

/**
 * PATCH: Actualizar solo un campo
 */
export const updateField = async (userId = 1, field, value) => {
  try {
    const response = await fetch(ENDPOINTS.updateField(userId), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ field, value })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error actualizando campo en backend:', error);
    throw error;
  }
};

/**
 * POST: Resetear configuración a valores por defecto
 */
export const resetConfiguracion = async (userId = 1, tipo = 'todo') => {
  try {
    const response = await fetch(ENDPOINTS.reset(userId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tipo })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error reseteando configuración en backend:', error);
    throw error;
  }
};

/**
 * DELETE: Eliminar configuración
 */
export const deleteConfiguracion = async (userId = 1) => {
  try {
    const response = await fetch(ENDPOINTS.byUser(userId), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error eliminando configuración en backend:', error);
    throw error;
  }
};
