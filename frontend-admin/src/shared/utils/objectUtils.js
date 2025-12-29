/**
 * Utilidades de Objetos
 * @description Funciones compartidas para manipulación de objetos
 */

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
export const merge = (target, source) => {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = merge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
};

/**
 * Verifica si está vacío
 * @param {any} obj - Objeto a verificar
 * @returns {boolean} True si está vacío
 */
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'string') return obj.trim().length === 0;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

/**
 * Verifica si es un objeto
 * @param {any} item - Valor a verificar
 * @returns {boolean} True si es objeto
 */
const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export default {
  deepClone,
  merge,
  isEmpty,
};
