/**
 * Theme Provider
 * @description Proveedor de contexto de tema para toda la aplicación
 */

import { createContext, useContext } from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const theme = useTheme();

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext debe usarse dentro de ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
