import { ILugarRepository } from '../../domain/interfaces/ILugarRepository.js';
import { LugarFavorito } from '../../domain/entities/LugarFavorito.js';

/**
 * Implementación del repositorio de Lugares usando API HTTP
 * Adapter que conecta con el backend REST
 */
export class LugarRepository extends ILugarRepository {
  constructor(apiClient) {
    super();
    this.apiClient = apiClient;
    this.endpoint = '/lugares-favoritos';
  }

  /**
   * Obtener todos los lugares de un cliente
   * @param {number} idCliente
   * @returns {Promise<LugarFavorito[]>}
   */
  async getAll(idCliente) {
    const data = await this.apiClient.get(`${this.endpoint}/cliente/${idCliente}`);
    return data.map(item => LugarFavorito.fromAPI(item));
  }

  /**
   * Obtener un lugar por ID
   * @param {number} id
   * @returns {Promise<LugarFavorito>}
   */
  async getById(id) {
    const data = await this.apiClient.get(`${this.endpoint}/${id}`);
    return LugarFavorito.fromAPI(data);
  }

  /**
   * Crear un nuevo lugar
   * @param {LugarFavorito} lugar
   * @returns {Promise<LugarFavorito>}
   */
  async create(lugar) {
    const data = await this.apiClient.post(`${this.endpoint}/crear`, lugar.toAPI());
    return LugarFavorito.fromAPI(data);
  }

  /**
   * Actualizar un lugar existente
   * @param {number} id
   * @param {LugarFavorito} lugar
   * @returns {Promise<LugarFavorito>}
   */
  async update(id, lugar) {
    const data = await this.apiClient.put(`${this.endpoint}/actualizar/${id}`, lugar.toAPI());
    return LugarFavorito.fromAPI(data);
  }

  /**
   * Eliminar un lugar
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    await this.apiClient.delete(`${this.endpoint}/eliminar/${id}`);
    return true;
  }
}
