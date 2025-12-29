/**
 * Configuración Service - Gestión de configuración global del sistema
 *
 * @description Servicio para gestionar las 3 pantallas de configuración:
 *              - Accesibilidad
 *              - Navegación
 *              - Privacidad
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import http from '../../../core/services/httpClient';

export const configuracionService = {
  /**
   * Obtiene la configuración global del sistema
   * @returns {Promise<object>} Configuración global
   */
  getConfiguracionGlobal: async () => {
    return http.get('/api/admin/configuracion');
  },

  /**
   * Actualiza la configuración global (formato plano o anidado)
   * @param {object} data - Datos de configuración
   * @returns {Promise<object>} Configuración actualizada
   */
  updateConfiguracionGlobal: async (data) => {
    return http.put('/api/admin/configuracion', data);
  },

  /**
   * Actualiza un campo específico de la configuración
   * @param {string} field - Nombre del campo
   * @param {any} value - Valor del campo
   * @returns {Promise<object>} Configuración actualizada
   */
  updateConfigField: async (field, value) => {
    return http.patch('/api/admin/configuracion/field', { field, value });
  },

  /**
   * Resetea la configuración a valores por defecto
   * @param {string} tipo - Tipo de reseteo ('todo', 'accesibilidad', 'navegacion', 'privacidad')
   * @returns {Promise<object>} Configuración reseteada
   */
  resetConfiguracion: async (tipo = 'todo') => {
    return http.post('/api/admin/configuracion/reset', { tipo });
  },
};

export default configuracionService;
