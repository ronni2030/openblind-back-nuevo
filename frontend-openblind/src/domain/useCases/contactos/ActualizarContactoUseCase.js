import { ContactoEmergencia } from '../../entities/ContactoEmergencia.js';

/**
 * Caso de Uso: Actualizar Contacto de Emergencia
 * Actualiza un contacto existente con validación
 */
export class ActualizarContactoUseCase {
  constructor(contactoRepository) {
    this.contactoRepository = contactoRepository;
  }

  /**
   * Ejecutar caso de uso
   * @param {number} id - ID del contacto a actualizar
   * @param {Object} data - Nuevos datos
   * @returns {Promise<ContactoEmergencia>}
   */
  async execute(id, data) {
    if (!id) {
      throw new Error('ID del contacto es requerido');
    }

    // Validar datos
    ContactoEmergencia.validate(data);

    // Crear entidad con nuevos datos
    const contacto = new ContactoEmergencia(data);

    // Actualizar
    const contactoActualizado = await this.contactoRepository.update(id, contacto);

    return contactoActualizado;
  }
}
