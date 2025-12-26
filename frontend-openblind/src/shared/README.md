# ⚪ Shared Layer - FSD

## Propósito

La capa **Shared** contiene código reutilizable que NO pertenece a ninguna entidad o feature específica. Es el código más genérico y compartido de la aplicación.

## Subcarpetas

### `api/`
Cliente HTTP y configuración de API.

**Ejemplos:**
```javascript
// shared/api/client.js
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.openblind.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptores
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### `ui/`
Componentes UI genéricos y reutilizables (Design System).

**Componentes típicos:**
- `<Button>` - Botón genérico
- `<Modal>` - Modal genérico
- `<Input>` - Input de formulario
- `<Spinner>` - Indicador de carga
- `<Card>` - Tarjeta contenedora
- `<Tooltip>` - Tooltip

**Ejemplo:**
```javascript
// shared/ui/Button/Button.jsx
export const Button = ({ variant, size, children, onClick }) => (
  <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
    {children}
  </button>
);
```

### `lib/`
Utilidades y helpers generales.

**Ejemplos:**
```javascript
// shared/lib/formatters.js
export const formatDate = (date) => {
  return new Intl.DateFormat('es-ES').format(date);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// shared/lib/validators.js
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### `config/`
Configuración de la aplicación.

**Ejemplos:**
```javascript
// shared/config/env.js
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  version: '1.0.0'
};

// shared/config/constants.js
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const SUPPORTED_LANGUAGES = ['es', 'en'];
```

### `routes/`
Constantes de rutas.

**Ejemplos:**
```javascript
// shared/routes/paths.js
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  CONFIGURACION: '/configuracion',
  CONFIGURACION_ACCESIBILIDAD: '/configuracion/accesibilidad',
  CONFIGURACION_NAVEGACION: '/configuracion/navegacion',
  CONFIGURACION_PRIVACIDAD: '/configuracion/privacidad'
};
```

### `i18n/`
Internacionalización (traducciones).

**Ejemplos:**
```javascript
// shared/i18n/es.json
{
  "common.save": "Guardar",
  "common.cancel": "Cancelar",
  "common.delete": "Eliminar",
  "errors.required": "Este campo es requerido",
  "errors.invalidEmail": "Email inválido"
}

// shared/i18n/en.json
{
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.delete": "Delete",
  "errors.required": "This field is required",
  "errors.invalidEmail": "Invalid email"
}
```

## Reglas de Importación

La capa Shared **NO puede importar** de ninguna otra capa (excepto otras subcarpetas de shared).

```javascript
// ✅ CORRECTO: Shared importa de shared
import { apiClient } from 'shared/api';
import { Button } from 'shared/ui';

// ❌ INCORRECTO: Shared NO puede importar de features
import { useConfiguracion } from 'features/configuracion'; // ¡ERROR!

// ❌ INCORRECTO: Shared NO puede importar de entities
import { User } from 'entities/user'; // ¡ERROR!
```

## Criterios para Código en Shared

**¿Cuándo poner código en Shared?**

✅ **Poner en Shared si:**
- Es usado por 2+ features/entities
- Es completamente genérico (sin lógica de negocio)
- No tiene dependencias de features/entities

❌ **NO poner en Shared si:**
- Es específico de un feature (va en el feature)
- Es específico de una entidad (va en la entity)
- Tiene lógica de negocio del dominio

## Estado Actual

⚠️ **TODO**: Esta capa está vacía y pendiente de implementación. Actualmente hay utilidades dispersas en `/src/application/utils/`.

**Próximos pasos:**
1. Crear `shared/ui/` con componentes genéricos (Button, Modal, Input)
2. Mover `speechUtils.js` a `shared/lib/`
3. Crear `shared/api/client.js` con axios configurado
4. Crear `shared/config/constants.js` con constantes
5. Implementar i18n para español e inglés
