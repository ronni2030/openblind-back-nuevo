import { LugarFavorito } from '../../entities/LugarFavorito.js';

/**
 * Caso de Uso: Crear Lugar Favorito
 * Coordina la creación de un nuevo lugar con validación y persistencia
 */
export class CrearLugarUseCase {
  constructor(lugarRepository) {
    this.lugarRepository = lugarRepository;
  }

  /**
   * Ejecutar caso de uso
   * @param {Object} data - Datos del lugar
   * @param {number} data.idCliente
   * @param {string} data.nombreLugar
   * @param {string} data.direccion
   * @param {number} data.latitud
   * @param {number} data.longitud
   * @param {string} data.icono
   * @returns {Promise<LugarFavorito>}
   */
  async execute(data) {
    // Validar datos
    LugarFavorito.validate(data);

    // Crear entidad
    const lugar = new LugarFavorito(data);

    // Persistir
    const lugarCreado = await this.lugarRepository.create(lugar);

    return lugarCreado;
  }
}
