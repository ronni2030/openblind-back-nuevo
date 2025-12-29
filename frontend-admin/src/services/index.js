/**
 * Services Index - Exportaciones centralizadas de todos los servicios
 *
 * @description Punto único de importación para todos los servicios de la aplicación
 * @author OpenBlind Team
 */

// Core
export { default as http } from '../core/services/httpClient';

// Dashboard
export {
  dashboardService,
  default as DashboardService
} from '../modules/dashboard/services/dashboardService';

// Configuración (Josselyn)
export {
  configuracionService,
  default as ConfiguracionService
} from '../modules/configuracion/services/configuracionService';

// Incidencias (David)
export {
  incidenciasService,
  default as IncidenciasService
} from '../modules/incidencias/services/incidenciasService';

// Soporte (David)
export {
  soporteService,
  default as SoporteService
} from '../modules/soporte/services/soporteService';

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
  dashboard: dashboardService,
  configuracion: configuracionService,
  incidencias: incidenciasService,
  soporte: soporteService,
};
