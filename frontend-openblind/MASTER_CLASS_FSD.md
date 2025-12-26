# 🎓 Master Class: Implementando Features con FSD

## 📋 Objetivo

Esta guía paso a paso enseña cómo implementar un nuevo feature en OpenBlind usando Feature-Sliced Design. Ideal para presentaciones, onboarding de nuevos miembros del equipo, y documentación del proyecto.

---

## 🎯 Caso de Estudio: Feature "Configuración"

Vamos a analizar cómo se implementó el módulo **Configuración** siguiendo FSD, paso a paso.

---

## Paso 1: Análisis de Requisitos

### Requisitos del Feature

**Módulo:** Configuración (asignado a Josselyn Moposita - N°5)

**Funcionalidades:**
1. ✅ **Configuración de Accesibilidad**
   - Tamaño de fuente (pequeña, mediana, grande, extra grande)
   - Tema de contraste (normal, alto contraste)
   - Idioma (español, inglés)
   - Velocidad de voz (0.5x a 2.0x)
   - Feedback háptico (on/off)
   - Nivel de detalle (básico, completo, experto)

2. ✅ **Configuración de Navegación**
   - Longitud máxima de ruta (1-50 km)
   - Sugerir paradas seguras (on/off)
   - Frecuencia de instrucciones (baja, media, alta)
   - Tipo de instrucción (por distancia, por tiempo)
   - Alertas de desvío y obstáculos (on/off)

3. ✅ **Configuración de Privacidad**
   - Retención de ubicaciones (7, 14, 30, 90 días)
   - Tracking en segundo plano (on/off)
   - Compartir ubicación (on/off)
   - Guardar historial (on/off)
   - Modo anónimo (on/off)

**Requisitos técnicos:**
- ✅ 100% controlable por voz
- ✅ Feedback háptico (vibraciones)
- ✅ Persistencia en localStorage
- ✅ Nueva paleta de colores (púrpura + ámbar, daltonismo-friendly)
- ✅ Animaciones con Framer Motion

---

## Paso 2: Estructura de Carpetas

### Crear la estructura del feature

```bash
mkdir -p features/configuracion/{views,components,hooks,utils}
touch features/configuracion/{index.js,README.md,styles.css}
```

**Resultado:**
```
features/configuracion/
├── index.js              # Exportaciones públicas del feature
├── README.md             # Documentación
├── styles.css            # Estilos del feature
├── views/                # Vistas React (páginas del feature)
│   ├── ConfiguracionAccesibilidad.jsx
│   ├── ConfiguracionNavegacion.jsx
│   └── ConfiguracionPrivacidad.jsx
├── components/           # Componentes específicos del feature
│   └── VoiceCentralButton.jsx
├── hooks/                # Custom hooks del feature
│   └── useConfiguracion.js
└── utils/                # Utilidades del feature
    └── (vacío por ahora)
```

---

## Paso 3: Implementar el Estado (Custom Hook)

### `features/configuracion/hooks/useConfiguracion.js`

Este hook centraliza el estado de las 3 configuraciones.

