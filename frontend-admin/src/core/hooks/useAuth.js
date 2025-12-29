/**
 * Hook de Autenticación
 * @description Hook global para manejar autenticación de usuarios
 */

import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implementar llamada al backend
      // const response = await authService.login(credentials);
      // const { user, token } = response;

      // Mock temporal
      const user = { id: 1, username: credentials.username, role: 'admin' };
      const token = 'mock-token';

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setUser(user);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
  };
};

export default useAuth;
