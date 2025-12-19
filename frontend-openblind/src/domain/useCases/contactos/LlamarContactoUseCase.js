/**
 * Caso de Uso: Llamar a Contacto de Emergencia
 * Inicia llamada telefónica al contacto
 */
export class LlamarContactoUseCase {
  constructor(contactoRepository, speechService) {
    this.contactoRepository = contactoRepository;
    this.speechService = speechService;
  }

  /**
   * Ejecutar caso de uso
   * @param {number} id - ID del contacto
   * @returns {Promise<void>}
   */
  async execute(id) {
    if (!id) {
      throw new Error('ID del contacto es requerido');
    }

    // Obtener contacto
    const contacto = await this.contactoRepository.getById(id);

    if (!contacto) {
      throw new Error('Contacto no encontrado');
    }

    // Abrir marcador telefónico
    window.location.href = contacto.getCallURL();

    // Anunciar por voz
    if (this.speechService) {
      await this.speechService.speak(
        `Llamando a ${contacto.getVoiceDescription()}`
      );
    }
  }

  /**
   * Llamar buscando por nombre o relación
   * @param {string} query - Nombre o relación
   * @param {number} idCliente
   * @returns {Promise<void>}
   */
  async executeByQuery(query, idCliente) {
    // Obtener todos los contactos
    const contactos = await this.contactoRepository.getAll(idCliente);

    // Buscar por nombre o relación (case-insensitive)
    const contacto = contactos.find(c =>
      c.nombreContacto.toLowerCase().includes(query.toLowerCase()) ||
      (c.relacion && c.relacion.toLowerCase().includes(query.toLowerCase()))
    );

    if (!contacto) {
      throw new Error(`No se encontró el contacto "${query}"`);
    }

    // Abrir marcador telefónico
    window.location.href = contacto.getCallURL();

    // Anunciar por voz
    if (this.speechService) {
      await this.speechService.speak(
        `Llamando a ${contacto.getVoiceDescription()}`
      );
    }
  }
}
