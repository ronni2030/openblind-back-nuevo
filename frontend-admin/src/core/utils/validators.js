/**
 * Funciones de Validación
 * @description Funciones para validar datos
 */

/**
 * Valida si un email es válido
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida si una contraseña es válida
 * @param {string} password - Contraseña a validar
 * @param {object} options - Opciones de validación
 * @returns {boolean} True si es válida
 */
export const isValidPassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false,
  } = options;

  if (!password || password.length < minLength) return false;
  if (requireUppercase && !/[A-Z]/.test(password)) return false;
  if (requireLowercase && !/[a-z]/.test(password)) return false;
  if (requireNumbers && !/[0-9]/.test(password)) return false;
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
};

/**
 * Valida si un número de teléfono es válido (formato Ecuador)
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} True si es válido
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  // Formato Ecuador: 09XXXXXXXX o 02XXXXXXX
  const regex = /^(0[2-9])\d{7,8}$/;
  return regex.test(phone.replace(/\s+/g, ''));
};

/**
 * Valida si una cédula ecuatoriana es válida
 * @param {string} cedula - Cédula a validar
 * @returns {boolean} True si es válida
 */
export const isValidCedula = (cedula) => {
  if (!cedula || cedula.length !== 10) return false;

  const digits = cedula.split('').map(Number);
  const province = parseInt(cedula.substring(0, 2));

  if (province < 1 || province > 24) return false;

  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    let value = digits[i] * coefficients[i];
    if (value >= 10) value -= 9;
    sum += value;
  }

  const lastDigit = digits[9];
  const calculatedDigit = sum % 10 === 0 ? 0 : 10 - (sum % 10);

  return lastDigit === calculatedDigit;
};

/**
 * Valida si una URL es válida
 * @param {string} url - URL a validar
 * @returns {boolean} True si es válida
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida si un campo está vacío
 * @param {any} value - Valor a validar
 * @returns {boolean} True si está vacío
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Valida longitud de un string
 * @param {string} value - Valor a validar
 * @param {number} min - Longitud mínima
 * @param {number} max - Longitud máxima
 * @returns {boolean} True si cumple con la longitud
 */
export const isValidLength = (value, min = 0, max = Infinity) => {
  if (!value) return min === 0;
  const length = value.length;
  return length >= min && length <= max;
};

export default {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidCedula,
  isValidUrl,
  isEmpty,
  isValidLength,
};
