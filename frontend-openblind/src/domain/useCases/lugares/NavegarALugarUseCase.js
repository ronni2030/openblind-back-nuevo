/**
 * Caso de Uso: Navegar a Lugar Favorito
 * Abre Google Maps con navegación al lugar
 */
export class NavegarALugarUseCase {
  constructor(lugarRepository, speechService) {
    this.lugarRepository = lugarRepository;
    this.speechService = speechService;
  }

  /**
   * Ejecutar caso de uso
   * @param {number} id - ID del lugar
   * @returns {Promise<void>}
   */
  async execute(id) {
    if (!id) {
      throw new Error('ID del lugar es requerido');
    }

    // Obtener lugar
    const lugar = await this.lugarRepository.getById(id);

    if (!lugar) {
      throw new Error('Lugar no encontrado');
    }

    // Abrir Google Maps
    const url = lugar.getGoogleMapsURL();
    window.open(url, '_blank');

    // Anunciar por voz
    if (this.speechService) {
      await this.speechService.speak(`Navegando a ${lugar.nombreLugar}`);
    }
  }

  /**
   * Navegar buscando por nombre
   * @param {string} nombreLugar
   * @param {number} idCliente
   * @returns {Promise<void>}
   */
  async executeByName(nombreLugar, idCliente) {
    // Obtener todos los lugares
    const lugares = await this.lugarRepository.getAll(idCliente);

    // Buscar por nombre (case-insensitive)
    const lugar = lugares.find(l =>
      l.nombreLugar.toLowerCase().includes(nombreLugar.toLowerCase())
    );

    if (!lugar) {
      throw new Error(`No se encontró el lugar "${nombreLugar}"`);
    }

    // Abrir Google Maps
    const url = lugar.getGoogleMapsURL();
    window.open(url, '_blank');

    // Anunciar por voz
    if (this.speechService) {
      await this.speechService.speak(`Navegando a ${lugar.nombreLugar}`);
    }
  }
}
