/**
 * Interface/Port: Repositorio de Lugares Favoritos
 * Define el contrato que debe implementar cualquier repositorio de lugares
 */
export class ILugarRepository {
  /**
   * Obtener todos los lugares de un cliente
   * @param {number} idCliente
   * @returns {Promise<LugarFavorito[]>}
   */
  async getAll(idCliente) {
    throw new Error('Método getAll() debe ser implementado');
  }

  /**
   * Obtener un lugar por ID
   * @param {number} id
   * @returns {Promise<LugarFavorito>}
   */
  async getById(id) {
    throw new Error('Método getById() debe ser implementado');
  }

  /**
   * Crear un nuevo lugar
   * @param {LugarFavorito} lugar
   * @returns {Promise<LugarFavorito>}
   */
  async create(lugar) {
    throw new Error('Método create() debe ser implementado');
  }

  /**
   * Actualizar un lugar existente
   * @param {number} id
   * @param {LugarFavorito} lugar
   * @returns {Promise<LugarFavorito>}
   */
  async update(id, lugar) {
    throw new Error('Método update() debe ser implementado');
  }

  /**
   * Eliminar un lugar
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Método delete() debe ser implementado');
  }
}
