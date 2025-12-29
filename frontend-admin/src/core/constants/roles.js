/**
 * Roles y Permisos
 * @description Definición de roles de usuario y sus permisos
 */

export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  VIEWER: 'viewer',
};

export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: 'view_dashboard',

  // Configuración
  VIEW_CONFIG: 'view_config',
  EDIT_CONFIG: 'edit_config',

  // Incidencias
  VIEW_INCIDENCIAS: 'view_incidencias',
  CREATE_INCIDENCIA: 'create_incidencia',
  EDIT_INCIDENCIA: 'edit_incidencia',
  DELETE_INCIDENCIA: 'delete_incidencia',

  // Soporte
  VIEW_SOPORTE: 'view_soporte',
  EDIT_SOPORTE: 'edit_soporte',
  DELETE_SOPORTE: 'delete_soporte',
  REPLY_TICKET: 'reply_ticket',
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.MODERATOR]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_INCIDENCIAS,
    PERMISSIONS.EDIT_INCIDENCIA,
    PERMISSIONS.VIEW_SOPORTE,
    PERMISSIONS.EDIT_SOPORTE,
    PERMISSIONS.REPLY_TICKET,
  ],
  [USER_ROLES.VIEWER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_INCIDENCIAS,
    PERMISSIONS.VIEW_SOPORTE,
  ],
};

export default USER_ROLES;