```javascript
import { useState, useEffect } from 'react';

export const useConfiguracion = () => {
  // Estado de Accesibilidad
  const [accesibilidad, setAccesibilidad] = useState({
    tamanoFuente: 'medium',
    temaContraste: 'normal',
    idioma: 'es',
    velocidadVoz: 1.0,
    volumenVoz: 80,
    feedbackHaptico: true,
    nivelDetalle: 'completo'
  });

  // Estado de Navegación
  const [navegacion, setNavegacion] = useState({
    longitudMaxima: 10,
    paradaSegura: true,
    frecuenciaInstrucciones: 'media',
    tipoInstruccion: 'distancia',
    alertaDesvio: true,
    alertaObstaculo: true
  });

  // Estado de Privacidad
  const [privacidad, setPrivacidad] = useState({
    retencionUbicacion: 30,
    trackingBackground: false,
    compartirUbicacion: true,
    guardarHistorial: true,
    permitirAnonimo: false
  });

  // Cargar desde localStorage al montar
  useEffect(() => {
    const savedAccesibilidad = localStorage.getItem('config_accesibilidad');
    const savedNavegacion = localStorage.getItem('config_navegacion');
    const savedPrivacidad = localStorage.getItem('config_privacidad');

    if (savedAccesibilidad) setAccesibilidad(JSON.parse(savedAccesibilidad));
    if (savedNavegacion) setNavegacion(JSON.parse(savedNavegacion));
    if (savedPrivacidad) setPrivacidad(JSON.parse(savedPrivacidad));
  }, []);

  // Funciones de actualización con persistencia
  const updateAccesibilidad = (key, value) => {
    const newConfig = { ...accesibilidad, [key]: value };
    setAccesibilidad(newConfig);
    localStorage.setItem('config_accesibilidad', JSON.stringify(newConfig));
  };

  const updateNavegacion = (key, value) => {
    const newConfig = { ...navegacion, [key]: value };
    setNavegacion(newConfig);
    localStorage.setItem('config_navegacion', JSON.stringify(newConfig));
  };

  const updatePrivacidad = (key, value) => {
    const newConfig = { ...privacidad, [key]: value };
    setPrivacidad(newConfig);
    localStorage.setItem('config_privacidad', JSON.stringify(newConfig));
  };

  // Resetear configuración
  const resetearConfig = (tipo) => {
    if (tipo === 'accesibilidad') {
      const defaultConfig = {
        tamanoFuente: 'medium',
        temaContraste: 'normal',
        idioma: 'es',
        velocidadVoz: 1.0,
        volumenVoz: 80,
        feedbackHaptico: true,
        nivelDetalle: 'completo'
      };
      setAccesibilidad(defaultConfig);
      localStorage.setItem('config_accesibilidad', JSON.stringify(defaultConfig));
    }
    // Similar para navegacion y privacidad...
  };

  return {
    accesibilidad,
    navegacion,
    privacidad,
    updateAccesibilidad,
    updateNavegacion,
    updatePrivacidad,
    resetearConfig
  };
};
```

**Lecciones clave:**
- ✅ **Single Responsibility**: El hook solo maneja estado de configuración
- ✅ **Persistencia automática**: Cada update guarda en localStorage
- ✅ **Inicialización**: useEffect carga datos guardados al montar
- ✅ **API clara**: Funciones específicas por tipo de config

---

## Paso 4: Implementar Componentes de UI

### `features/configuracion/components/VoiceCentralButton.jsx`

```javascript
import React from 'react';
import { speak } from '../../../application/utils/speechUtils';
import '../styles.css';

export const VoiceCentralButton = ({ isListening, onToggle }) => {
  const vibrate = (pattern = [100]) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleClick = () => {
    vibrate([50, 100, 50]); // Patrón de vibración
    onToggle();

    if (!isListening) {
      speak('Estoy escuchando');
    } else {
      speak('Comandos desactivados');
    }
  };

  return (
    <div className="voice-central">
      <button
        className={`voice-pulse-btn ${isListening ? 'listening' : ''}`}
        onClick={handleClick}
        aria-label="Activar comando de voz"
      >
        <span className="material-icons-round">
          {isListening ? 'graphic_eq' : 'mic'}
        </span>
      </button>
    </div>
  );
};
```

**Lecciones clave:**
- ✅ **Feedback multimodal**: Visual (icono), auditivo (speech), háptico (vibración)
- ✅ **Accesibilidad**: aria-label para lectores de pantalla
- ✅ **Estado visual**: Clase `listening` cambia apariencia
- ✅ **Componente tonto**: Recibe props, no tiene lógica compleja

---

## Paso 5: Implementar Vistas

### `features/configuracion/views/ConfiguracionAccesibilidad.jsx`

