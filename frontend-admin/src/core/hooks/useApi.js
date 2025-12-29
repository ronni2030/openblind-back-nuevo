/**
 * Hook base para llamadas API
 * @description Hook global para facilitar llamadas HTTP
 */

import { useState, useCallback } from 'react';
import http from '../services/httpClient';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, endpoint, data = null, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      let response;

      switch (method.toUpperCase()) {
        case 'GET':
          response = await http.get(endpoint, options);
          break;
        case 'POST':
          response = await http.post(endpoint, data, options);
          break;
        case 'PUT':
          response = await http.put(endpoint, data, options);
          break;
        case 'PATCH':
          response = await http.patch(endpoint, data, options);
          break;
        case 'DELETE':
          response = await http.delete(endpoint, options);
          break;
        default:
          throw new Error(`Método HTTP no soportado: ${method}`);
      }

      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.message || 'Error en la petición';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((endpoint, options) => request('GET', endpoint, null, options), [request]);
  const post = useCallback((endpoint, data, options) => request('POST', endpoint, data, options), [request]);
  const put = useCallback((endpoint, data, options) => request('PUT', endpoint, data, options), [request]);
  const patch = useCallback((endpoint, data, options) => request('PATCH', endpoint, data, options), [request]);
  const del = useCallback((endpoint, options) => request('DELETE', endpoint, null, options), [request]);

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    patch,
    delete: del,
  };
};

export default useApi;
