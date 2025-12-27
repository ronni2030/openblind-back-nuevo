# 🎯 OpenBlind Admin - Backend

Backend del Panel de Administración de OpenBlind con **Arquitectura Hexagonal**.

**Autor:** MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
**Versión:** 1.0.0
**Stack:** Node.js + Express + MySQL + Sequelize

---

## 📋 Descripción

Backend para el panel de administración de OpenBlind que permite:

1. **Dashboard con Métricas:**
   - Número de usuarios activos
   - Rutas generadas por día
   - Incidencias reportadas/resueltas
   - Uso de módulos (navegación, tarjeta, contactos)

2. **Configuración Global del Sistema:**
   - Configuración de Accesibilidad (valores por defecto)
   - Configuración de Navegación (preferencias globales)
   - Configuración de Privacidad/Geolocalización (políticas)

---

## 🏗️ Arquitectura Hexagonal

```
backend-admin/
├── src/
│   ├── domain/              # Capa de Dominio
│   │   ├── models/          # Modelos de datos
│   │   │   └── sql/         # Modelos SQL (Sequelize)
│   │   └── services/        # Lógica de negocio
│   ├── application/         # Capa de Aplicación
│   │   └── useCases/        # Casos de uso
│   └── infrastructure/      # Capa de Infraestructura
│       ├── database/        # Conexión a BD
│       ├── http/            # HTTP (Express)
│       │   ├── controllers/ # Controladores
│       │   ├── router/      # Rutas
│       │   └── middleware/  # Middleware
│       └── config/          # Configuración
├── tests/                   # Tests
├── server.js                # Punto de entrada
├── package.json
└── .env.example
```

---

## 🚀 Instalación

### 1. Instalar dependencias

```bash
cd backend-admin
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env`:

```env
NODE_ENV=development
PORT=8889
HOST=localhost

DB_HOST=localhost
DB_PORT=3306
DB_NAME=openblind_admin
DB_USER=root
DB_PASSWORD=

CORS_ORIGIN=http://localhost:5174
```

### 3. Crear base de datos

```sql
CREATE DATABASE openblind_admin;
```

### 4. Iniciar servidor

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

El servidor estará corriendo en: **http://localhost:8889**

---

## 📡 Endpoints de la API

### **CONFIGURACIÓN GLOBAL**

#### `GET /api/admin/configuracion`
Obtiene la configuración global del sistema (id=1).

**Response:**
```json
{
  "success": true,
  "message": "Configuración global obtenida exitosamente",
  "data": {
    "id": 1,
    "tamanoFuente": "medium",
    "temaContraste": "normal",
    "idioma": "es",
    "velocidadVoz": 1.0,
    "volumenVoz": 80,
    "feedbackHaptico": true,
    "nivelDetalle": "completo",
    "longitudMaxima": 10,
    "paradaSegura": true,
    "frecuenciaInstrucciones": "media",
    "tipoInstruccion": "distancia",
    "alertaDesvio": true,
    "alertaObstaculo": true,
    "retencionUbicacion": 30,
    "trackingBackground": false,
    "compartirUbicacion": true,
    "guardarHistorial": true,
    "permitirAnonimo": false,
    "opcionesModificables": { ... },
    "activo": true,
    "modificadoPor": "admin"
  }
}
```

---

#### `PUT /api/admin/configuracion`
Actualiza toda la configuración global.

**Request Body:**
```json
{
  "accesibilidad": {
    "tamanoFuente": "large",
    "temaContraste": "alto-contraste",
    "idioma": "es",
    "velocidadVoz": 1.2,
    "volumenVoz": 90,
    "feedbackHaptico": true,
    "nivelDetalle": "completo"
  },
  "navegacion": {
    "longitudMaxima": 15,
    "paradaSegura": true,
    "frecuenciaInstrucciones": "alta",
    "tipoInstruccion": "distancia",
    "alertaDesvio": true,
    "alertaObstaculo": true
  },
  "privacidad": {
    "retencionUbicacion": 30,
    "trackingBackground": false,
    "compartirUbicacion": true,
    "guardarHistorial": true,
    "permitirAnonimo": false
  },
  "modificadoPor": "admin"
}
```

---

#### `PATCH /api/admin/configuracion/field`
Actualiza un solo campo.

**Request Body:**
```json
{
  "field": "tamanoFuente",
  "value": "large",
  "modificadoPor": "admin"
}
```

---

#### `POST /api/admin/configuracion/reset`
Resetea la configuración a valores por defecto.

---

#### `DELETE /api/admin/configuracion`
Soft delete de la configuración (marca `activo=false`).

---

#### `POST /api/admin/configuracion/restore`
Restaura configuración eliminada.

---

### **MÉTRICAS Y DASHBOARD**

#### `GET /api/admin/metricas/resumen`
Resumen general de todas las métricas.

