/**
 * Hook de Tema
 * @description Hook global para manejar el tema de la aplicación
 */

import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Aplicar tema al documento
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme('light');
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme('dark');
  }, []);

  const setHighContrastTheme = useCallback(() => {
    setTheme('high-contrast');
  }, []);

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setHighContrastTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    isHighContrast: theme === 'high-contrast',
  };
};

export default useTheme;
