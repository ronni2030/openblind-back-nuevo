import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para manejar contactos de emergencia
 * @param {Object} useCases - Casos de uso de contactos
 * @param {number} idCliente - ID del cliente
 */
export const useContactos = (useCases, idCliente) => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Cargar contactos del cliente
   */
  const loadContactos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await useCases.listar.execute(idCliente);
      setContactos(data);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando contactos:', err);
    } finally {
      setLoading(false);
    }
  }, [useCases.listar, idCliente]);

  /**
   * Crear nuevo contacto
   */
  const createContacto = async (contactoData) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoContacto = await useCases.crear.execute({
        ...contactoData,
        idCliente
      });
      setContactos(prev => [nuevoContacto, ...prev]);
      return nuevoContacto;
    } catch (err) {
      setError(err.message);
      console.error('Error creando contacto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar contacto existente
   */
  const updateContacto = async (id, contactoData) => {
    setLoading(true);
    setError(null);
    try {
      const contactoActualizado = await useCases.actualizar.execute(id, {
        ...contactoData,
        idCliente
      });
      setContactos(prev =>
        prev.map(c => c.idContactoEmergencia === id ? contactoActualizado : c)
      );
      return contactoActualizado;
    } catch (err) {
      setError(err.message);
      console.error('Error actualizando contacto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar contacto
   */
  const deleteContacto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await useCases.eliminar.execute(id);
      setContactos(prev => prev.filter(c => c.idContactoEmergencia !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error eliminando contacto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Llamar a contacto
   */
  const callContacto = async (id) => {
    try {
      await useCases.llamar.execute(id);
    } catch (err) {
      setError(err.message);
      console.error('Error llamando:', err);
      throw err;
    }
  };

  // Cargar contactos al montar
  useEffect(() => {
    loadContactos();
  }, [loadContactos]);

  return {
    contactos,
    loading,
    error,
    loadContactos,
    createContacto,
    updateContacto,
    deleteContacto,
    callContacto
  };
};
