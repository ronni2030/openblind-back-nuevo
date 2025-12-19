/**
 * Caso de Uso: Listar Contactos de Emergencia
 * Obtiene todos los contactos de un cliente ordenados por prioridad
 */
export class ListarContactosUseCase {
  constructor(contactoRepository) {
    this.contactoRepository = contactoRepository;
  }

  /**
   * Ejecutar caso de uso
   * @param {number} idCliente
   * @returns {Promise<ContactoEmergencia[]>}
   */
  async execute(idCliente) {
    if (!idCliente) {
      throw new Error('ID de cliente es requerido');
    }

    const contactos = await this.contactoRepository.getAll(idCliente);

    // Ordenar por prioridad (1 = más prioritario)
    return contactos.sort((a, b) => a.prioridad - b.prioridad);
  }
}
