/**
 * Caso de Uso: Eliminar Lugar Favorito
 * Elimina un lugar del sistema
 */
export class EliminarLugarUseCase {
  constructor(lugarRepository) {
    this.lugarRepository = lugarRepository;
  }

  /**
   * Ejecutar caso de uso
   * @param {number} id - ID del lugar a eliminar
   * @returns {Promise<boolean>}
   */
  async execute(id) {
    if (!id) {
      throw new Error('ID del lugar es requerido');
    }

    const resultado = await this.lugarRepository.delete(id);
    return resultado;
  }
}
