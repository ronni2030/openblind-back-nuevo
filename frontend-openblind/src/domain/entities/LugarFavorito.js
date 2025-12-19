/**
 * Entidad de dominio: Lugar Favorito
 * Representa un lugar guardado por el usuario
 */
export class LugarFavorito {
  constructor({
    idLugarFavorito = null,
    idCliente,
    nombreLugar,
    direccion,
    latitud = null,
    longitud = null,
    icono = 'place',
    createLugarFavorito = null,
    updateLugarFavorito = null
  }) {
    this.idLugarFavorito = idLugarFavorito;
    this.idCliente = idCliente;
    this.nombreLugar = nombreLugar;
    this.direccion = direccion;
    this.latitud = latitud;
    this.longitud = longitud;
    this.icono = icono;
    this.createLugarFavorito = createLugarFavorito;
    this.updateLugarFavorito = updateLugarFavorito;
  }

  // Validación de datos
  static validate(data) {
    if (!data.nombreLugar || data.nombreLugar.trim() === '') {
      throw new Error('El nombre del lugar es requerido');
    }
    if (!data.direccion || data.direccion.trim() === '') {
      throw new Error('La dirección es requerida');
    }
    return true;
  }

  // Crear desde respuesta de API
  static fromAPI(data) {
    return new LugarFavorito(data);
  }

  // Convertir a formato para API
  toAPI() {
    return {
      idCliente: this.idCliente,
      nombreLugar: this.nombreLugar,
      direccion: this.direccion,
      latitud: this.latitud,
      longitud: this.longitud,
      icono: this.icono
    };
  }

  // Verificar si tiene coordenadas GPS
  hasCoordinates() {
    return this.latitud !== null && this.longitud !== null;
  }

  // Obtener URL de Google Maps
  getGoogleMapsURL() {
    if (this.hasCoordinates()) {
      return `https://www.google.com/maps/dir/?api=1&destination=${this.latitud},${this.longitud}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.direccion)}`;
  }
}
