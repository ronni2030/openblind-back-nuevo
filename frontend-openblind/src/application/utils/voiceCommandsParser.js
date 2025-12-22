// Extraer información de comandos naturales para Contactos
export const extraerContacto = (comando) => {
  // Ejemplo: "agrega a mi hija su número es 099-123-4567 su nombre es María"
  const patterns = {
    nombre: /(?:nombre es|se llama|llamado|llamada)\s+([a-záéíóúñ\s]+?)(?:\s+su|\s+número|$)/i,
    telefono: /(?:número es|teléfono es|su número|celular)\s*([0-9\-\s]+)/i,
    relacion: /(?:mi|a mi)\s+(mamá|papá|madre|padre|hijo|hija|hermano|hermana|esposo|esposa|tío|tía|primo|prima|abuelo|abuela)/i
  };

  const resultado = {};

  // Extraer nombre
  const matchNombre = comando.match(patterns.nombre);
  if (matchNombre) resultado.nombreContacto = matchNombre[1].trim();

  // Extraer teléfono
  const matchTelefono = comando.match(patterns.telefono);
  if (matchTelefono) resultado.telefono = matchTelefono[1].replace(/[\s\-]/g, '');

  // Extraer relación
  const matchRelacion = comando.match(patterns.relacion);
  if (matchRelacion) resultado.relacion = matchRelacion[1];

  return Object.keys(resultado).length > 0 ? resultado : null;
};

// Extraer lugar de comandos
export const extraerLugar = (comando) => {
  const resultado = {};

  // Detectar si dice "donde estoy" / "ubicación actual" / "en la que estoy"
  if (/(?:donde estoy|ubicación actual|en la que estoy|ubicación en la que estoy|el lugar donde estoy|la ubicación donde estoy)/i.test(comando)) {
    resultado.usarGPS = true;
    resultado.nombreLugar = '';
    resultado.direccion = '';
    return resultado;
  }

  // Si NO es GPS, extraer nombre y dirección normales
  // Ejemplo: "agrega mi casa en Av. Amazonas"
  const matchNombre = comando.match(/(?:agrega|guardar|agregar|crear)\s+(?:mi\s+)?([a-záéíóúñ\s]+?)(?:\s+en|\s+ubicado|$)/i);
  if (matchNombre) {
    const nombre = matchNombre[1].trim();
    // Filtrar palabras que no son nombres de lugar
    if (!/(donde|ubicación|que estoy)/i.test(nombre)) {
      resultado.nombreLugar = nombre;
    }
  }

  const matchDireccion = comando.match(/(?:en|ubicado en|dirección)\s+([^,]+)/i);
  if (matchDireccion) resultado.direccion = matchDireccion[1].trim();

  return Object.keys(resultado).length > 0 ? resultado : null;
};

// Detectar comando de navegación
export const esComandoNavegacion = (comando) => {
  return /(?:quiero ir|llévame|navegar|ir a|cómo llego)\s+(?:a\s+)?([a-záéíóúñ\s]+)/i.test(comando);
};

// Extraer destino
export const extraerDestino = (comando) => {
  const match = comando.match(/(?:quiero ir|llévame|navegar|ir a|cómo llego)\s+(?:a\s+)?([a-záéíóúñ\s]+)/i);
  return match ? match[1].trim() : null;
};
