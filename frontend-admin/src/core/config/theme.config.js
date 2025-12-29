/**
 * Configuración de Temas
 * @description Definición de colores, fuentes y estilos globales
 */

export const themeConfig = {
  light: {
    primaryColor: '#3498db',
    secondaryColor: '#2ecc71',
    backgroundColor: '#ffffff',
    textColor: '#2c3e50',
    borderColor: '#ecf0f1',
    errorColor: '#e74c3c',
    successColor: '#2ecc71',
    warningColor: '#f39c12',
  },
  dark: {
    primaryColor: '#2980b9',
    secondaryColor: '#27ae60',
    backgroundColor: '#2c3e50',
    textColor: '#ecf0f1',
    borderColor: '#34495e',
    errorColor: '#c0392b',
    successColor: '#27ae60',
    warningColor: '#d68910',
  },
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    monospace: '"Fira Code", "Courier New", monospace',
  },
  fontSizes: {
    small: '0.875rem',    // 14px
    medium: '1rem',       // 16px
    large: '1.25rem',     // 20px
    xlarge: '1.5rem',     // 24px
  },
};

export default themeConfig;
