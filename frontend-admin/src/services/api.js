/**
 * API - Archivo de retrocompatibilidad
 *
 * ⚠️ DEPRECADO: Este archivo existe solo para mantener compatibilidad
 * con código antiguo que importa desde '@services/api'
 *
 * ✅ RECOMENDADO: Importar desde servicios específicos o '@services'
 *
 * Ejemplos de uso CORRECTO:
 * - import { dashboardService } from '@services'
 * - import { getMetricsResumen } from '@services'
 * - import configuracionService from '@modules/configuracion/services/configuracionService'
 *
 * @deprecated Migrar a imports de servicios específicos por módulo
 * @see src/services/index.js
 */

// Re-exportar todo desde services/index.js para retrocompatibilidad
export * from './index';
export { default } from './index';
