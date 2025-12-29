/**
 * Funciones de Formateo
 * @description Funciones para convertir datos a formato legible
 */

/**
 * Formatea una fecha a formato legible
 * @param {Date|string} date - Fecha a formatear
 * @param {string} format - Formato deseado (default: 'DD/MM/YYYY')
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return '';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * Formatea un número a moneda
 * @param {number} amount - Cantidad a formatear
 * @param {string} currency - Código de moneda (default: 'USD')
 * @returns {string} Cantidad formateada
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number') return '';

  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return '';
  return new Intl.NumberFormat('es-EC').format(num);
};

/**
 * Formatea bytes a formato legible (KB, MB, GB)
 * @param {number} bytes - Cantidad de bytes
 * @param {number} decimals - Decimales a mostrar
 * @returns {string} Tamaño formateado
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Formatea un tiempo relativo (hace 2 horas, hace 3 días, etc.)
 * @param {Date|string} date - Fecha a comparar
 * @returns {string} Tiempo relativo
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const now = new Date();
  const diff = now - d;
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

export default {
  formatDate,
  formatCurrency,
  formatNumber,
  formatBytes,
  formatRelativeTime,
};
