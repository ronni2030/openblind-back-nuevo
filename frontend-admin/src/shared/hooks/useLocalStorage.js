/**
 * Hook para usar LocalStorage
 * @description Facilita el uso de localStorage con React state
 */

import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Obtener valor inicial del localStorage o usar el valor por defecto
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer ${key} del localStorage:`, error);
      return initialValue;
    }
  });

  // Guardar en localStorage cuando el valor cambie
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error al guardar ${key} en localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
