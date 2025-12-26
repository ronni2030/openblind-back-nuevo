# 📐 Módulo de Configuración - OpenBlind

## 🏗️ Arquitectura: Feature-Based (Módulos Funcionales)

### ¿Qué es Feature-Based Architecture?

Es una arquitectura **avanzada** que organiza el código por **funcionalidades completas** en lugar de por tipo de archivo (components, hooks, etc.). Cada feature es **autónomo** y contiene todo lo necesario para funcionar.

### ¿Por qué es mejor que Hexagonal/Clean/Microservicios?

| Arquitectura | Problema | Feature-Based |
|--------------|----------|---------------|
| Hexagonal | Demasiadas capas de abstracción | ✅ Directo y práctico |
| Microservicios | Backend only, sobrecompleja | ✅ Perfecto para frontend |
| CQRS/Event Sourcing | Overkill para CRUDs | ✅ Ideal para formularios |
| Clean Architecture | Mucha teoría, poca práctica | ✅ Código real, trabajable |

---

## 📁 Estructura del Módulo

```
features/configuracion/
├── views/                    ← Vistas (páginas completas)
│   ├── ConfiguracionAccesibilidad.jsx
│   ├── ConfiguracionNavegacion.jsx
│   └── ConfiguracionPrivacidad.jsx
├── components/               ← Componentes reutilizables del módulo
│   └── VoiceCentralButton.jsx
├── hooks/                    ← Hooks específicos del módulo
│   └── useConfiguracion.js
├── utils/                    ← Utilidades del módulo (vacío por ahora)
├── styles.css               ← Estilos del módulo
├── index.js                 ← Punto de entrada
└── README.md                ← Esta documentación
```

---

## 🎯 Funcionalidades Implementadas

### 1️⃣ Vista: Configuración de Accesibilidad

**Archivo:** `views/ConfiguracionAccesibilidad.jsx`

#### CRUD Implementado:
- **Create**: Crear preferencias al registrarse (localStorage)
- **Read**: Ver configuración actual
- **Update**: Ajustar valores (tamaño fuente, tema, idioma, voz, vibración, detalle)
- **Delete**: Resetear a valores por defecto

#### Comandos de Voz:
```
"Fuente grande"
"Alto contraste"
"Idioma español"
"Voz rápida"
"Vibración sí"
"Detalle completo"
"Resetear"
```

#### Configuraciones:
- Tamaño de fuente: `small | medium | large | extra-large`
- Tema contraste: `normal | alto-contraste`
- Idioma: `es | en`
- Velocidad voz: `0.5 - 2.0`
- Volumen voz: `0 - 100`
- Feedback háptico: `true | false`
- Nivel detalle: `basico | completo | experto`

---

### 2️⃣ Vista: Configuración de Navegación

**Archivo:** `views/ConfiguracionNavegacion.jsx`

#### CRUD Implementado:
- **Create**: Crear preferencias de navegación
- **Read**: Ver configuración actual
- **Update**: Ajustar longitud máxima, paradas seguras, frecuencia
- **Delete**: Resetear a valores por defecto

#### Comandos de Voz:
```
"10 kilómetros"
"Parada segura sí"
"Frecuencia alta"
"Por tiempo"
"Alerta desvío sí"
```

#### Configuraciones:
- Longitud máxima: `1 - 50 km`
- Paradas seguras: `true | false`
- Frecuencia instrucciones: `baja | media | alta`
- Tipo instrucción: `distancia | tiempo`
- Alertas desvío: `true | false`
- Alertas obstáculo: `true | false`

---

### 3️⃣ Vista: Configuración de Privacidad

**Archivo:** `views/ConfiguracionPrivacidad.jsx`

#### CRUD Implementado:
- **Create**: Crear política de privacidad
- **Read**: Ver configuración actual
- **Update**: Ajustar retención, tracking, compartir
- **Delete**: Resetear a valores por defecto

#### Comandos de Voz:
```
"7 días"
"Tracking sí"
"Compartir ubicación no"
"Historial sí"
"Anónimo no"
```

#### Configuraciones:
- Retención ubicación: `7 | 14 | 30 | 90 días`
- Tracking background: `true | false`
- Compartir ubicación: `true | false`
- Guardar historial: `true | false`
- Modo anónimo: `true | false`

---

## 🎤 Sistema de Comandos de Voz 100%

### Componente Central: VoiceCentralButton

**Archivo:** `components/VoiceCentralButton.jsx`

