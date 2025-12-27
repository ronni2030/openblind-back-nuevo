# 🏗️ Estructura Feature-Sliced Design (FSD)

**Frontend Admin - OpenBlind**

Esta aplicación sigue la arquitectura **Feature-Sliced Design (FSD)** con todas las capas y subcarpetas obligatorias.

---

## 📂 Estructura de Capas

```
src/
├── app/                    # ⭐ Capa App: Punto de entrada y configuración global
│   ├── entrypoint/         # main.jsx - punto de entrada React
│   ├── providers/          # Providers globales (Theme, QueryClient, etc.)
│   ├── routes/             # App.jsx - configuración de routing
│   ├── store/              # Configuración global del store (Redux/Zustand)
│   ├── styles/             # index.css - estilos globales y tokens
│   └── analytics/          # Tracking global de eventos
│
├── shared/                 # ⭐ Capa Shared: Base reutilizable
│   ├── api/                # adminApi.js - cliente HTTP y requests
│   ├── ui/                 # Card/, Button/ - componentes UI base
│   ├── lib/                # Utilidades (dates, text, etc.)
│   ├── config/             # Constantes y configuración
│   ├── routes/             # Constantes de rutas
│   └── i18n/               # Traducciones
│
├── entities/               # ⭐ Capa Entities: Entidades de negocio
│   └── [entity-name]/      # Ejemplo: user/, config/
│       ├── model/          # Tipos, store, validaciones
│       ├── api/            # Requests específicos de la entidad
│       ├── ui/             # Componentes de representación
│       └── lib/            # Helpers de la entidad
│
├── features/               # ⭐ Capa Features: Acciones de valor
│   └── [feature-name]/     # Ejemplo: login/, export-data/
│       ├── ui/             # Componentes del feature
│       ├── model/          # Estado y lógica del feature
│       ├── api/            # Requests del feature
│       ├── config/         # Feature flags
│       └── lib/            # Helpers internos
│
├── widgets/                # ⭐ Capa Widgets: Bloques grandes de UI
│   └── layout/             # Widget: Layout del panel admin
│       ├── ui/             # Layout.jsx, Layout.css
│       ├── model/          # Estado del widget (si aplica)
│       └── lib/            # Helpers del widget
│
└── pages/                  # ⭐ Capa Pages: Pantallas/Rutas
    ├── dashboard/          # Page slice: Dashboard
    │   ├── ui/             # DashboardPage.jsx
    │   ├── api/            # Carga de datos (si aplica)
    │   └── index.js        # Export público
    ├── config-accesibilidad/
    │   ├── ui/             # ConfigAccesibilidadPage.jsx
    │   └── index.js
    ├── config-navegacion/
    │   └── ui/
    └── config-privacidad/
        └── ui/
```

---

## 🎯 Reglas de FSD

### **1. Direccionalidad de Imports**

Las capas solo pueden importar de capas **inferiores**:

```
app → puede importar de → pages, widgets, features, entities, shared
pages → puede importar de → widgets, features, entities, shared
widgets → puede importar de → features, entities, shared
features → puede importar de → entities, shared
entities → puede importar de → shared
shared → NO importa de nadie (es la base)
```

### **2. Slices Públicos (Public API)**

Cada slice (page, widget, feature, entity) expone su API pública mediante `index.js`:

```javascript
// pages/dashboard/index.js
export { default } from './ui/DashboardPage'
```

**Importar así (CORRECTO):**
```javascript
import DashboardPage from '@pages/dashboard'  // ✅
```

**NO así (INCORRECTO):**
```javascript
import DashboardPage from '@pages/dashboard/ui/DashboardPage'  // ❌
```

### **3. Organización por Slices**

Cada "slice" (página, widget, feature, entidad) tiene su propia carpeta con subcarpetas:

- `ui/` - Componentes visuales
- `model/` - Estado y lógica
- `api/` - Requests y mappers
- `lib/` - Helpers internos
- `config/` - Configuración del slice

---

