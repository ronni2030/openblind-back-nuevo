/**
 * Configuraciones Fijas
 * @description Valores constantes utilizados en toda la aplicación
 */

export const SETTINGS = {
  // Límites y restricciones
  MAX_FILE_SIZE: 5242880, // 5MB en bytes
  MAX_UPLOAD_FILES: 5,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_TITLE_LENGTH: 100,

  // Paginación
  ITEMS_PER_PAGE: 10,
  PAGES_SHOWN: 5,

  // Tiempos (en milisegundos)
  TOAST_DURATION: 3000,
  API_TIMEOUT: 30000,
  DEBOUNCE_DELAY: 500,
  AUTO_SAVE_INTERVAL: 60000, // 1 minuto

  // Estados
  STATUS: {
    PENDIENTE: 'pendiente',
    EN_PROCESO: 'en_proceso',
    RESUELTO: 'resuelto',
    CERRADO: 'cerrado',
  },

  // Prioridades
  PRIORITY: {
    BAJA: 'baja',
    MEDIA: 'media',
    ALTA: 'alta',
    CRITICA: 'critica',
  },

  // Tipos de incidencia
  INCIDENT_TYPES: {
    TECNICO: 'tecnico',
    FUNCIONAL: 'funcional',
    SEGURIDAD: 'seguridad',
    RENDIMIENTO: 'rendimiento',
    OTRO: 'otro',
  },

  // Configuración de accesibilidad
  ACCESSIBILITY: {
    MIN_FONT_SIZE: 12,
    MAX_FONT_SIZE: 24,
    DEFAULT_FONT_SIZE: 16,
  },

  // Configuración de navegación
  NAVIGATION: {
    MIN_ROUTE_LENGTH: 1,
    MAX_ROUTE_LENGTH: 500,
    DEFAULT_ROUTE_LENGTH: 100,
  },

  // Configuración de privacidad
  PRIVACY: {
    RETENTION_DAYS_OPTIONS: [7, 30, 90, 365],
    DEFAULT_RETENTION_DAYS: 30,
  },
};

export default SETTINGS;
