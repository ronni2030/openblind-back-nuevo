# 🔧 EXPLICACIÓN TÉCNICA DEL CÓDIGO

**Para:** Explicar a profundidad cómo funciona cada parte del código
**Audiencia:** Profesores, evaluadores técnicos, desarrolladores

---

## 📋 ÍNDICE

1. [Estructura Completa del Proyecto](#1-estructura-completa-del-proyecto)
2. [Cómo se Acoplan las Capas FSD](#2-cómo-se-acoplan-las-capas-fsd)
3. [Flujo de Datos Completo](#3-flujo-de-datos-completo)
4. [Explicación Línea por Línea del Código Clave](#4-explicación-línea-por-línea-del-código-clave)
5. [Decisiones Técnicas y Por Qué](#5-decisiones-técnicas-y-por-qué)

---

## 1. ESTRUCTURA COMPLETA DEL PROYECTO

### 1.1 Visión General

```
estructura-hexagonal/
├── backend-openblind/          # Backend Node.js + MySQL (no modificado)
└── frontend-openblind/         # Frontend React + Capacitor ⭐
    ├── android/                # Proyecto Android (generado por Capacitor)
    ├── src/                    # Código fuente ⭐⭐⭐
    ├── dist/                   # Build compilado (npm run build)
    ├── node_modules/           # Dependencias
    ├── package.json            # Dependencias y scripts
    ├── capacitor.config.ts     # Configuración de Capacitor
    ├── vite.config.ts          # Configuración de Vite
    └── *.md                    # Documentación ⭐
```

### 1.2 Estructura de `src/` (Feature-Sliced Design)

```
src/
├── 🔴 app/                     # CAPA 1: Inicialización
│   ├── entrypoint/             # App.jsx principal
│   ├── providers/              # Context Providers (Redux, etc.)
│   ├── routes/                 # React Router configuración
│   ├── store/                  # Estado global
│   ├── styles/                 # CSS global
│   ├── analytics/              # Google Analytics
│   ├── index.js                # Exportaciones
│   └── README.md
│
├── 🟠 processes/               # CAPA 2: Flujos complejos (vacío - deprecated)
│   ├── index.js
│   └── (vacío)
│
├── 🟡 pages/                   # CAPA 3: Páginas completas
│   ├── auth/                   # Página de login/registro
│   ├── home/                   # Dashboard principal
│   ├── profile/                # Perfil de usuario
│   ├── voice/                  # Configuración de voz
│   └── index.js
│
├── 🟢 widgets/                 # CAPA 4: Componentes complejos
│   ├── voice-mic-panel/        # ⭐ Widget del botón de voz
│   │   ├── ui/
│   │   │   └── VoiceCentralButton.jsx  # Botón flotante
│   │   ├── model/              # Estado del widget (vacío por ahora)
│   │   ├── api/                # Llamadas API (vacío)
│   │   ├── lib/                # Lógica (vacío)
│   │   ├── index.js            # Exporta VoiceCentralButton
│   │   └── README.md
│   └── app-header/             # Header de la app (vacío)
│
├── 🔵 features/                # CAPA 5: Funcionalidades ⭐⭐⭐
│   ├── configuracion/          # ⭐⭐⭐ MÓDULO IMPLEMENTADO
│   │   ├── views/              # 3 vistas React
│   │   │   ├── ConfiguracionAccesibilidad.jsx  (393 líneas)
│   │   │   ├── ConfiguracionNavegacion.jsx     (351 líneas)
│   │   │   └── ConfiguracionPrivacidad.jsx     (359 líneas)
│   │   ├── components/         # Componentes específicos
│   │   │   └── VoiceCentralButton.jsx  (copia legacy)
│   │   ├── hooks/              # Custom hooks
│   │   │   └── useConfiguracion.js     (128 líneas)
│   │   ├── utils/              # Utilidades (vacío)
│   │   ├── index.js            # API pública
│   │   ├── styles.css          # Estilos (342 líneas)
│   │   └── README.md           # Documentación (297 líneas)
│   ├── login/                  # Feature de login (vacío)
│   └── voice-commands/         # Feature de comandos de voz (vacío)
│
├── 🟣 entities/                # CAPA 6: Entidades de negocio
│   ├── user/                   # Entidad Usuario
│   │   ├── model/              # Tipos y schemas (vacío)
│   │   ├── api/                # CRUD de usuario (vacío)
│   │   ├── ui/                 # Avatar, UserCard (vacío)
│   │   └── lib/                # Validaciones (vacío)
│   ├── voice-session/          # Entidad Sesión de Voz
│   │   ├── model/
│   │   ├── api/
│   │   ├── ui/
│   │   └── lib/
│   └── index.js
│
├── ⚪ shared/                  # CAPA 7: Código compartido
│   ├── api/                    # Cliente HTTP (vacío)
│   ├── ui/                     # Button, Modal, Input (vacío)
│   ├── lib/                    # Utilidades generales (vacío)
│   ├── config/                 # Constantes (vacío)
│   ├── routes/                 # Rutas (vacío)
│   ├── i18n/                   # Traducciones (vacío)
│   ├── index.js
│   └── README.md
│
├── 📁 application/             # ⚠️ Legacy (arquitectura anterior)
│   ├── hooks/
│   │   └── useVoiceCommands.js # Hook de reconocimiento de voz
│   ├── services/
│   └── utils/
│       └── speechUtils.js      # Síntesis de voz (TTS)
│
├── 📁 presentation/            # ⚠️ Legacy (arquitectura anterior)
│   ├── components/
│   │   └── Header.jsx          # Componente de header
│   ├── views/
│   │   ├── Dashboard.jsx
│   │   ├── LugaresView.jsx
│   │   └── ContactosView.jsx
│   └── styles/
│
├── 📁 domain/                  # ⚠️ Legacy (arquitectura hexagonal anterior)
├── 📁 infrastructure/          # ⚠️ Legacy (arquitectura hexagonal anterior)
│
├── App.jsx                     # Componente raíz (71 líneas)
├── main.jsx                    # Punto de entrada React
└── index.css                   # Estilos globales
```

**Nota sobre Legacy:**
> Las carpetas `application/`, `presentation/`, `domain/`, `infrastructure/` son de la arquitectura anterior (hexagonal). Se mantienen para no romper código existente (Dashboard, LugaresView, ContactosView). El nuevo código (Configuración) usa FSD.

---

## 2. CÓMO SE ACOPLAN LAS CAPAS FSD

### 2.1 Regla Fundamental de Importación

**Una capa solo puede importar de capas INFERIORES:**

```
Capa 1: app
   ↓ puede importar de ↓
Capa 2: processes
   ↓ puede importar de ↓
Capa 3: pages
   ↓ puede importar de ↓
Capa 4: widgets
   ↓ puede importar de ↓
Capa 5: features
   ↓ puede importar de ↓
Capa 6: entities
   ↓ puede importar de ↓
Capa 7: shared
   (no puede importar de nadie)
```

### 2.2 Ejemplo de Acoplamiento: Módulo Configuración

**Archivo:** `features/configuracion/views/ConfiguracionAccesibilidad.jsx`

```javascript
// ✅ CORRECTO: Feature importa de shared (capa inferior)
// (Nota: Actualmente no hay nada en shared, pero podría)
// import { Button } from 'shared/ui';

// ✅ CORRECTO: Feature importa de legacy application
import useVoiceCommands from '../../../application/hooks/useVoiceCommands';
import { speak } from '../../../application/utils/speechUtils';

// ✅ CORRECTO: Feature importa de sí mismo
import { useConfiguracion } from '../hooks/useConfiguracion';
import { VoiceCentralButton } from '../components/VoiceCentralButton';
import '../styles.css';

// ✅ CORRECTO: Feature importa de legacy presentation
import { Header } from '../../../presentation/components/Header';

// ✅ CORRECTO: Feature importa de librería externa
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
```

**Lo que NO puede hacer un feature:**

```javascript
// ❌ INCORRECTO: Feature NO puede importar de widgets (capa superior)
import { AppHeader } from 'widgets/app-header';

// ❌ INCORRECTO: Feature NO puede importar de pages (capa superior)
import { HomePage } from 'pages/home';

// ❌ INCORRECTO: Feature NO puede importar de app (capa superior)
import { store } from 'app/store';
```

### 2.3 Acoplamiento de Widget con Feature

**Archivo:** `widgets/voice-mic-panel/ui/VoiceCentralButton.jsx`

```javascript
// ✅ CORRECTO: Widget importa de legacy application (similar a shared)
import { speak } from '../../../application/utils/speechUtils';

// ✅ CORRECTO: Widget importa de librería externa
import React from 'react';

// ✅ Widget NO importa de features (está en capa superior)
```

**El widget es "tonto":**
- Recibe props (`isListening`, `onToggle`)
- No tiene lógica de negocio
- Solo UI y feedback (vibración, voz)

**El feature es "inteligente":**
- Usa el widget
- Maneja la lógica (qué hacer con comandos de voz)
- Maneja el estado (useConfiguracion)

### 2.4 Diagrama de Flujo de Dependencias

```
┌─────────────────────────────────────────────────┐
│  Usuario interactúa con la app                  │
└──────────────────┬──────────────────────────────┘
                   ↓
┌──────────────────────────────────────────────────┐
│  ConfiguracionAccesibilidad.jsx (feature)        │
│  - Renderiza UI                                  │
│  - Maneja comandos de voz                        │
└───┬────────────────────────┬─────────────────────┘
    ↓                        ↓
┌───────────────────┐  ┌────────────────────────┐
│ useConfiguracion  │  │ VoiceCentralButton     │
│ (hook propio)     │  │ (widget)               │
│                   │  │                        │
│ - Estado          │  │ - UI del botón         │
│ - localStorage    │  │ - Vibración            │
└───────────────────┘  └────────┬───────────────┘
                                ↓
                    ┌───────────────────────┐
                    │ useVoiceCommands      │
                    │ (application/hooks)   │
                    │                       │
                    │ - Web Speech API      │
                    │ - Reconocimiento      │
                    └───────┬───────────────┘
                            ↓
                    ┌───────────────────┐
                    │ speechUtils       │
                    │ (application/utils)│
                    │                   │
                    │ - Síntesis de voz │
                    └───────────────────┘
```

---

## 3. FLUJO DE DATOS COMPLETO

### 3.1 Flujo: Usuario dice "Fuente grande"

**Paso a paso:**

```
1. USUARIO habla: "Fuente grande"
      ↓
2. useVoiceCommands escucha (Web Speech API)
      ↓
3. Web Speech API convierte voz → texto: "fuente grande"
      ↓
4. useVoiceCommands llama: handleVoiceCommand("fuente grande")
      ↓
5. handleVoiceCommand detecta: cmd.includes('fuente grande')
      ↓
6. handleVoiceCommand ejecuta 3 acciones en paralelo:
   ├─> updateAccesibilidad('tamanoFuente', 'large')
   ├─> speak('Tamaño de fuente grande activado')
   └─> vibrate([50])
      ↓
7. updateAccesibilidad hace 2 cosas:
   ├─> setAccesibilidad({ ...accesibilidad, tamanoFuente: 'large' })
   └─> localStorage.setItem('config_accesibilidad', JSON.stringify(...))
      ↓
8. React re-renderiza el componente con nuevo estado
      ↓
9. USUARIO ve cambio en pantalla + escucha confirmación + siente vibración
```

### 3.2 Flujo: Persistencia entre sesiones

**Sesión 1: Usuario configura**

```
1. Usuario abre app por primera vez
      ↓
2. useConfiguracion se monta
      ↓
3. useEffect(() => {...}, []) se ejecuta
      ↓
4. localStorage.getItem('config_accesibilidad') → null (primera vez)
      ↓
5. Se usa estado por defecto: { tamanoFuente: 'medium', ... }
      ↓
6. Usuario dice "fuente grande"
      ↓
7. updateAccesibilidad guarda en localStorage
      ↓
8. localStorage ahora tiene: {"tamanoFuente":"large",...}
      ↓
9. Usuario cierra app
```

**Sesión 2: Usuario vuelve a abrir app**

```
1. Usuario abre app nuevamente
      ↓
2. useConfiguracion se monta
      ↓
3. useEffect(() => {...}, []) se ejecuta
      ↓
4. localStorage.getItem('config_accesibilidad') → '{"tamanoFuente":"large",...}'
      ↓
5. JSON.parse(...) convierte string → objeto
      ↓
6. setAccesibilidad({ tamanoFuente: 'large', ... })
      ↓
7. Usuario ve su configuración anterior ✅
```

### 3.3 Flujo: Interacción entre componentes

```
App.jsx (raíz)
  │
  └─> ConfiguracionAccesibilidad
        │
        ├─> Header (de legacy presentation)
        │     └─> Muestra título "Accesibilidad"
        │
        ├─> useConfiguracion (hook propio)
        │     ├─> useState para estado
        │     ├─> useEffect para cargar localStorage
        │     └─> updateAccesibilidad para actualizar
        │
        ├─> useVoiceCommands (de legacy application)
        │     ├─> Web Speech API
        │     └─> Callback: handleVoiceCommand
        │
        ├─> Render de opciones (map sobre arrays)
        │     └─> <div onClick={...}> por cada opción
        │
        └─> VoiceCentralButton (widget)
              ├─> Recibe: isListening, onToggle
              ├─> Renderiza botón flotante
              └─> onClick → vibrate() + speak() + onToggle()
```

---

## 4. EXPLICACIÓN LÍNEA POR LÍNEA DEL CÓDIGO CLAVE

### 4.1 `useConfiguracion.js` - Custom Hook

```javascript
import { useState, useEffect } from 'react';

export const useConfiguracion = () => {
  // ═══════════════════════════════════════════════════
  // SECCIÓN 1: ESTADO INICIAL
  // ═══════════════════════════════════════════════════

  const [accesibilidad, setAccesibilidad] = useState({
    tamanoFuente: 'medium',      // 'small' | 'medium' | 'large' | 'extra-large'
    temaContraste: 'normal',      // 'normal' | 'alto-contraste'
    idioma: 'es',                 // 'es' | 'en'
    velocidadVoz: 1.0,            // 0.5 - 2.0
    volumenVoz: 80,               // 0 - 100
    feedbackHaptico: true,        // boolean
    nivelDetalle: 'completo'      // 'basico' | 'completo' | 'experto'
  });

  // ¿Por qué useState?
  // - Es un hook de React que permite componente funcional tener estado
  // - Cuando el estado cambia, React re-renderiza el componente
  // - El valor inicial es un objeto con todas las configuraciones por defecto

  const [navegacion, setNavegacion] = useState({
    longitudMaxima: 10,           // km (1-50)
    paradaSegura: true,           // boolean
    frecuenciaInstrucciones: 'media', // 'baja' | 'media' | 'alta'
    tipoInstruccion: 'distancia', // 'distancia' | 'tiempo'
    alertaDesvio: true,           // boolean
    alertaObstaculo: true         // boolean
  });

  const [privacidad, setPrivacidad] = useState({
    retencionUbicacion: 30,       // días (7, 14, 30, 90)
    trackingBackground: false,    // boolean
    compartirUbicacion: true,     // boolean
    guardarHistorial: true,       // boolean
    permitirAnonimo: false        // boolean
  });

  // ═══════════════════════════════════════════════════
  // SECCIÓN 2: CARGA DESDE LOCALSTORAGE (al montar)
  // ═══════════════════════════════════════════════════

  useEffect(() => {
    // useEffect(() => {...}, []) se ejecuta UNA SOLA VEZ al montar el componente
    // (el array vacío [] es la clave - sin dependencias = solo al montar)

    const savedAccesibilidad = localStorage.getItem('config_accesibilidad');
    const savedNavegacion = localStorage.getItem('config_navegacion');
    const savedPrivacidad = localStorage.getItem('config_privacidad');

    // localStorage.getItem() retorna:
    // - null si la clave no existe (primera vez)
    // - string con el valor JSON si existe

    if (savedAccesibilidad) {
      // Si existe configuración guardada, parsear JSON y actualizar estado
      setAccesibilidad(JSON.parse(savedAccesibilidad));
      // JSON.parse() convierte string → objeto JavaScript
    }

    if (savedNavegacion) {
      setNavegacion(JSON.parse(savedNavegacion));
    }

    if (savedPrivacidad) {
      setPrivacidad(JSON.parse(savedPrivacidad));
    }
  }, []); // Array vacío = solo ejecutar al montar

  // ═══════════════════════════════════════════════════
  // SECCIÓN 3: FUNCIONES DE ACTUALIZACIÓN
  // ═══════════════════════════════════════════════════

  const updateAccesibilidad = (key, value) => {
    // key: el campo a actualizar (ej: 'tamanoFuente')
    // value: el nuevo valor (ej: 'large')

    const newConfig = { ...accesibilidad, [key]: value };
    // Spread operator (...) copia todo el objeto existente
    // [key]: value actualiza solo la propiedad específica
    // Resultado: nuevo objeto con todo igual excepto 'key'

    setAccesibilidad(newConfig);
    // Actualizar el estado de React (esto causa re-render)

    localStorage.setItem('config_accesibilidad', JSON.stringify(newConfig));
    // Guardar en localStorage para persistencia
    // JSON.stringify() convierte objeto JavaScript → string JSON
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

  // ═══════════════════════════════════════════════════
  // SECCIÓN 4: FUNCIÓN DE RESET
  // ═══════════════════════════════════════════════════

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
    } else if (tipo === 'navegacion') {
      // Similar para navegacion...
    } else if (tipo === 'privacidad') {
      // Similar para privacidad...
    }
  };

  // ═══════════════════════════════════════════════════
  // SECCIÓN 5: RETORNAR API PÚBLICA
  // ═══════════════════════════════════════════════════

  return {
    // Estado actual (read-only)
    accesibilidad,
    navegacion,
    privacidad,

    // Funciones para modificar (write)
    updateAccesibilidad,
    updateNavegacion,
    updatePrivacidad,
    resetearConfig
  };

  // Cualquier componente que use este hook tendrá acceso a:
  // const { accesibilidad, updateAccesibilidad } = useConfiguracion();
};
```

**Conceptos clave:**

1. **Custom Hook:** Es una función que empieza con `use` y puede usar otros hooks
2. **useState:** Para estado local del componente
3. **useEffect:** Para efectos secundarios (cargar desde localStorage)
4. **Closure:** Las funciones update tienen acceso a las variables del scope (accesibilidad, navegacion)
5. **Inmutabilidad:** Nunca modificamos el estado directamente, siempre creamos nuevo objeto

### 4.2 `ConfiguracionAccesibilidad.jsx` - Vista Principal

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
  // ═══════════════════════════════════════════════════
  // SECCIÓN 1: HOOKS
  // ═══════════════════════════════════════════════════

  const { accesibilidad, updateAccesibilidad, resetearConfig } = useConfiguracion();
  // Destructuring: obtenemos 3 cosas del hook
  // - accesibilidad: objeto con el estado actual
  // - updateAccesibilidad: función para actualizar
  // - resetearConfig: función para resetear

  // ═══════════════════════════════════════════════════
  // SECCIÓN 2: FUNCIÓN DE VIBRACIÓN
  // ═══════════════════════════════════════════════════

  const vibrate = () => {
    if (navigator.vibrate) {
      // Verificar que el navegador soporte vibración
      // (algunos navegadores desktop no lo soportan)
      navigator.vibrate([50]);
      // Array de números: [vibrar 50ms]
      // Patrón complejo: [50, 100, 50] = vibra-pausa-vibra
    }
  };

  // ═══════════════════════════════════════════════════
  // SECCIÓN 3: MANEJADOR DE COMANDOS DE VOZ
  // ═══════════════════════════════════════════════════

  const handleVoiceCommand = (command) => {
    // Esta función se llama cada vez que useVoiceCommands detecta un comando
    // command: string con lo que el usuario dijo (ej: "fuente grande")

    const cmd = command.toLowerCase();
    // Convertir a minúsculas para que no importe si dice "Fuente Grande" o "fuente grande"

    // ─────────────────────────────────────────────────
    // DETECCIÓN DE COMANDOS: TAMAÑO DE FUENTE
    // ─────────────────────────────────────────────────

    if (cmd.includes('fuente pequeña') || cmd.includes('letra pequeña')) {
      updateAccesibilidad('tamanoFuente', 'small');
      speak('Tamaño de fuente pequeña activado');
      vibrate();
    }
    // includes() retorna true si la subcadena existe
    // Ejemplo: "pon fuente pequeña".includes('fuente pequeña') → true

    else if (cmd.includes('fuente mediana') || cmd.includes('fuente normal')) {
      updateAccesibilidad('tamanoFuente', 'medium');
      speak('Tamaño de fuente mediana activado');
      vibrate();
    }

    else if (cmd.includes('fuente grande')) {
      updateAccesibilidad('tamanoFuente', 'large');
      speak('Tamaño de fuente grande activado');
      vibrate();
    }

    // ─────────────────────────────────────────────────
    // DETECCIÓN DE COMANDOS: TEMA DE CONTRASTE
    // ─────────────────────────────────────────────────

    else if (cmd.includes('alto contraste') || cmd.includes('contraste alto')) {
      updateAccesibilidad('temaContraste', 'alto-contraste');
      speak('Tema de alto contraste activado');
      vibrate();
    }

    else if (cmd.includes('contraste normal')) {
      updateAccesibilidad('temaContraste', 'normal');
      speak('Tema normal activado');
      vibrate();
    }

    // ─────────────────────────────────────────────────
    // DETECCIÓN DE COMANDOS: IDIOMA
    // ─────────────────────────────────────────────────

    else if (cmd.includes('idioma español') || cmd.includes('español')) {
      updateAccesibilidad('idioma', 'es');
      speak('Idioma español activado');
      vibrate();
    }

    else if (cmd.includes('idioma inglés') || cmd.includes('english')) {
      updateAccesibilidad('idioma', 'en');
      speak('English language activated');
      vibrate();
    }

    // ─────────────────────────────────────────────────
    // DETECCIÓN DE COMANDOS: VELOCIDAD DE VOZ
    // ─────────────────────────────────────────────────

    else if (cmd.includes('voz lenta') || cmd.includes('hablar lento')) {
      updateAccesibilidad('velocidadVoz', 0.7);
      speak('Velocidad de voz lenta', 0.7); // Segundo parámetro: velocidad
      vibrate();
    }

    else if (cmd.includes('voz normal')) {
      updateAccesibilidad('velocidadVoz', 1.0);
      speak('Velocidad de voz normal');
      vibrate();
    }

    else if (cmd.includes('voz rápida') || cmd.includes('hablar rápido')) {
      updateAccesibilidad('velocidadVoz', 1.5);
      speak('Velocidad de voz rápida', 1.5);
      vibrate();
    }

    // ─────────────────────────────────────────────────
    // COMANDO DE RESET
    // ─────────────────────────────────────────────────

    else if (cmd.includes('resetear') || cmd.includes('restaurar')) {
      resetearConfig('accesibilidad');
      speak('Configuración restaurada a valores por defecto');
      vibrate([100, 50, 100]); // Patrón especial para reset
    }

    // ─────────────────────────────────────────────────
    // COMANDO NO RECONOCIDO
    // ─────────────────────────────────────────────────

    else {
      speak('Comando no reconocido. Intenta: fuente grande, alto contraste, voz rápida');
    }
  };

  // ═══════════════════════════════════════════════════
  // SECCIÓN 4: CONECTAR A USEEVOICECOMMANDS
  // ═══════════════════════════════════════════════════

  const { isListening, toggleListening } = useVoiceCommands(handleVoiceCommand);
  // useVoiceCommands es un hook que:
  // - Inicia Web Speech API
  // - Cuando detecta voz, llama a handleVoiceCommand(textoDetectado)
  // - Retorna:
  //   - isListening: boolean (¿está escuchando?)
  //   - toggleListening: función para activar/desactivar

  // ═══════════════════════════════════════════════════
  // SECCIÓN 5: EFECTO AL MONTAR (Anuncio inicial)
  // ═══════════════════════════════════════════════════

  useEffect(() => {
    speak('Configuración de accesibilidad. Tamaño de fuente, tema, idioma y voz');
    // Anuncia la vista cuando se monta
    // Esto ayuda a personas ciegas a saber dónde están
  }, []); // Solo al montar (array vacío)

  // ═══════════════════════════════════════════════════
  // SECCIÓN 6: RENDER (JSX)
  // ═══════════════════════════════════════════════════

  return (
    <div className="mobile-container">
      {/* Header con título y botón de volver */}
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
        {/* ─────────────────────────────────────────────── */}
        {/* TARJETA: TAMAÑO DE FUENTE */}
        {/* ─────────────────────────────────────────────── */}

        <motion.div
          className="config-card"
          initial={{ opacity: 0, y: 20 }}      // Estado inicial: invisible, 20px abajo
          animate={{ opacity: 1, y: 0 }}       // Estado final: visible, posición normal
          transition={{ delay: 0.1 }}          // Demora 0.1s antes de animar
        >
          {/* motion.div es de Framer Motion - componente animado */}

          <div className="config-header">
            <div className="config-icon">
              <span className="material-icons-round">format_size</span>
            </div>
            <h3 className="config-title">Tamaño de Fuente</h3>
          </div>

          {/* Mapear sobre array de opciones */}
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
                // Condicional: si está seleccionado, borde púrpura
                border: accesibilidad.tamanoFuente === size
                  ? '2px solid #7C3AED'
                  : 'none'
              }}
            >
              <span className="config-option-label">{size}</span>

              {/* Checkmark solo si está seleccionado */}
              {accesibilidad.tamanoFuente === size && (
                <span className="material-icons-round" style={{ color: '#7C3AED' }}>
                  check_circle
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* ... más tarjetas (Tema, Idioma, Voz) ... */}

      </div>

      {/* Botón de voz flotante */}
      <VoiceCentralButton isListening={isListening} onToggle={toggleListening} />
    </div>
  );
};
```

**Conceptos clave:**

1. **Destructuring:** `const { x, y } = objeto` extrae propiedades
2. **Callback functions:** `onClick={() => {...}}` función anónima como prop
3. **Conditional rendering:** `{condition && <Component />}` renderiza solo si true
4. **Dynamic styling:** `style={{ border: condition ? 'x' : 'y' }}`
5. **Array mapping:** `.map()` para renderizar lista de elementos
6. **Framer Motion:** Animaciones declarativas con initial/animate/transition

---

## 5. DECISIONES TÉCNICAS Y POR QUÉ

### 5.1 ¿Por qué localStorage y no Redux?

**Decisión:** Usar localStorage + useState

**Razones:**

1. **Simplicidad:** Para configuraciones simples, Redux es overkill
2. **Persistencia nativa:** localStorage persiste automáticamente
3. **Offline-first:** No depende de backend
4. **Menos boilerplate:** No necesitas actions, reducers, store
5. **Performance:** Lectura/escritura instantánea

**Cuándo usar Redux:**
- Estado compartido entre MUCHOS componentes
- Lógica compleja de estado (undo/redo, time travel)
- DevTools para debugging
- Middleware (sagas, thunks)

**Para configuraciones:** localStorage + custom hook es suficiente.

### 5.2 ¿Por qué includes() y no regex para comandos de voz?

**Decisión:** Usar `cmd.includes('fuente grande')`

**Razones:**

1. **Simplicidad:** Más fácil de leer y mantener
2. **Flexibilidad:** Funciona con "pon fuente grande", "quiero fuente grande"
3. **Lenguaje natural:** Los usuarios no hablan con sintaxis rígida
4. **Menos errores:** Regex puede ser complejo y propenso a bugs

**Ejemplo de alternativa con regex:**
```javascript
// Más complejo:
if (/fuente\s+(grande|big)/i.test(cmd)) { ... }

// Más simple (lo que usamos):
if (cmd.includes('fuente grande')) { ... }
```

**Cuándo usar regex:**
- Necesitas extraer valores (ej: "10 kilómetros" → extraer el 10)
- Necesitas validación estricta
- Patrones complejos

### 5.3 ¿Por qué Framer Motion y no CSS animations?

**Decisión:** Usar Framer Motion

**Razones:**

1. **Declarativo:** Define estado inicial/final, la librería hace el resto
2. **Variantes:** Puedes definir animaciones complejas fácilmente
3. **Gestos:** Soporte para drag, hover, tap
4. **Spring physics:** Animaciones más naturales
5. **Código limpio:** No necesitas clases CSS adicionales

**Ejemplo comparación:**

**CSS:**
```css
.config-card {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Framer Motion:**
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

**Ventaja:** Más legible, todo en JS.

### 5.4 ¿Por qué custom hook y no Context API?

**Decisión:** Usar custom hook (useConfiguracion)

**Razones:**

1. **Simplicidad:** Para estado local, hook es suficiente
2. **Reutilizable:** Cualquier componente puede usar el hook
3. **No overhead:** Context API tiene re-renders innecesarios
4. **Testing:** Hooks son más fáciles de testear

**Cuándo usar Context:**
- Estado global compartido por TODA la app
- Evitar prop drilling profundo
- Temas, idiomas, autenticación

**Para configuraciones:** Custom hook es óptimo.

### 5.5 ¿Por qué Feature-Sliced Design y no hexagonal?

**Decisión:** FSD para frontend, hexagonal para backend

**Razones:**

| Aspecto | Hexagonal | FSD |
|---------|-----------|-----|
| **Diseñado para** | Backend (domain-driven) | Frontend (feature-driven) |
| **Complejidad** | Alta (capas abstractas) | Media (pragmático) |
| **Onboarding** | Difícil (conceptos DDD) | Fácil (intuitivo) |
| **Tipo de archivos** | domain/, infrastructure/ | features/, widgets/ |

**Hexagonal es excelente para:**
- Separar lógica de negocio de infraestructura
- Testear sin dependencias externas
- Cambiar DB sin afectar dominio

**FSD es excelente para:**
- Organizar UI por funcionalidad
- Trabajo en equipo paralelo
- Escalabilidad sin complejidad

### 5.6 ¿Por qué React 19 y no React 18?

**Decisión:** Usar React 19

**Razones:**

1. **Server Components:** Mejor performance (aunque no lo usamos aún)
2. **Actions:** Manejo de forms simplificado
3. **Optimizaciones:** Mejor re-rendering
4. **use() hook:** Para async data fetching
5. **Futuro:** Estar al día con última versión

**Trade-off:** Algunas librerías pueden no ser compatibles aún.

### 5.7 ¿Por qué Capacitor y no React Native?

**Decisión:** Capacitor

**Razones:**

1. **Code reuse:** Mismo código web funciona en móvil
2. **Skills:** Si sabes React web, ya sabes Capacitor
3. **Debugging:** Puedes debuggear en Chrome DevTools
4. **Ecosystem:** Plugins de Cordova compatibles
5. **Menos vendor lock-in:** Siempre puedes volver a web

**React Native es mejor si:**
- Necesitas performance nativo (60fps animations)
- Necesitas UI nativa (Look & Feel de iOS/Android)
- App compleja (Instagram, Uber)

**OpenBlind:** Capacitor es suficiente.

---

## 📊 MÉTRICAS DEL CÓDIGO

### Líneas de código por archivo

| Archivo | Líneas | Proporción |
|---------|--------|-----------|
| ConfiguracionAccesibilidad.jsx | 393 | 35.7% |
| ConfiguracionNavegacion.jsx | 351 | 31.9% |
| ConfiguracionPrivacidad.jsx | 359 | 32.6% |
| **TOTAL VISTAS** | **1,103** | **100%** |
| | | |
| useConfiguracion.js | 128 | 100% |
| VoiceCentralButton.jsx | 37 | 100% |
| styles.css | 342 | 100% |
| | | |
| **TOTAL MÓDULO** | **1,610** | - |

### Complejidad ciclomática

**ConfiguracionAccesibilidad.jsx - handleVoiceCommand:**
- Ramas if/else: ~15
- Complejidad: Media (manejable)
- Refactor posible: Map de comandos → acciones

**useConfiguracion.js:**
- Complejidad: Baja (lógica simple)
- Funciones puras: Alta cohesión

### Performance

**Renderizado:**
- React.memo NO necesario (no re-renders innecesarios)
- useState para estado local es óptimo
- Framer Motion optimizado internamente

**localStorage:**
- Operaciones síncronas (< 1ms)
- Tamaño de datos: ~500 bytes por config
- No bloquea UI

---

**Fin de Explicación Técnica**

Esta documentación cubre TODO lo necesario para entender a profundidad cómo funciona el código, por qué se tomaron las decisiones técnicas, y cómo se acoplan las diferentes partes del sistema.

Si tienes preguntas específicas sobre cualquier parte del código, puedes buscar en esta guía o preguntar directamente.
