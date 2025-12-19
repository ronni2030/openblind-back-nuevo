import { IContactoRepository } from '../../domain/interfaces/IContactoRepository.js';
import { ContactoEmergencia } from '../../domain/entities/ContactoEmergencia.js';

/**
 * Implementación del repositorio de Contactos usando API HTTP
 * Adapter que conecta con el backend REST
 */
export class ContactoRepository extends IContactoRepository {
  constructor(apiClient) {
    super();
    this.apiClient = apiClient;
    this.endpoint = '/contactos-emergencia';
  }

  /**
   * Obtener todos los contactos de un cliente
   * @param {number} idCliente
   * @returns {Promise<ContactoEmergencia[]>}
   */
  async getAll(idCliente) {
    const data = await this.apiClient.get(`${this.endpoint}/cliente/${idCliente}`);
    return data.map(item => ContactoEmergencia.fromAPI(item));
  }

  /**
   * Obtener un contacto por ID
   * @param {number} id
   * @returns {Promise<ContactoEmergencia>}
   */
  async getById(id) {
    const data = await this.apiClient.get(`${this.endpoint}/${id}`);
    return ContactoEmergencia.fromAPI(data);
  }

  /**
   * Crear un nuevo contacto
   * @param {ContactoEmergencia} contacto
   * @returns {Promise<ContactoEmergencia>}
   */
  async create(contacto) {
    const data = await this.apiClient.post(`${this.endpoint}/crear`, contacto.toAPI());
    return ContactoEmergencia.fromAPI(data);
  }

  /**
   * Actualizar un contacto existente
   * @param {number} id
   * @param {ContactoEmergencia} contacto
   * @returns {Promise<ContactoEmergencia>}
   */
  async update(id, contacto) {
    const data = await this.apiClient.put(`${this.endpoint}/actualizar/${id}`, contacto.toAPI());
    return ContactoEmergencia.fromAPI(data);
  }

  /**
   * Eliminar un contacto
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    await this.apiClient.delete(`${this.endpoint}/eliminar/${id}`);
    return true;
  }
}
