/**
 * Parser de comandos de voz usando NLP con expresiones regulares
 * Extrae información estructurada de comandos en lenguaje natural
 */
export class CommandParser {
  /**
   * Extraer información de comando de contacto
   * Ejemplo: "agrega a mi hija su número es 099-123-4567 su nombre es María"
   * @param {string} comando
   * @returns {Object|null}
   */
  static extractContacto(comando) {
    const patterns = {
      nombre: /(?:nombre es|se llama|llamado|llamada)\s+([a-záéíóúñ\s]+?)(?:\s+su|\s+número|$)/i,
      telefono: /(?:número es|teléfono es|su número|celular)\s*([0-9\-\s]+)/i,
      relacion: /(?:mi|a mi)\s+(mamá|papá|madre|padre|hijo|hija|hermano|hermana|esposo|esposa|tío|tía|primo|prima|abuelo|abuela)/i
    };

    const resultado = {};

    const matchNombre = comando.match(patterns.nombre);
    if (matchNombre) resultado.nombreContacto = matchNombre[1].trim();

    const matchTelefono = comando.match(patterns.telefono);
    if (matchTelefono) resultado.telefono = matchTelefono[1].replace(/[\s\-]/g, '');

    const matchRelacion = comando.match(patterns.relacion);
    if (matchRelacion) resultado.relacion = matchRelacion[1];

    return Object.keys(resultado).length > 0 ? resultado : null;
  }

  /**
   * Extraer información de comando de lugar
   * Ejemplo: "agrega mi trabajo en Av. Amazonas"
   * @param {string} comando
   * @returns {Object|null}
   */
  static extractLugar(comando) {
    const patterns = {
      nombre: /(?:agrega|guardar|agregar)\s+(?:mi\s+)?([a-záéíóúñ\s]+?)(?:\s+en|\s+ubicado|$)/i,
      direccion: /(?:en|ubicado en|dirección)\s+([^,]+)/i
    };

    const resultado = {};

    const matchNombre = comando.match(patterns.nombre);
    if (matchNombre) resultado.nombreLugar = matchNombre[1].trim();

    const matchDireccion = comando.match(patterns.direccion);
    if (matchDireccion) resultado.direccion = matchDireccion[1].trim();

    return Object.keys(resultado).length > 0 ? resultado : null;
  }

  /**
   * Detectar comando de navegación
   * @param {string} comando
   * @returns {boolean}
   */
  static isNavigationCommand(comando) {
    return /(?:quiero ir|llévame|navegar|ir a|cómo llego)\s+(?:a\s+)?([a-záéíóúñ\s]+)/i.test(comando);
  }

  /**
   * Extraer destino de comando de navegación
   * @param {string} comando
   * @returns {string|null}
   */
  static extractDestination(comando) {
    const match = comando.match(/(?:quiero ir|llévame|navegar|ir a|cómo llego)\s+(?:a\s+)?([a-záéíóúñ\s]+)/i);
    return match ? match[1].trim() : null;
  }

  /**
   * Detectar comando de llamada
   * @param {string} comando
   * @returns {boolean}
   */
  static isCallCommand(comando) {
    return /(?:llama|llamar|marcar)\s+(?:a\s+)?([a-záéíóúñ\s]+)/i.test(comando);
  }

  /**
   * Extraer contacto a llamar
   * @param {string} comando
   * @returns {string|null}
   */
  static extractCallTarget(comando) {
    const match = comando.match(/(?:llama|llamar|marcar)\s+(?:a\s+)?(?:mi\s+)?([a-záéíóúñ\s]+)/i);
    return match ? match[1].trim() : null;
  }

  /**
   * Detectar comando de vista
   * @param {string} comando
   * @returns {string|null} - 'dashboard', 'lugares', 'contactos', null
   */
  static detectViewCommand(comando) {
    if (/(?:inicio|dashboard|menú|principal)/i.test(comando)) {
      return 'dashboard';
    }
    if (/(?:lugares|lugar|mapa)/i.test(comando)) {
      return 'lugares';
    }
    if (/(?:contactos|contacto|emergencia)/i.test(comando)) {
      return 'contactos';
    }
    return null;
  }

  /**
   * Detectar comando de creación
   * @param {string} comando
   * @returns {boolean}
   */
  static isCreateCommand(comando) {
    return /(?:agrega|agregar|crear|nuevo|nueva|guardar)/i.test(comando);
  }

  /**
   * Detectar comando de listado
   * @param {string} comando
   * @returns {boolean}
   */
  static isListCommand(comando) {
    return /(?:lista|listar|mostrar|ver todos|cuántos)/i.test(comando);
  }
}
