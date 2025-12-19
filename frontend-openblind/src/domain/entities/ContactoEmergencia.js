/**
 * Entidad de dominio: Contacto de Emergencia
 * Representa un contacto de emergencia del usuario
 */
export class ContactoEmergencia {
  constructor({
    idContactoEmergencia = null,
    idCliente,
    nombreContacto,
    telefono,
    relacion = null,
    prioridad = 1,
    createContactoEmergencia = null,
    updateContactoEmergencia = null
  }) {
    this.idContactoEmergencia = idContactoEmergencia;
    this.idCliente = idCliente;
    this.nombreContacto = nombreContacto;
    this.telefono = telefono;
    this.relacion = relacion;
    this.prioridad = prioridad;
    this.createContactoEmergencia = createContactoEmergencia;
    this.updateContactoEmergencia = updateContactoEmergencia;
  }

  // Validación de datos
  static validate(data) {
    if (!data.nombreContacto || data.nombreContacto.trim() === '') {
      throw new Error('El nombre del contacto es requerido');
    }
    if (!data.telefono || data.telefono.trim() === '') {
      throw new Error('El teléfono es requerido');
    }
    // Validación simple de teléfono (números y guiones)
    const telefonoLimpio = data.telefono.replace(/[\s\-]/g, '');
    if (!/^\d{7,15}$/.test(telefonoLimpio)) {
      throw new Error('El teléfono debe tener entre 7 y 15 dígitos');
    }
    return true;
  }

  // Crear desde respuesta de API
  static fromAPI(data) {
    return new ContactoEmergencia(data);
  }

  // Convertir a formato para API
  toAPI() {
    return {
      idCliente: this.idCliente,
      nombreContacto: this.nombreContacto,
      telefono: this.telefono,
      relacion: this.relacion,
      prioridad: this.prioridad
    };
  }

  // Obtener teléfono formateado para llamada
  getCallURL() {
    const telefonoLimpio = this.telefono.replace(/[\s\-]/g, '');
    return `tel:${telefonoLimpio}`;
  }

  // Obtener descripción del contacto para voz
  getVoiceDescription() {
    if (this.relacion) {
      return `${this.nombreContacto}, ${this.relacion}`;
    }
    return this.nombreContacto;
  }
}
