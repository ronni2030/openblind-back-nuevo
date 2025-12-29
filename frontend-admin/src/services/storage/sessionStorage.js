/**
 * SessionStorage Service
 * @description Wrapper para sessionStorage con manejo de errores
 */

class SessionStorageService {
  /**
   * Obtiene un valor del sessionStorage
   * @param {string} key - Clave
   * @returns {any} Valor parseado o null
   */
  get(key) {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error al leer '${key}' del sessionStorage:`, error);
      return null;
    }
  }

  /**
   * Guarda un valor en sessionStorage
   * @param {string} key - Clave
   * @param {any} value - Valor a guardar
   * @returns {boolean} True si se guardó exitosamente
   */
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error al guardar '${key}' en sessionStorage:`, error);
      return false;
    }
  }

  /**
   * Elimina un valor del sessionStorage
   * @param {string} key - Clave
   * @returns {boolean} True si se eliminó exitosamente
   */
  remove(key) {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error al eliminar '${key}' del sessionStorage:`, error);
      return false;
    }
  }

  /**
   * Limpia todo el sessionStorage
   * @returns {boolean} True si se limpió exitosamente
   */
  clear() {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error al limpiar sessionStorage:', error);
      return false;
    }
  }

  /**
   * Verifica si existe una clave
   * @param {string} key - Clave
   * @returns {boolean} True si existe
   */
  has(key) {
    return window.sessionStorage.getItem(key) !== null;
  }

  /**
   * Obtiene todas las claves
   * @returns {string[]} Array de claves
   */
  keys() {
    return Object.keys(window.sessionStorage);
  }
}

// Singleton
const sessionStorageService = new SessionStorageService();

export default sessionStorageService;
