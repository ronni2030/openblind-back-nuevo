/**
 * Soporte Service - Gestión de tickets de soporte (RUD - sin Create)
 *
 * @description Servicio para gestionar tickets de soporte enviados por usuarios
 * @author MALDONADO DELGADO DAVID ALEJANDRO (N°5)
 */

import http from '../../../core/services/httpClient';

export const soporteService = {
  /**
   * Obtiene todos los tickets con filtros opcionales
   * @param {object} filters - Filtros de búsqueda
   * @returns {Promise<object>} Lista de tickets
   */
  getTickets: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return http.get(`/api/admin/soporte?${params}`);
  },

  /**
   * Obtiene un ticket específico por ID
   * @param {number} id - ID del ticket
   * @returns {Promise<object>} Ticket
   */
  getTicket: async (id) => {
    return http.get(`/api/admin/soporte/${id}`);
  },

  /**
   * Actualiza un ticket existente
   * @param {number} id - ID del ticket
   * @param {object} data - Datos actualizados
   * @returns {Promise<object>} Ticket actualizado
   */
  updateTicket: async (id, data) => {
    return http.put(`/api/admin/soporte/${id}`, data);
  },

  /**
   * Elimina un ticket (soft delete / archivar)
   * @param {number} id - ID del ticket
   * @returns {Promise<object>} Resultado de la eliminación
   */
  deleteTicket: async (id) => {
    return http.delete(`/api/admin/soporte/${id}`);
  },

  /**
   * Agrega una respuesta a un ticket
   * @param {number} id - ID del ticket
   * @param {string} respuesta - Contenido de la respuesta
   * @returns {Promise<object>} Ticket con respuesta agregada
   */
  addRespuestaTicket: async (id, respuesta) => {
    return http.post(`/api/admin/soporte/${id}/respuesta`, { respuesta });
  },
};

export default soporteService;
