/**
 * Configuración de Rutas
 * @description Define todas las URLs y rutas de la aplicación
 */

export const routePaths = {
  // Autenticación
  LOGIN: '/login',
  LOGOUT: '/logout',

  // Dashboard
  DASHBOARD: '/',

  // Configuración (Josselyn)
  CONFIG_NAVEGACION: '/configuracion/navegacion',
  CONFIG_PRIVACIDAD: '/configuracion/privacidad',
  CONFIG_ACCESIBILIDAD: '/configuracion/accesibilidad',

  // Incidencias (David)
  INCIDENCIAS: '/incidencias',
  INCIDENCIA_DETAIL: '/incidencias/:id',

  // Soporte (David)
  SOPORTE: '/soporte',
  TICKET_DETAIL: '/soporte/:id',

  // Errores
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
};

export const routeNames = {
  LOGIN: 'Login',
  DASHBOARD: 'Dashboard',
  CONFIG_NAVEGACION: 'Configuración de Navegación',
  CONFIG_PRIVACIDAD: 'Configuración de Privacidad',
  CONFIG_ACCESIBILIDAD: 'Configuración de Accesibilidad',
  INCIDENCIAS: 'Incidencias',
  SOPORTE: 'Soporte',
};

export default routePaths;
