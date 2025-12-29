/**
 * Utilidades de Fecha
 * @description Funciones compartidas para manejo de fechas
 */

/**
 * Formatea una fecha
 * @param {Date|string} date - Fecha
 * @param {string} format - Formato
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return format.replace('DD', day).replace('MM', month).replace('YYYY', year);
};

/**
 * Obtiene tiempo relativo (hace 2 horas, etc.)
 * @param {Date|string} date - Fecha
 * @returns {string} Tiempo relativo
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const diff = Date.now() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Hace un momento';
  if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
  if (days < 30) return `Hace ${days} día${days > 1 ? 's' : ''}`;
  return formatDate(date);
};

/**
 * Suma días a una fecha
 * @param {Date|string} date - Fecha
 * @param {number} days - Días a sumar
 * @returns {Date} Nueva fecha
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export default {
  formatDate,
  getRelativeTime,
  addDays,
};
