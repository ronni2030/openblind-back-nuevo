/**
 * Caso de Uso: Eliminar Contacto de Emergencia
 * Elimina un contacto del sistema
 */
export class EliminarContactoUseCase {
  constructor(contactoRepository) {
    this.contactoRepository = contactoRepository;
  }

  /**
   * Ejecutar caso de uso
   * @param {number} id - ID del contacto a eliminar
   * @returns {Promise<boolean>}
   */
  async execute(id) {
    if (!id) {
      throw new Error('ID del contacto es requerido');
    }

    const resultado = await this.contactoRepository.delete(id);
    return resultado;
  }
}