## 📁 Carpetas Actuales del Proyecto

### **App** (`src/app/`)

| Carpeta | Contenido | Estado |
|---------|-----------|--------|
| `entrypoint/` | main.jsx | ✅ Usado |
| `providers/` | - | ⚪ Vacío (reservado) |
| `routes/` | App.jsx | ✅ Usado |
| `store/` | - | ⚪ Vacío (reservado) |
| `styles/` | index.css | ✅ Usado |
| `analytics/` | - | ⚪ Vacío (opcional) |

### **Shared** (`src/shared/`)

| Carpeta | Contenido | Estado |
|---------|-----------|--------|
| `api/` | adminApi.js | ✅ Usado |
| `ui/` | Card/, Button/ | ✅ Usado |
| `lib/` | - | ⚪ Vacío (reservado) |
| `config/` | - | ⚪ Vacío (reservado) |
| `routes/` | - | ⚪ Vacío (reservado) |
| `i18n/` | - | ⚪ Vacío (reservado) |

### **Pages** (`src/pages/`)

| Slice | Contenido | Estado |
|-------|-----------|--------|
| `dashboard/` | DashboardPage.jsx | ✅ Usado |
| `config-accesibilidad/` | ConfigAccesibilidadPage.jsx | ✅ Usado |
| `config-navegacion/` | ConfigNavegacionPage.jsx | ✅ Usado |
| `config-privacidad/` | ConfigPrivacidadPage.jsx | ✅ Usado |

### **Widgets** (`src/widgets/`)

| Slice | Contenido | Estado |
|-------|-----------|--------|
| `layout/` | Layout.jsx | ✅ Usado |

### **Features** (`src/features/`)

⚪ Vacío (reservado para futuras features)

### **Entities** (`src/entities/`)

⚪ Vacío (reservado para entidades de negocio)

---

## 🔧 Configuración de Vite

Los alias en `vite.config.js` permiten importar con rutas absolutas:

```javascript
{
  '@app': './src/app',
  '@shared': './src/shared',
  '@entities': './src/entities',
  '@features': './src/features',
  '@widgets': './src/widgets',
  '@pages': './src/pages'
}
```

**Ejemplo de uso:**
```javascript
import Card from '@shared/ui/Card/Card'
import adminApi from '@shared/api/adminApi'
import DashboardPage from '@pages/dashboard'
```

---

## 📝 Ejemplos de Uso

### **Crear una nueva página:**

```bash
mkdir -p src/pages/mi-pagina/ui
echo "export { default } from './ui/MiPagina'" > src/pages/mi-pagina/index.js
```

### **Crear un nuevo widget:**

```bash
mkdir -p src/widgets/mi-widget/{ui,model,lib}
echo "export { default } from './ui/MiWidget'" > src/widgets/mi-widget/index.js
```

### **Crear una nueva feature:**

```bash
mkdir -p src/features/mi-feature/{ui,model,api,lib}
echo "export { default } from './ui'" > src/features/mi-feature/index.js
```

---

## ✅ Checklist de FSD

- ✅ Capa `app/` con subcarpetas (entrypoint, routes, styles, etc.)
- ✅ Capa `shared/` con subcarpetas (api, ui, lib, etc.)
- ✅ Capa `pages/` con slices (dashboard, config-*)
- ✅ Capa `widgets/` con slices (layout)
- ✅ Capa `features/` creada (vacía)
- ✅ Capa `entities/` creada (vacía)
- ✅ Cada slice tiene `index.js` para exports públicos
- ✅ Imports usan alias (`@pages`, `@widgets`, etc.)
- ✅ Se respeta la direccionalidad de imports
- ✅ Carpetas obligatorias creadas (aunque estén vacías)

---

## 📚 Referencias

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [FSD Best Practices](https://feature-sliced.design/docs/guides/tech/with-react)
- [FSD Examples](https://github.com/feature-sliced/examples)

---

**Autor:** MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
**Proyecto:** OpenBlind Admin Panel
