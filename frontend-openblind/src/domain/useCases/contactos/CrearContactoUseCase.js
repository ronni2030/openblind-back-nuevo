import { ContactoEmergencia } from '../../entities/ContactoEmergencia.js';

/**
 * Caso de Uso: Crear Contacto de Emergencia
 * Coordina la creación de un nuevo contacto con validación
 */
export class CrearContactoUseCase {
  constructor(contactoRepository) {
    this.contactoRepository = contactoRepository;
  }

  /**
   * Ejecutar caso de uso
   * @param {Object} data - Datos del contacto
   * @returns {Promise<ContactoEmergencia>}
   */
  async execute(data) {
    // Validar datos
    ContactoEmergencia.validate(data);

    // Crear entidad
    const contacto = new ContactoEmergencia(data);

    // Persistir
    const contactoCreado = await this.contactoRepository.create(contacto);

    return contactoCreado;
  }
}
