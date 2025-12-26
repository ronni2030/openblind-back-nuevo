# 🏗️ Arquitectura Feature-Sliced Design (FSD)

## 📋 Índice

1. [¿Qué es Feature-Sliced Design?](#qué-es-feature-sliced-design)
2. [¿Por qué FSD para OpenBlind?](#por-qué-fsd-para-openblind)
3. [Estructura de Capas](#estructura-de-capas)
4. [Ejemplo Práctico: Módulo Configuración](#ejemplo-práctico-módulo-configuración)
5. [Reglas de Importación](#reglas-de-importación)
6. [Ventajas vs Otras Arquitecturas](#ventajas-vs-otras-arquitecturas)

---

## ¿Qué es Feature-Sliced Design?

Feature-Sliced Design (FSD) es una metodología de arquitectura frontend que organiza el código por **capas** y **features** en lugar de por tipo de archivo. Fue creada para proyectos React/Vue/Angular modernos y es especialmente útil para equipos grandes.

### Principios Fundamentales

1. **Separación por Capas**: El código se organiza en capas con responsabilidades claras
2. **Bajo Acoplamiento**: Cada capa solo puede importar de capas inferiores
3. **Alta Cohesión**: Código relacionado vive junto (feature, no por tipo)
4. **Escalabilidad**: Equipos pueden trabajar en paralelo sin conflictos

---

## ¿Por qué FSD para OpenBlind?

Elegimos Feature-Sliced Design sobre otras arquitecturas por:

### ✅ Ventajas Clave

| Aspecto | Hexagonal | Microservices | CQRS | **FSD** ✨ |
|---------|-----------|---------------|------|---------|
| **Curva de aprendizaje** | Alta | Muy Alta | Alta | Media |
| **Trabajo en equipo** | Media | Alta | Media | **Muy Alta** 🎯 |
| **Modularidad** | Alta | Muy Alta | Media | **Alta** |
| **Frontend-first** | No | No | No | **Sí** ✅ |
| **Escalabilidad** | Alta | Muy Alta | Alta | **Alta** |
| **Over-engineering** | Riesgo medio | Riesgo alto | Riesgo alto | **Bajo** ✅ |

### 🎯 Razones Específicas para OpenBlind

1. **Trabajo en Paralelo**: 5 estudiantes pueden trabajar en módulos diferentes sin conflictos
   - Josselyn → `features/configuracion/`
   - Estudiante 2 → `features/navegacion/`
   - Estudiante 3 → `features/lugares/`
   - Etc.

2. **Accesibilidad Prioritaria**:
   - Widgets reutilizables (`voice-mic-panel`) para comandos de voz en toda la app
   - Entidades de accesibilidad compartidas (`entities/voice-session`)

3. **Facilidad de Testing**:
   - Cada feature es autónoma y testeable independientemente
   - No necesitas levantar toda la aplicación para probar un módulo

4. **Escalabilidad sin Complejidad**:
   - No necesitamos la complejidad de microservicios
   - Evitamos el over-engineering de hexagonal completo en frontend
   - Mantenemos simplicidad de desarrollo pero con estructura profesional

---

## Estructura de Capas

### 📂 Árbol de Capas FSD

```
src/
├── app/                    # 🔴 Capa 1: Inicialización de la aplicación
│   ├── entrypoint/         # Punto de entrada (App.jsx)
│   ├── providers/          # Context Providers (Redux, React Query)
│   ├── routes/             # Configuración de rutas principales
│   ├── store/              # Estado global (Redux/Zustand)
│   ├── styles/             # Estilos globales
│   └── analytics/          # Google Analytics, Sentry, etc.
│
├── processes/              # 🟠 Capa 2: Flujos complejos (opcional/deprecated)
│   └── (vacío - FSD v2 recomienda no usarlo)
│
├── pages/                  # 🟡 Capa 3: Páginas de la aplicación
│   ├── auth/               # Página de login/registro
│   ├── home/               # Dashboard principal
│   ├── profile/            # Perfil de usuario
│   └── voice/              # Configuración de comandos de voz
│
├── widgets/                # 🟢 Capa 4: Componentes complejos
│   ├── voice-mic-panel/    # Panel central de control de voz
│   │   ├── model/          # Estado del widget
│   │   ├── api/            # Llamadas API específicas
│   │   ├── ui/             # Componentes UI del widget
│   │   └── lib/            # Lógica de negocio
│   └── app-header/         # Cabecera con navegación
│       ├── model/
│       ├── api/
│       ├── ui/
│       └── lib/
│
├── features/               # 🔵 Capa 5: Funcionalidades de usuario
│   ├── configuracion/      # ⭐ Módulo de Configuración (Josselyn)
│   │   ├── views/          # Vistas React
│   │   ├── components/     # Componentes específicos
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Utilidades del feature
│   ├── login/              # Feature de autenticación
│   └── voice-commands/     # Feature de comandos de voz
│
├── entities/               # 🟣 Capa 6: Entidades de negocio
│   ├── user/               # Entidad Usuario
│   │   ├── model/          # Tipos, interfaces, schema
│   │   ├── api/            # CRUD de usuario
│   │   ├── ui/             # Componentes de usuario (Avatar, etc.)
│   │   └── lib/            # Validaciones, transformaciones
│   └── voice-session/      # Entidad Sesión de Voz
│       ├── model/
│       ├── api/
│       ├── ui/
│       └── lib/
│
└── shared/                 # ⚪ Capa 7: Código compartido
    ├── api/                # Cliente HTTP, interceptores
    ├── ui/                 # Componentes UI reutilizables (Button, Modal)
    ├── lib/                # Utilidades generales
    ├── config/             # Configuración de la app
    ├── routes/             # Constantes de rutas
    └── i18n/               # Internacionalización (es, en)
```

### 🔄 Reglas de Importación (Dependency Flow)

```
app → processes → pages → widgets → features → entities → shared
 ↓                                                            ↑
Solo puede importar de capas inferiores ──────────────────────┘
```

**Ejemplos válidos:**
```javascript
// ✅ CORRECTO: Feature importa de shared
import { Button } from 'shared/ui';

// ✅ CORRECTO: Page importa de widget
import { VoiceMicPanel } from 'widgets/voice-mic-panel';

// ✅ CORRECTO: Widget importa de feature y entity
import { useConfiguracion } from 'features/configuracion';
import { User } from 'entities/user';
```

**Ejemplos inválidos:**
```javascript
// ❌ INCORRECTO: Shared NO puede importar de features
import { ConfiguracionView } from 'features/configuracion'; // ¡ERROR!

// ❌ INCORRECTO: Entity NO puede importar de widgets
import { Header } from 'widgets/app-header'; // ¡ERROR!
```

---

## Ejemplo Práctico: Módulo Configuración

### 📁 Estructura del Feature

```
features/configuracion/
├── index.js                          # Exportaciones públicas
├── README.md                         # Documentación del módulo
├── styles.css                        # Estilos del módulo
├── views/                            # Vistas React
│   ├── ConfiguracionAccesibilidad.jsx  # CRUD Accesibilidad
│   ├── ConfiguracionNavegacion.jsx     # CRUD Navegación
│   └── ConfiguracionPrivacidad.jsx     # CRUD Privacidad
├── components/                       # Componentes específicos
│   └── VoiceCentralButton.jsx        # Botón central de voz
├── hooks/                            # Custom hooks
│   └── useConfiguracion.js           # Hook de estado
└── utils/                            # Utilidades
    └── (vacío por ahora)
```

### 🎯 Responsabilidades del Feature

**`features/configuracion/`** es responsable de:

1. **CRUD de Configuraciones**: Crear, leer, actualizar, resetear configuraciones
2. **Persistencia**: Guardar en `localStorage`
3. **Comandos de Voz**: 100% controlable por voz
4. **Feedback Háptico**: Vibraciones en cada acción
5. **Accesibilidad**: Tamaños de fuente, contraste, velocidad de voz

### 🔌 API Pública del Feature

```javascript
// features/configuracion/index.js
export { ConfiguracionAccesibilidad } from './views/ConfiguracionAccesibilidad';
export { ConfiguracionNavegacion } from './views/ConfiguracionNavegacion';
export { ConfiguracionPrivacidad } from './views/ConfiguracionPrivacidad';
export { useConfiguracion } from './hooks/useConfiguracion';
export { VoiceCentralButton } from './components/VoiceCentralButton';
```

### 💡 Uso desde una Page

```javascript
// pages/home/HomePage.jsx
import { ConfiguracionAccesibilidad } from 'features/configuracion';

export const HomePage = () => {
  return (
    <div>
      <ConfiguracionAccesibilidad onBack={() => navigate('/')} />
    </div>
  );
};
```

### 📊 Flujo de Datos

```
Usuario habla
    ↓
useVoiceCommands (application/hooks)
    ↓
handleVoiceCommand (ConfiguracionAccesibilidad.jsx)
    ↓
updateAccesibilidad (useConfiguracion hook)
    ↓
localStorage.setItem('config_accesibilidad', ...)
    ↓
speak('Configuración actualizada') + vibrate()
```

---

## Ventajas vs Otras Arquitecturas

### 🆚 Hexagonal (Ports & Adapters)

**Hexagonal:**
```
domain/
  ├── entities/
  ├── interfaces/
  └── useCases/
application/
  ├── services/
  └── ports/
infrastructure/
  ├── api/
  └── adapters/
```

**Problemas:**
- ❌ Over-engineering para frontend (mejor para backend)
- ❌ Difícil saber dónde poner un componente React
- ❌ No escala bien para equipos frontend grandes

**FSD:**
```
features/
  └── configuracion/  ← TODO relacionado vive aquí
      ├── views/
      ├── hooks/
      └── components/
```

**Ventajas:**
- ✅ Todo relacionado a "configuración" vive junto
- ✅ Claro dónde agregar nuevo código
- ✅ Fácil de borrar un feature completo

---

### 🆚 Microservicios (Micro-frontends)

**Microservicios:**
```
configuracion-app/  (separado, propio repo)
navegacion-app/     (separado, propio repo)
lugares-app/        (separado, propio repo)
```

**Problemas:**
- ❌ Demasiada complejidad de CI/CD
- ❌ Difícil compartir código entre apps
- ❌ Overhead de comunicación entre equipos
- ❌ No necesario para 5 estudiantes

**FSD:**
```
features/
  ├── configuracion/  ← Un estudiante
  ├── navegacion/     ← Otro estudiante
  └── lugares/        ← Otro estudiante
```

**Ventajas:**
- ✅ Simplicidad: un solo repo, un solo build
- ✅ Fácil compartir código en `shared/`
- ✅ Cada estudiante tiene su carpeta independiente

---

### 🆚 CQRS (Command Query Responsibility Segregation)

**CQRS:**
```
commands/
  └── UpdateConfiguracionCommand.js
queries/
  └── GetConfiguracionQuery.js
handlers/
  └── ConfiguracionHandler.js
```

**Problemas:**
- ❌ Over-engineering para UI simple
- ❌ Demasiada abstracción para frontend
- ❌ Mejor para sistemas distribuidos complejos

**FSD:**
```
features/configuracion/
  └── hooks/
      └── useConfiguracion.js  ← CRUD simple y directo
```

**Ventajas:**
- ✅ Pragmático: solo la complejidad necesaria
- ✅ Código legible y mantenible
- ✅ No requiere deep understanding de patrones complejos

---

## 📚 Referencias

- **FSD Oficial**: https://feature-sliced.design
- **Documentación en Español**: https://feature-sliced.design/es
- **GitHub Examples**: https://github.com/feature-sliced/examples

---

## 🎓 Para la Defensa (Defense Talking Points)

### ¿Por qué Feature-Sliced Design?

> "Elegimos FSD porque combina lo mejor de arquitecturas avanzadas (modularidad, escalabilidad) con pragmatismo para equipos frontend. A diferencia de hexagonal (over-engineering) o microservicios (demasiada complejidad), FSD nos permite trabajar en paralelo como equipo sin sacrificar mantenibilidad."

### ¿Cómo se diferencia de la estructura típica de React?

> "Una app React típica organiza por tipo de archivo (components/, pages/, hooks/). FSD organiza por funcionalidad (features/configuracion/ contiene TODO: vistas, hooks, componentes, estilos). Esto hace que sea trivial agregar o eliminar funcionalidades completas."

### ¿Cómo escala FSD?

> "Cada feature es autónomo. Si mañana queremos agregar 'features/reportes/', simplemente creamos la carpeta y trabajamos sin afectar código existente. Las reglas de importación (solo de capas inferiores) previenen dependencias circulares."

### ¿Por qué no microservicios?

> "Microservicios en frontend (micro-frontends) son excelentes para empresas con 50+ desarrolladores y múltiples equipos. Para 5 estudiantes, sería como usar un cañón para matar una mosca. FSD nos da 80% de los beneficios con 20% de la complejidad."

---

**Última actualización**: 26 de Diciembre, 2024
**Estudiante responsable**: Josselyn Pamela Moposita Pilataxi (N°5)
**Módulo implementado**: `features/configuracion/`
