import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para manejar lugares favoritos
 * @param {Object} useCases - Casos de uso de lugares
 * @param {number} idCliente - ID del cliente
 */
export const useLugares = (useCases, idCliente) => {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Cargar lugares del cliente
   */
  const loadLugares = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await useCases.listar.execute(idCliente);
      setLugares(data);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando lugares:', err);
    } finally {
      setLoading(false);
    }
  }, [useCases.listar, idCliente]);

  /**
   * Crear nuevo lugar
   */
  const createLugar = async (lugarData) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoLugar = await useCases.crear.execute({
        ...lugarData,
        idCliente
      });
      setLugares(prev => [nuevoLugar, ...prev]);
      return nuevoLugar;
    } catch (err) {
      setError(err.message);
      console.error('Error creando lugar:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar lugar existente
   */
  const updateLugar = async (id, lugarData) => {
    setLoading(true);
    setError(null);
    try {
      const lugarActualizado = await useCases.actualizar.execute(id, {
        ...lugarData,
        idCliente
      });
      setLugares(prev =>
        prev.map(l => l.idLugarFavorito === id ? lugarActualizado : l)
      );
      return lugarActualizado;
    } catch (err) {
      setError(err.message);
      console.error('Error actualizando lugar:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar lugar
   */
  const deleteLugar = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await useCases.eliminar.execute(id);
      setLugares(prev => prev.filter(l => l.idLugarFavorito !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error eliminando lugar:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navegar a lugar
   */
  const navigateToLugar = async (id) => {
    try {
      await useCases.navegar.execute(id);
    } catch (err) {
      setError(err.message);
      console.error('Error navegando:', err);
      throw err;
    }
  };

  // Cargar lugares al montar
  useEffect(() => {
    loadLugares();
  }, [loadLugares]);

  return {
    lugares,
    loading,
    error,
    loadLugares,
    createLugar,
    updateLugar,
    deleteLugar,
    navigateToLugar
  };
};
