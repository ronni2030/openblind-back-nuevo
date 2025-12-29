/**
 * Dashboard Service - Métricas y estadísticas del sistema
 *
 * @description Servicio para obtener métricas del panel de administración
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 * @author MALDONADO DELGADO DAVID ALEJANDRO (N°5)
 */

import http from '../../../core/services/httpClient';

export const dashboardService = {
  /**
   * Obtiene el resumen de métricas del dashboard
   * @returns {Promise<object>} Métricas del sistema
   */
  getMetricsResumen: async () => {
    return http.get('/api/admin/metricas/resumen');
  },
};

export default dashboardService;
