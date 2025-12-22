// Obtener ubicación actual
export const obtenerUbicacionActual = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocalización no disponible');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => reject(error.message)
    );
  });
};

// Obtener dirección a partir de coordenadas (reverse geocoding)
export const obtenerDireccionDeCoords = async (lat, lng) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=es`);
    const data = await response.json();
    if (data && data.display_name) {
      return data.display_name;
    }
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  } catch (error) {
    console.error('Error obteniendo dirección:', error);
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
};
