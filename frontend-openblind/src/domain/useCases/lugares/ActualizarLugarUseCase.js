import { LugarFavorito } from '../../entities/LugarFavorito.js';

/**
 * Caso de Uso: Actualizar Lugar Favorito
 * Actualiza un lugar existente con validación
 */
export class ActualizarLugarUseCase {
  constructor(lugarRepository) {
    this.lugarRepository = lugarRepository;
  }

  /**
   * Ejecutar caso de uso
   * @param {number} id - ID del lugar a actualizar
   * @param {Object} data - Nuevos datos
   * @returns {Promise<LugarFavorito>}
   */
  async execute(id, data) {
    if (!id) {
      throw new Error('ID del lugar es requerido');
    }

    // Validar datos
    LugarFavorito.validate(data);

    // Crear entidad con nuevos datos
    const lugar = new LugarFavorito(data);

    // Actualizar
    const lugarActualizado = await this.lugarRepository.update(id, lugar);

    return lugarActualizado;
  }
}
