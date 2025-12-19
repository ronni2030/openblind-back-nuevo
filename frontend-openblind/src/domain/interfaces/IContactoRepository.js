/**
 * Interface/Port: Repositorio de Contactos de Emergencia
 * Define el contrato que debe implementar cualquier repositorio de contactos
 */
export class IContactoRepository {
  /**
   * Obtener todos los contactos de un cliente
   * @param {number} idCliente
   * @returns {Promise<ContactoEmergencia[]>}
   */
  async getAll(idCliente) {
    throw new Error('Método getAll() debe ser implementado');
  }

  /**
   * Obtener un contacto por ID
   * @param {number} id
   * @returns {Promise<ContactoEmergencia>}
   */
  async getById(id) {
    throw new Error('Método getById() debe ser implementado');
  }

  /**
   * Crear un nuevo contacto
   * @param {ContactoEmergencia} contacto
   * @returns {Promise<ContactoEmergencia>}
   */
  async create(contacto) {
    throw new Error('Método create() debe ser implementado');
  }

  /**
   * Actualizar un contacto existente
   * @param {number} id
   * @param {ContactoEmergencia} contacto
   * @returns {Promise<ContactoEmergencia>}
   */
  async update(id, contacto) {
    throw new Error('Método update() debe ser implementado');
  }

  /**
   * Eliminar un contacto
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Método delete() debe ser implementado');
  }
}