```javascript
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../../presentation/components/Header';
import { VoiceCentralButton } from '../components/VoiceCentralButton';
import { useConfiguracion } from '../hooks/useConfiguracion';
import useVoiceCommands from '../../../application/hooks/useVoiceCommands';
import { speak } from '../../../application/utils/speechUtils';
import '../styles.css';

export const ConfiguracionAccesibilidad = ({ onBack }) => {
  const { accesibilidad, updateAccesibilidad, resetearConfig } = useConfiguracion();

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate([50]);
  };

  // ✅ CLAVE: Manejador de comandos de voz
  const handleVoiceCommand = (command) => {
    const cmd = command.toLowerCase();

    // Tamaño de fuente
    if (cmd.includes('fuente grande')) {
      updateAccesibilidad('tamanoFuente', 'large');
      speak('Tamaño de fuente grande activado');
      vibrate();
    }
    // Alto contraste
    else if (cmd.includes('alto contraste')) {
      updateAccesibilidad('temaContraste', 'alto-contraste');
      speak('Tema de alto contraste activado');
      vibrate();
    }
    // Idioma
    else if (cmd.includes('idioma español')) {
      updateAccesibilidad('idioma', 'es');
      speak('Idioma español activado');
      vibrate();
    }
    // ... más comandos
  };

  const { isListening, toggleListening } = useVoiceCommands(handleVoiceCommand);

  // Anuncio inicial
  useEffect(() => {
    speak('Configuración de accesibilidad. Tamaño de fuente, tema, idioma y voz');
  }, []);

  return (
    <div className="mobile-container">
      <Header title="Accesibilidad" onBack={onBack} />

      {/* Anuncio de comandos disponibles */}
      <div className="voice-announcement">
        <div className="voice-announcement-icon">
          <span className="material-icons-round">record_voice_over</span>
        </div>
        <div className="voice-announcement-text">
          <h3>Comandos disponibles:</h3>
          <p>"Fuente grande", "Alto contraste", "Idioma español", "Voz rápida"</p>
        </div>
      </div>

      <div className="view-content">
        {/* Tamaño de Fuente */}
        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="config-header">
            <div className="config-icon">
              <span className="material-icons-round">format_size</span>
            </div>
            <h3 className="config-title">Tamaño de Fuente</h3>
          </div>

          {['small', 'medium', 'large', 'extra-large'].map((size) => (
            <div
              key={size}
              className="config-option"
              onClick={() => {
                updateAccesibilidad('tamanoFuente', size);
                speak(`Tamaño ${size}`);
                vibrate();
              }}
              style={{
                border: accesibilidad.tamanoFuente === size ? '2px solid #7C3AED' : 'none'
              }}
            >
              <span className="config-option-label">{size}</span>
              {accesibilidad.tamanoFuente === size && (
                <span className="material-icons-round" style={{ color: '#7C3AED' }}>
                  check_circle
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* ... más configuraciones ... */}
      </div>

      {/* Botón de voz flotante */}
      <VoiceCentralButton isListening={isListening} onToggle={toggleListening} />
    </div>
  );
};
```

**Lecciones clave:**
- ✅ **Comandos de voz**: Cada opción es controlable por voz
- ✅ **Feedback inmediato**: Cada acción → speak() + vibrate()
- ✅ **Animaciones**: Framer Motion para transiciones suaves
- ✅ **Accesibilidad**: Anuncio inicial + anuncio de comandos
- ✅ **Estado visual**: Borde resaltado en opción seleccionada

---

## Paso 6: Exportar API Pública

### `features/configuracion/index.js`

```javascript
/**
 * Feature: Configuración
 *
 * API pública del módulo de configuración.
 * Solo exportamos lo que otras capas necesitan usar.
 */

export { ConfiguracionAccesibilidad } from './views/ConfiguracionAccesibilidad';
export { ConfiguracionNavegacion } from './views/ConfiguracionNavegacion';
export { ConfiguracionPrivacidad } from './views/ConfiguracionPrivacidad';
export { useConfiguracion } from './hooks/useConfiguracion';
export { VoiceCentralButton } from './components/VoiceCentralButton';
```

**Lecciones clave:**
- ✅ **Encapsulación**: Solo exportamos lo público
- ✅ **API clara**: Fácil de importar desde otras capas
- ✅ **Documentación**: Comentarios explican propósito

---

## Paso 7: Documentación

### `features/configuracion/README.md`

Crear documentación completa:
- Descripción del feature
- Vistas disponibles
- CRUD operations
- Comandos de voz
- Ejemplos de uso
- Arquitectura FSD

---

## Paso 8: Integración con la Aplicación

### Usar el feature en una página

```javascript
// pages/home/HomePage.jsx
import { ConfiguracionAccesibilidad } from 'features/configuracion';

export const HomePage = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div>
      {currentView === 'config-accesibilidad' && (
        <ConfiguracionAccesibilidad onBack={() => setCurrentView('dashboard')} />
      )}
    </div>
  );
};
```

---

## 🎨 Estilos y Tema

### Nueva Paleta de Colores (Daltonismo-friendly)

```css
/* features/configuracion/styles.css */
:root {
  /* Primario: Púrpura */
  --primary: #7C3AED;
  --primary-dark: #5B21B6;
  --primary-light: #A78BFA;

  /* Acento: Ámbar */
  --accent: #F59E0B;
  --accent-dark: #D97706;
  --accent-light: #FCD34D;

  /* Grises */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-800: #1F2937;
  --gray-900: #111827;
}
```

**Por qué estos colores:**
- ✅ **Púrpura + Ámbar**: Alto contraste para daltonismo
- ✅ **WCAG AAA**: Cumple estándares de accesibilidad
- ✅ **Distintivos**: Fáciles de diferenciar con cualquier tipo de daltonismo

---

