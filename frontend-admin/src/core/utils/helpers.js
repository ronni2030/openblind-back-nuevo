/**
 * Funciones Auxiliares Generales
 * @description Funciones de utilidad general
 */

/**
 * Genera un ID único
 * @returns {string} ID único
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce: retrasa la ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle: limita la frecuencia de ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Tiempo mínimo entre ejecuciones
 * @returns {Function} Función con throttle
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Clona profundamente un objeto
 * @param {any} obj - Objeto a clonar
 * @returns {any} Objeto clonado
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));

  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
};

/**
 * Combina objetos profundamente
 * @param {object} target - Objeto destino
 * @param {object} source - Objeto fuente
 * @returns {object} Objeto combinado
 */
export const deepMerge = (target, source) => {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
};

/**
 * Verifica si un valor es un objeto
 * @param {any} item - Valor a verificar
 * @returns {boolean} True si es objeto
 */
export const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string} String capitalizado
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Trunca un string a una longitud específica
 * @param {string} str - String a truncar
 * @param {number} length - Longitud máxima
 * @param {string} ending - Terminación (default: '...')
 * @returns {string} String truncado
 */
export const truncate = (str, length = 50, ending = '...') => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length - ending.length) + ending;
};

/**
 * Convierte un string a slug (URL-friendly)
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
 * Espera un tiempo determinado (async/await)
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise} Promesa que se resuelve después del tiempo
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Obtiene un valor anidado de un objeto usando notación de punto
 * @param {object} obj - Objeto fuente
 * @param {string} path - Ruta (ej: 'user.address.city')
 * @param {any} defaultValue - Valor por defecto
 * @returns {any} Valor encontrado o valor por defecto
 */
export const getNestedValue = (obj, path, defaultValue = null) => {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }

  return result;
};

export default {
  generateId,
  debounce,
  throttle,
  deepClone,
  deepMerge,
  isObject,
  capitalize,
  truncate,
  slugify,
  sleep,
  getNestedValue,
};
