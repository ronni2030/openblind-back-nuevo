/**
 * Utilidades de String
 * @description Funciones compartidas para manipulación de strings
 */

/**
 * Capitaliza la primera letra
 * @param {string} str - String a capitalizar
 * @returns {string} String capitalizado
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Trunca un string
 * @param {string} str - String a truncar
 * @param {number} length - Longitud máxima
 * @param {string} ending - Terminación
 * @returns {string} String truncado
 */
export const truncate = (str, length = 50, ending = '...') => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length - ending.length) + ending;
};

/**
 * Convierte a slug (URL-friendly)
 * @param {string} str - String a convertir
 * @returns {string} Slug
 */
export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Elimina espacios en blanco innecesarios
 * @param {string} str - String a limpiar
 * @returns {string} String limpio
 */
export const cleanWhitespace = (str) => {
  if (!str) return '';
  return str.trim().replace(/\s+/g, ' ');
};

export default {
  capitalize,
  truncate,
  slugify,
  cleanWhitespace,
};
