# 🔴 App Layer - FSD

## Propósito

La capa **App** contiene la lógica de inicialización y configuración global de la aplicación.

## Subcarpetas

### `entrypoint/`
Punto de entrada principal de la aplicación. Aquí se renderiza el componente raíz.

**Archivos típicos:**
- `App.jsx` - Componente raíz
- `index.jsx` - ReactDOM.render()

### `providers/`
Context providers globales que envuelven toda la aplicación.

**Ejemplos:**
- Redux Provider
- React Query Provider
- Theme Provider
- Auth Provider

### `routes/`
Configuración de rutas principales de la aplicación.

**Ejemplos:**
- React Router configuración
- Rutas protegidas (PrivateRoute)
- Rutas públicas

### `store/`
Estado global de la aplicación (Redux, Zustand, etc.)

**Ejemplos:**
- Redux store
- Zustand stores
- Recoil atoms

### `styles/`
Estilos globales que afectan toda la aplicación.

**Ejemplos:**
- CSS reset
- Variables CSS globales
- Temas (dark mode, high contrast)
- Fuentes

### `analytics/`
Integración con servicios de análisis y monitoreo.

**Ejemplos:**
- Google Analytics
- Sentry (error tracking)
- Mixpanel
- Hotjar

## Reglas de Importación

La capa App puede importar de **TODAS** las demás capas:

```javascript
// ✅ Puede importar de processes
import { CheckoutProcess } from 'processes/checkout';

// ✅ Puede importar de pages
import { HomePage } from 'pages/home';

// ✅ Puede importar de widgets
import { AppHeader } from 'widgets/app-header';

// ✅ Puede importar de features
import { LoginForm } from 'features/login';

// ✅ Puede importar de entities
import { User } from 'entities/user';

// ✅ Puede importar de shared
import { api } from 'shared/api';
```

## Estado Actual

⚠️ **TODO**: Esta capa está vacía y pendiente de implementación. Actualmente la inicialización está en `/src/App.jsx` y `/src/main.jsx`.

**Próximos pasos:**
1. Mover `App.jsx` a `app/entrypoint/`
2. Mover estilos globales a `app/styles/`
3. Configurar providers en `app/providers/`
4. Configurar rutas en `app/routes/`
