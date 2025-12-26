/**
 * MÓDULO DE CONFIGURACIÓN - OpenBlind
 * Feature-Based Architecture
 * 
 * Este módulo maneja toda la configuración de la aplicación:
 * - Accesibilidad (tamaño fuente, tema, idioma, voz)
 * - Navegación (longitud ruta, paradas seguras, frecuencia)
 * - Privacidad (retención ubicaciones, tracking background)
 */

// Exportar vistas
export { ConfiguracionAccesibilidad } from './views/ConfiguracionAccesibilidad';
export { ConfiguracionNavegacion } from './views/ConfiguracionNavegacion';
export { ConfiguracionPrivacidad } from './views/ConfiguracionPrivacidad';

// Exportar hooks
export { useConfiguracion } from './hooks/useConfiguracion';

// Exportar componentes
export { VoiceCentralButton } from './components/VoiceCentralButton';