Botón flotante que:
- ✅ Escucha comandos de voz continuamente
- ✅ Muestra animación de "pulse" cuando está escuchando
- ✅ Vibra al activarse (feedback háptico)
- ✅ Responde con síntesis de voz

### Hook: useConfiguracion

**Archivo:** `hooks/useConfiguracion.js`

Gestiona TODO el estado de configuración:
- 3 objetos de estado: `accesibilidad`, `navegacion`, `privacidad`
- Persistencia automática en `localStorage`
- Funciones de actualización: `updateAccesibilidad()`, `updateNavegacion()`, `updatePrivacidad()`
- Función de reseteo: `resetearConfig(tipo)`

---

## 🎨 Paleta de Colores (Daltonismo Friendly)

```css
/* Púrpuras principales */
--primary: #7C3AED;
--primary-dark: #5B21B6;
--primary-light: #A78BFA;

/* Acentos (ámbar - alto contraste) */
--accent: #F59E0B;
--accent-dark: #D97706;

/* Fondos */
--bg-light: #F5F3FF;
--bg-card: #FFFFFF;
```

---

## 🚀 Cómo Usar el Módulo

### Importar vistas:

```javascript
import { 
  ConfiguracionAccesibilidad,
  ConfiguracionNavegacion,
  ConfiguracionPrivacidad
} from './features/configuracion';
```

### Usar en App.jsx:

```javascript
{currentView === 'config-accesibilidad' && (
  <ConfiguracionAccesibilidad onBack={() => setCurrentView('dashboard')} />
)}

{currentView === 'config-navegacion' && (
  <ConfiguracionNavegacion onBack={() => setCurrentView('dashboard')} />
)}

{currentView === 'config-privacidad' && (
  <ConfiguracionPrivacidad onBack={() => setCurrentView('dashboard')} />
)}
```

---

## 📊 Ventajas de Feature-Based Architecture

### 1️⃣ Escalabilidad
Cada integrante puede trabajar en su feature sin conflictos:
- Josselyn → `features/configuracion/`
- Otro compañero → `features/ubicacion/`
- Otro → `features/rutas/`

### 2️⃣ Mantenibilidad
Todo relacionado a configuración está en UN solo lugar.

### 3️⃣ Testeable
Cada feature se puede testear independientemente.

### 4️⃣ Reutilizable
El módulo entero se puede copiar a otro proyecto.

---

## 📝 Para la Presentación del Lunes

### Explicar:

1. **"Elegimos Feature-Based Architecture porque..."**
   - Es avanzada pero práctica
   - Permite trabajo paralelo del equipo
   - Cada módulo es autónomo
   - No requiere backend complejo

2. **"El módulo de configuración tiene 3 vistas completas..."**
   - Accesibilidad
   - Navegación
   - Privacidad

3. **"Implementamos CRUD completo en cada vista..."**
   - Create: Crear configuraciones
   - Read: Leer valores actuales
   - Update: Actualizar opciones
   - Delete: Resetear a defaults

4. **"100% manejable por voz..."**
   - Comandos naturales en español
   - Feedback háptico (vibración)
   - Síntesis de voz
   - Botón central flotante

---

## 🎯 Código Clave para Mostrar

### Línea 15-18: Hook de configuración
```javascript
const { accesibilidad, updateAccesibilidad, resetearConfig } = useConfiguracion();
```

### Línea 22-65: Comandos de voz
```javascript
const handleVoiceCommand = (command) => {
  if (cmd.includes('fuente grande')) {
    updateAccesibilidad('tamanoFuente', 'large');
    speak('Tamaño de fuente grande activado');
    vibrate();
  }
  // ... más comandos
};
```

### Línea 149-167: Persistencia en localStorage
```javascript
useEffect(() => {
  const saved = localStorage.getItem('config_accesibilidad');
  if (saved) setAccesibilidad(JSON.parse(saved));
}, []);
```

---

## ✅ Checklist de Entrega

- [x] 3 vistas funcionales
- [x] CRUD completo en cada vista
- [x] Comandos de voz 100%
- [x] Feedback háptico (vibración)
- [x] Persistencia localStorage
- [x] Paleta daltonismo-friendly
- [x] Animaciones Framer Motion
- [x] Estructura Feature-Based
- [x] Código documentado
- [x] README completo

---

**Autor:** Josselyn Pamela Moposita Pilataxi (N°5)  
**Fecha:** Diciembre 2024  
**Arquitectura:** Feature-Based (Módulos Funcionales)  
**Herramienta:** React 19 + Vite 7
