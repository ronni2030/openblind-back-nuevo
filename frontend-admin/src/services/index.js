/**
 * Services Index - Exportaciones centralizadas de todos los servicios
 *
 * @description Punto único de importación para todos los servicios de la aplicación
 * @author OpenBlind Team
 */

// PASO 1: Importar todos los servicios primero
import http from '../core/services/httpClient';
import dashboardService from '../modules/dashboard/services/dashboardService';
import configuracionService from '../modules/configuracion/services/configuracionService';
import incidenciasService from '../modules/incidencias/services/incidenciasService';
import soporteService from '../modules/soporte/services/soporteService';

// PASO 2: Exportar servicios completos
export { http };
export { dashboardService };
export { configuracionService };
export { incidenciasService };
export { soporteService };

// Alias para compatibilidad
export { dashboardService as DashboardService };
export { configuracionService as ConfiguracionService };
export { incidenciasService as IncidenciasService };
export { soporteService as SoporteService };

/**
 * Exportaciones individuales para retrocompatibilidad
 * Esto permite seguir usando: import { getMetricsResumen } from '@services'
 */

// Dashboard
export const { getMetricsResumen } = dashboardService;

// Configuración
export const {
  getConfiguracionGlobal,
  updateConfiguracionGlobal,
  updateConfigField,
  resetConfiguracion
} = configuracionService;

// Incidencias
export const {
  getIncidencias,
  getIncidencia,
  createIncidencia,
  updateIncidencia,
  deleteIncidencia
} = incidenciasService;

// Soporte
export const {
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  addRespuestaTicket
} = soporteService;

/**
 * Objeto con todos los servicios
 * Uso: import services from '@services'; services.dashboardService.getMetricsResumen()
 */
export default {
  http,
  dashboard: dashboardService,
  configuracion: configuracionService,
  incidencias: incidenciasService,
  soporte: soporteService,
};
