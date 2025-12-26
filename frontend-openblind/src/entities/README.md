# 🟣 Entities Layer - FSD

## Propósito

La capa **Entities** contiene las entidades de negocio del dominio. Una entidad representa un concepto del negocio con su propia identidad y ciclo de vida.

## ¿Qué es una Entity?

Una **entity** es:
- Un concepto de negocio con identidad propia (ej: User, Product, Order)
- Reutilizable en múltiples features
- Independiente de la UI (puede usarse en cualquier contexto)

**Ejemplos de entities:**
- `user` - Usuario de la aplicación
- `voice-session` - Sesión de comandos de voz
- `place` - Lugar favorito
- `contact` - Contacto de emergencia

## Estructura de una Entity

Cada entity tiene 4 subcarpetas:

```
entities/user/
├── model/          # Tipos, interfaces, schemas
├── api/            # Llamadas API relacionadas
├── ui/             # Componentes UI de la entidad
├── lib/            # Lógica de negocio, validaciones
└── index.js        # Exportaciones públicas
```

### `model/`
Tipos TypeScript, schemas, constantes de la entidad.

**Ejemplo:**
```javascript
// entities/user/model/types.js
export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

export const createUser = (data) => ({
  id: data.id,
  nombre: data.nombre,
  email: data.email,
  role: data.role || UserRole.USER,
  createdAt: data.createdAt || new Date().toISOString()
});
```

### `api/`
Funciones para interactuar con la API relacionadas a la entidad.

**Ejemplo:**
```javascript
// entities/user/api/userApi.js
import { apiClient } from 'shared/api';

export const userApi = {
  getById: (id) => apiClient.get(`/users/${id}`),
  update: (id, data) => apiClient.put(`/users/${id}`, data),
  delete: (id) => apiClient.delete(`/users/${id}`)
};
```

### `ui/`
Componentes React específicos de la entidad.

**Ejemplo:**
```javascript
// entities/user/ui/UserAvatar.jsx
export const UserAvatar = ({ user, size = 'medium' }) => (
  <div className={`avatar avatar-${size}`}>
    {user.avatarUrl ? (
      <img src={user.avatarUrl} alt={user.nombre} />
    ) : (
      <span>{user.nombre.charAt(0).toUpperCase()}</span>
    )}
  </div>
);

// entities/user/ui/UserCard.jsx
export const UserCard = ({ user }) => (
  <div className="user-card">
    <UserAvatar user={user} />
    <div>
      <h3>{user.nombre}</h3>
      <p>{user.email}</p>
    </div>
  </div>
);
```

### `lib/`
Lógica de negocio, validaciones, transformaciones.

**Ejemplo:**
```javascript
// entities/user/lib/validators.js
export const validateUserData = (user) => {
  const errors = {};

  if (!user.nombre || user.nombre.trim().length === 0) {
    errors.nombre = 'El nombre es requerido';
  }

  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = 'Email inválido';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

// entities/user/lib/permissions.js
export const canEditProfile = (user, targetUserId) => {
  return user.id === targetUserId || user.role === 'admin';
};
```

## Entities en OpenBlind

### 1. `entities/user/`
Entidad de usuario de la aplicación.

**Responsabilidades:**
- Modelo de datos de usuario
- CRUD de usuario via API
- Componentes: UserAvatar, UserCard
- Validaciones de usuario

### 2. `entities/voice-session/`
Entidad de sesión de comandos de voz.

**Responsabilidades:**
- Estado de sesión de voz (isListening, currentCommand)
- Historial de comandos
- Componentes: VoiceIndicator, CommandHistory
- Lógica de reconocimiento de voz

## Reglas de Importación

Las entities pueden importar de:
- ✅ `shared/` - Componentes UI, utilidades, API client
- ❌ NO de `features/` - Las entities son independientes de features
- ❌ NO de `widgets/` - Las entities son más bajas en la jerarquía
- ❌ NO de `pages/` - Las entities no conocen las páginas

```javascript
// ✅ CORRECTO: Entity importa de shared
import { apiClient } from 'shared/api';
import { Button } from 'shared/ui';

// ❌ INCORRECTO: Entity NO puede importar de features
import { ConfiguracionView } from 'features/configuracion'; // ¡ERROR!
```

## ¿Cuándo crear una Entity?

**Crear entity si:**
- ✅ El concepto se usa en 2+ features
- ✅ Tiene identidad propia (ej: id único)
- ✅ Tiene CRUD en la API
- ✅ Representa un concepto de negocio del dominio

**NO crear entity si:**
- ❌ Solo se usa en 1 feature (mejor en el feature)
- ❌ Es solo UI sin lógica de negocio (mejor en shared/ui)
- ❌ No tiene representación en el backend

## Estado Actual

⚠️ **TODO**: Esta capa está vacía y pendiente de implementación.

**Próximos pasos:**
1. Implementar `entities/user/` con modelo y API
2. Implementar `entities/voice-session/` para comandos de voz
3. Considerar `entities/place/` para lugares favoritos
4. Considerar `entities/contact/` para contactos de emergencia