**Response:**
```json
{
  "success": true,
  "data": {
    "usuarios": {
      "total": 1247,
      "activos": 892,
      "nuevosHoy": 23,
      "nuevosEstaSemana": 156
    },
    "rutas": {
      "total": 8456,
      "hoy": 342,
      "estaSemana": 2134
    },
    "incidencias": {
      "total": 234,
      "pendientes": 45,
      "resueltas": 145
    },
    "usoModulos": { ... }
  }
}
```

---

#### `GET /api/admin/metricas/usuarios`
Métricas detalladas de usuarios.

---

#### `GET /api/admin/metricas/rutas?periodo=semana`
Métricas de rutas generadas.

**Query Params:**
- `periodo`: `dia`, `semana`, `mes`

---

#### `GET /api/admin/metricas/incidencias`
Métricas de incidencias reportadas/resueltas.

---

#### `GET /api/admin/metricas/uso-modulos`
Estadísticas de uso de módulos (navegación, tarjeta, contactos).

---

## 🗄️ Modelo de Datos

### **ConfiguracionGlobal**

**Tabla:** `configuracion_global`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Siempre será 1 (único registro) |
| `tamanoFuente` | ENUM | small, medium, large, extra-large |
| `temaContraste` | ENUM | normal, alto-contraste |
| `idioma` | STRING | es, en |
| `velocidadVoz` | DECIMAL | 0.5 - 2.0 |
| `volumenVoz` | INTEGER | 0 - 100 |
| `feedbackHaptico` | BOOLEAN | true/false |
| `nivelDetalle` | ENUM | basico, completo, experto |
| `longitudMaxima` | INTEGER | 1 - 50 km |
| `paradaSegura` | BOOLEAN | true/false |
| `frecuenciaInstrucciones` | ENUM | baja, media, alta |
| `tipoInstruccion` | ENUM | distancia, tiempo |
| `alertaDesvio` | BOOLEAN | true/false |
| `alertaObstaculo` | BOOLEAN | true/false |
| `retencionUbicacion` | INTEGER | 7, 14, 30, 90 días |
| `trackingBackground` | BOOLEAN | true/false |
| `compartirUbicacion` | BOOLEAN | true/false |
| `guardarHistorial` | BOOLEAN | true/false |
| `permitirAnonimo` | BOOLEAN | true/false |
| `opcionesModificables` | JSON | Qué puede modificar el usuario |
| `activo` | BOOLEAN | Borrado lógico |
| `fechaEliminacion` | DATE | Fecha de soft delete |
| `modificadoPor` | STRING | Usuario que modificó |
| `ultimaActualizacion` | DATE | Última modificación |

---

## 🔒 Características de Seguridad

- ✅ **Helmet:** Headers de seguridad HTTP
- ✅ **CORS:** Control de orígenes permitidos
- ✅ **Validación de datos:** En controladores
- ✅ **Soft Delete:** Borrado lógico (no físico)
- ✅ **Error Handling:** Manejo global de errores

---

## 📝 Notas Importantes

### **Datos Mock**

Actualmente, las métricas del dashboard usan **datos de ejemplo (mock)**.

Cuando existan los modelos de `Usuario`, `Ruta`, `Incidencia`, etc., se deben reemplazar los datos mock por **queries reales a la base de datos**.

**Archivos a actualizar:**
- `src/infrastructure/http/controllers/metricas.controller.js`

---

### **Configuración Global Única**

Solo existe **UN registro** de configuración global (id=1).

El modelo `ConfiguracionGlobal` tiene un hook `beforeCreate` que asegura esto:

```javascript
ConfiguracionGlobal.beforeCreate(async (configuracion) => {
    const count = await ConfiguracionGlobal.count();
    if (count > 0) {
        throw new Error('Solo puede existir un registro de configuración global (id=1)');
    }
    configuracion.id = 1;
});
```

---

## 🧪 Testing

```bash
npm test
```

---

## 📦 Dependencias

**Producción:**
- `express` - Framework web
- `cors` - CORS middleware
- `dotenv` - Variables de entorno
- `mysql2` - Cliente MySQL
- `sequelize` - ORM
- `morgan` - Logger HTTP
- `helmet` - Seguridad headers
- `compression` - Compresión de respuestas

**Desarrollo:**
- `nodemon` - Auto-reload en desarrollo
- `jest` - Testing framework

---

## 🌍 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `8889` |
| `HOST` | Host del servidor | `localhost` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_NAME` | Nombre de la base de datos | `openblind_admin` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | (vacío) |
| `CORS_ORIGIN` | Origen permitido para CORS | `http://localhost:5174` |

---

## 📧 Contacto

**Autor:** MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
**Proyecto:** OpenBlind - Sistema de Navegación para Personas con Discapacidad Visual
**Institución:** [Tu institución educativa]

---

## 📄 Licencia

MIT
