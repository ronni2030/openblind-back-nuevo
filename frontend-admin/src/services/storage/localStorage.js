/**
 * LocalStorage Service
 * @description Wrapper para localStorage con manejo de errores
 */

class LocalStorageService {
  /**
   * Obtiene un valor del localStorage
   * @param {string} key - Clave
   * @returns {any} Valor parseado o null
   */
  get(key) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error al leer '${key}' del localStorage:`, error);
      return null;
    }
  }

  /**
   * Guarda un valor en localStorage
   * @param {string} key - Clave
   * @param {any} value - Valor a guardar
   * @returns {boolean} True si se guardó exitosamente
   */
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error al guardar '${key}' en localStorage:`, error);
      return false;
    }
  }

  /**
   * Elimina un valor del localStorage
   * @param {string} key - Clave
   * @returns {boolean} True si se eliminó exitosamente
   */
  remove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error al eliminar '${key}' del localStorage:`, error);
      return false;
    }
  }

  /**
   * Limpia todo el localStorage
   * @returns {boolean} True si se limpió exitosamente
   */
  clear() {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
      return false;
    }
  }

  /**
   * Verifica si existe una clave
   * @param {string} key - Clave
   * @returns {boolean} True si existe
   */
  has(key) {
    return window.localStorage.getItem(key) !== null;
  }

  /**
   * Obtiene todas las claves
   * @returns {string[]} Array de claves
   */
  keys() {
    return Object.keys(window.localStorage);
  }
}

// Singleton
const localStorageService = new LocalStorageService();

export default localStorageService;
