/**
 * Incidencias Service - Gestión de incidencias (CRUD completo)
 *
 * @description Servicio para gestionar incidencias detectadas en el sistema
 * @author MALDONADO DELGADO DAVID ALEJANDRO (N°5)
 */

import http from '../../../core/services/httpClient';

export const incidenciasService = {
  /**
   * Obtiene todas las incidencias con filtros opcionales
   * @param {object} filters - Filtros de búsqueda
   * @returns {Promise<object>} Lista de incidencias
   */
  getIncidencias: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return http.get(`/api/admin/incidencias?${params}`);
  },

  /**
   * Obtiene una incidencia específica por ID
   * @param {number} id - ID de la incidencia
   * @returns {Promise<object>} Incidencia
   */
  getIncidencia: async (id) => {
    return http.get(`/api/admin/incidencias/${id}`);
  },

  /**
   * Crea una nueva incidencia
   * @param {object} data - Datos de la incidencia
   * @returns {Promise<object>} Incidencia creada
   */
  createIncidencia: async (data) => {
    return http.post('/api/admin/incidencias', data);
  },

  /**
   * Actualiza una incidencia existente
   * @param {number} id - ID de la incidencia
   * @param {object} data - Datos actualizados
   * @returns {Promise<object>} Incidencia actualizada
   */
  updateIncidencia: async (id, data) => {
    return http.put(`/api/admin/incidencias/${id}`, data);
  },

  /**
   * Elimina una incidencia (soft delete)
   * @param {number} id - ID de la incidencia
   * @returns {Promise<object>} Resultado de la eliminación
   */
  deleteIncidencia: async (id) => {
    return http.delete(`/api/admin/incidencias/${id}`);
  },
};

export default incidenciasService;
