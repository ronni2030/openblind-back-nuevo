/**
 * Caso de Uso: Listar Lugares Favoritos
 * Obtiene todos los lugares de un cliente
 */
export class ListarLugaresUseCase {
  constructor(lugarRepository) {
    this.lugarRepository = lugarRepository;
  }

  /**
   * Ejecutar caso de uso
   * @param {number} idCliente
   * @returns {Promise<LugarFavorito[]>}
   */
  async execute(idCliente) {
    if (!idCliente) {
      throw new Error('ID de cliente es requerido');
    }

    const lugares = await this.lugarRepository.getAll(idCliente);
    return lugares;
  }
}