## 🧪 Testing (Futuro)

### Ejemplo de test para el hook

```javascript
// features/configuracion/hooks/__tests__/useConfiguracion.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useConfiguracion } from '../useConfiguracion';

describe('useConfiguracion', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useConfiguracion());

    expect(result.current.accesibilidad.tamanoFuente).toBe('medium');
    expect(result.current.accesibilidad.idioma).toBe('es');
  });

  it('should update accesibilidad and persist to localStorage', () => {
    const { result } = renderHook(() => useConfiguracion());

    act(() => {
      result.current.updateAccesibilidad('tamanoFuente', 'large');
    });

    expect(result.current.accesibilidad.tamanoFuente).toBe('large');
    expect(localStorage.getItem('config_accesibilidad')).toContain('"tamanoFuente":"large"');
  });
});
```

---

## 📊 Métricas de Éxito

### Indicadores de que el feature está bien implementado:

1. ✅ **Funcionalmente completo**: Todas las configuraciones funcionan
2. ✅ **100% controlable por voz**: Cada opción tiene comando de voz
3. ✅ **Persistente**: Configuraciones se guardan y cargan correctamente
4. ✅ **Accesible**: Feedback multimodal (visual, auditivo, háptico)
5. ✅ **Documentado**: README completo con ejemplos
6. ✅ **Encapsulado**: API pública clara, internos privados
7. ✅ **Siguiendo FSD**: Respeta reglas de importación

---

## 🎓 Lecciones Aprendidas

### Do's ✅

1. **Planificar antes de codear**: Analizar requisitos → estructura → implementación
2. **Documentar desde el inicio**: README facilita onboarding de otros
3. **Feedback multimodal**: Voz + vibración + visual = mejor UX
4. **Persistencia automática**: Guardar en cada update, no al cerrar
5. **Comandos de voz naturales**: "fuente grande" mejor que "set-font-large"
6. **Exportar API clara**: index.js con solo lo público
7. **Estilos locales**: CSS del feature vive con el feature

### Don'ts ❌

1. **No mezclar capas**: Features no importan de widgets/pages
2. **No hardcodear strings**: Usar constantes para valores repetidos
3. **No olvidar accesibilidad**: aria-labels, anuncios de voz, contraste
4. **No ignorar errores**: Validar datos antes de guardar
5. **No abusar de dependencies en useEffect**: Solo lo necesario
6. **No acoplar a backend**: Preparar para API futura

---

## 🚀 Próximos Pasos

### Roadmap para Configuración

1. **Corto plazo (esta semana)**:
   - [ ] Testing con Jest + React Testing Library
   - [ ] Validaciones de datos (min/max valores)
   - [ ] Manejo de errores en localStorage

2. **Mediano plazo (próximo sprint)**:
   - [ ] Conectar a API backend
   - [ ] Sincronización entre dispositivos
   - [ ] Exportar/importar configuraciones

3. **Largo plazo**:
   - [ ] Perfiles de configuración (casa, trabajo, calle)
   - [ ] Configuración por contexto (auto-ajuste según ubicación)
   - [ ] Analytics de uso de configuraciones

---

## 📚 Recursos Adicionales

- **FSD Oficial**: https://feature-sliced.design
- **Documentación React**: https://react.dev
- **Framer Motion**: https://www.framer.com/motion/
- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **Vibration API**: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API

---

## 🎤 Para la Presentación del Lunes

### Guión de 5 minutos

**Minuto 1: Introducción**
> "Hoy presento el módulo de Configuración implementado con Feature-Sliced Design, una arquitectura avanzada para proyectos frontend modernos."

**Minuto 2: Demostración en vivo**
> [Abrir la app, demostrar comandos de voz]
> "Todo es controlable por voz. Por ejemplo: 'fuente grande', 'alto contraste', 'voz rápida'."

**Minuto 3: Arquitectura**
> [Mostrar estructura de carpetas]
> "FSD organiza por funcionalidad, no por tipo de archivo. Todo relacionado a configuración vive en features/configuracion/."

**Minuto 4: Código clave**
> [Mostrar useConfiguracion hook]
> "El hook centraliza el estado y persistencia. Cada update automáticamente guarda en localStorage."

**Minuto 5: Valor agregado**
> "Esta arquitectura permite trabajo en paralelo sin conflictos. Cada miembro del equipo trabaja en su feature independientemente."

---

**Última actualización**: 26 de Diciembre, 2024
**Autor**: Josselyn Pamela Moposita Pilataxi (N°5)
**Módulo**: `features/configuracion/`
