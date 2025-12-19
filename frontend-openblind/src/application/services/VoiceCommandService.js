import { CommandParser } from '../../infrastructure/speech/CommandParser.js';

/**
 * Servicio de coordinación de comandos de voz
 * Procesa comandos y ejecuta casos de uso correspondientes
 */
export class VoiceCommandService {
  constructor({
    speechService,
    crearLugarUseCase,
    listarLugaresUseCase,
    navegarALugarUseCase,
    crearContactoUseCase,
    listarContactosUseCase,
    llamarContactoUseCase,
    idCliente
  }) {
    this.speechService = speechService;
    this.crearLugarUseCase = crearLugarUseCase;
    this.listarLugaresUseCase = listarLugaresUseCase;
    this.navegarALugarUseCase = navegarALugarUseCase;
    this.crearContactoUseCase = crearContactoUseCase;
    this.listarContactosUseCase = listarContactosUseCase;
    this.llamarContactoUseCase = llamarContactoUseCase;
    this.idCliente = idCliente;
  }

  /**
   * Procesar comando de voz
   * @param {string} comando - Texto del comando
   * @param {Object} context - Contexto actual (vista activa, etc.)
   * @returns {Promise<Object>} - Resultado del comando
   */
  async processCommand(comando, context = {}) {
    try {
      // 1. Detectar cambio de vista
      const view = CommandParser.detectViewCommand(comando);
      if (view) {
        await this.speechService.speak(`Abriendo ${view}`);
        return { type: 'VIEW_CHANGE', view };
      }

      // 2. Detectar navegación
      if (CommandParser.isNavigationCommand(comando)) {
        const destino = CommandParser.extractDestination(comando);
        await this.navegarALugarUseCase.executeByName(destino, this.idCliente);
        return { type: 'NAVIGATION', destino };
      }

      // 3. Detectar llamada
      if (CommandParser.isCallCommand(comando)) {
        const contacto = CommandParser.extractCallTarget(comando);
        await this.llamarContactoUseCase.executeByQuery(contacto, this.idCliente);
        return { type: 'CALL', contacto };
      }

      // 4. Detectar creación basado en contexto
      if (CommandParser.isCreateCommand(comando)) {
        if (context.currentView === 'lugares') {
          return await this.handleCreateLugar(comando);
        } else if (context.currentView === 'contactos') {
          return await this.handleCreateContacto(comando);
        } else {
          await this.speechService.speak('Por favor, ve a la sección de lugares o contactos primero');
          return { type: 'ERROR', message: 'No hay contexto de creación' };
        }
      }

      // 5. Detectar listado
      if (CommandParser.isListCommand(comando)) {
        if (context.currentView === 'lugares') {
          const lugares = await this.listarLugaresUseCase.execute(this.idCliente);
          await this.speechService.speak(`Tienes ${lugares.length} lugares favoritos`);
          return { type: 'LIST', data: lugares };
        } else if (context.currentView === 'contactos') {
          const contactos = await this.listarContactosUseCase.execute(this.idCliente);
          await this.speechService.speak(`Tienes ${contactos.length} contactos de emergencia`);
          return { type: 'LIST', data: contactos };
        }
      }

      // Comando no reconocido
      await this.speechService.speak('No entendí el comando. Intenta de nuevo');
      return { type: 'UNKNOWN', comando };

    } catch (error) {
      console.error('Error procesando comando:', error);
      await this.speechService.speak('Hubo un error. Intenta de nuevo');
      return { type: 'ERROR', error: error.message };
    }
  }

  /**
   * Manejar creación de lugar
   * @private
   */
  async handleCreateLugar(comando) {
    const lugarData = CommandParser.extractLugar(comando);

    if (!lugarData || !lugarData.nombreLugar) {
      await this.speechService.speak('No pude entender el nombre del lugar');
      return { type: 'ERROR', message: 'Datos incompletos' };
    }

    // Intentar obtener ubicación GPS
    try {
      const coords = await this.getCurrentPosition();
      lugarData.latitud = coords.lat;
      lugarData.longitud = coords.lng;
    } catch (error) {
      console.log('No se pudo obtener GPS:', error);
    }

    lugarData.idCliente = this.idCliente;

    const lugar = await this.crearLugarUseCase.execute(lugarData);
    await this.speechService.speak(`Lugar ${lugar.nombreLugar} guardado`);
    return { type: 'CREATE_LUGAR', data: lugar };
  }

  /**
   * Manejar creación de contacto
   * @private
   */
  async handleCreateContacto(comando) {
    const contactoData = CommandParser.extractContacto(comando);

    if (!contactoData || !contactoData.nombreContacto || !contactoData.telefono) {
      await this.speechService.speak('Necesito el nombre y teléfono del contacto');
      return { type: 'ERROR', message: 'Datos incompletos' };
    }

    contactoData.idCliente = this.idCliente;

    const contacto = await this.crearContactoUseCase.execute(contactoData);
    await this.speechService.speak(`Contacto ${contacto.nombreContacto} guardado`);
    return { type: 'CREATE_CONTACTO', data: contacto };
  }

  /**
   * Obtener posición GPS actual
   * @private
   */
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocalización no disponible');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => reject(error.message)
      );
    });
  }
}
