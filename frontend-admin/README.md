# 🎨 OpenBlind Admin - Frontend

Panel de administración de OpenBlind con **Feature-Sliced Design**.

**Autor:** MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
**Versión:** 1.0.0
**Stack:** React 19 + Vite 6 + Framer Motion

---

## 📋 Descripción

Frontend del panel de administración de OpenBlind que permite:

1. **Dashboard con Métricas:**
   - Visualización de usuarios activos
   - Rutas generadas por día
   - Incidencias reportadas/resueltas
   - Uso de módulos (navegación, tarjeta, contactos)

2. **Configuración Global del Sistema:**
   - Configuración de Accesibilidad (valores por defecto)
   - Configuración de Navegación (preferencias globales)
   - Configuración de Privacidad/Geolocalización (políticas)

---

## 🏗️ Arquitectura Feature-Sliced Design

```
frontend-admin/
├── src/
│   ├── application/         # App principal y providers
│   ├── pages/               # Páginas (rutas)
│   ├── widgets/             # Layouts y componentes complejos
│   ├── features/            # Funcionalidades completas
│   ├── entities/            # Entidades de negocio
│   └── shared/              # Código compartido
│       ├── ui/              # Componentes UI base
│       ├── api/             # Capa de API
│       ├── styles/          # Estilos globales
│       ├── hooks/           # Hooks compartidos
│       └── utils/           # Utilidades
├── public/                  # Archivos estáticos
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Instalación

### 1. Instalar dependencias

```bash
cd frontend-admin
npm install
```

### 2. Configurar URL del backend (si es necesario)

Si necesitas cambiar la URL del backend, editar: `src/shared/api/adminApi.js`

```javascript
const API_URL = 'http://localhost:8888'; // Cambiar aquí si es necesario
```

**IMPORTANTE:** El frontend se conecta al **backend principal** (`estructura-hexagonal/`) en `/api/admin`, NO a un backend separado.

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5174**

---

## 📡 Conexión con el Backend

Este frontend se conecta al **backend principal** (no a `backend-admin/`).

**Endpoints utilizados:**

```
GET    /api/admin/configuracion              # Obtener configuración global
PUT    /api/admin/configuracion              # Actualizar configuración completa
PATCH  /api/admin/configuracion/field        # Actualizar un campo
POST   /api/admin/configuracion/reset        # Resetear a defaults
GET    /api/admin/metricas/resumen           # Métricas del dashboard
GET    /api/admin/metricas/usuarios          # Métricas de usuarios
GET    /api/admin/metricas/rutas             # Métricas de rutas
GET    /api/admin/metricas/incidencias       # Métricas de incidencias
GET    /api/admin/metricas/uso-modulos       # Métricas de uso de módulos
```

---

## 📂 Estructura de Páginas

### **1. Dashboard (`/dashboard`)**

Vista principal con métricas en tiempo real:

- **Métricas principales:** Usuarios activos, rutas generadas hoy, incidencias pendientes
- **Uso de módulos:** Gráficos de uso de cada módulo de la app
- **Estadísticas rápidas:** Totales de rutas, incidencias y usuarios

**Componente:** `src/pages/DashboardPage.jsx`

---

### **2. Configuración de Accesibilidad (`/configuracion/accesibilidad`)**

Valores por defecto de accesibilidad que heredan todos los usuarios nuevos:

- **Tamaño de fuente:** small, medium, large, extra-large
- **Tema de contraste:** normal, alto-contraste
- **Idioma:** español, inglés
- **Velocidad de voz:** 0.5x - 2.0x
- **Volumen de voz:** 0% - 100%
- **Feedback háptico:** ON/OFF
- **Nivel de detalle:** básico, completo, experto

**Componente:** `src/pages/ConfigAccesibilidadPage.jsx`

---

### **3. Configuración de Navegación (`/configuracion/navegacion`)**

Preferencias globales para rutas y navegación:

- **Longitud máxima de ruta:** 1-50 km
- **Criterio paradas seguras:** sugerir lugares seguros
- **Frecuencia de instrucciones:** baja, media, alta
- **Tipo de instrucción:** por distancia o por tiempo
- **Alerta de desvío:** ON/OFF
- **Alerta de obstáculo:** ON/OFF

**Componente:** `src/pages/ConfigNavegacionPage.jsx`

---

### **4. Configuración de Privacidad (`/configuracion/privacidad`)**

Políticas globales de retención de datos y geolocalización:

- **Política de retención:** 7, 14, 30, 90 días (FIJA)
- **Tracking en background:** ON/OFF (modificable por usuario)
- **Compartir ubicación:** ON/OFF (modificable por usuario)
- **Guardar historial:** ON/OFF (modificable por usuario)
- **Modo anónimo:** disponible/no disponible (FIJA)

**Componente:** `src/pages/ConfigPrivacidadPage.jsx`

---

## 🎨 Sistema de Diseño

### **Paleta de Colores**

La paleta de colores está basada en OpenBlind:

- **Primario (Azul):** Navegación y accesibilidad (`--color-primary-600`)
- **Éxito (Verde):** Confirmaciones y estados positivos (`--color-success-500`)
- **Advertencia (Naranja):** Alertas y warnings (`--color-warning-500`)
- **Error (Rojo):** Errores y estados críticos (`--color-error-500`)
- **Información (Celeste):** Información adicional (`--color-info-500`)

### **Componentes UI Base**

#### **Card**
```jsx
import Card from '@shared/ui/Card/Card'

<Card title="Título" subtitle="Subtítulo">
  Contenido
</Card>
```

#### **Button**
```jsx
import Button from '@shared/ui/Button/Button'

<Button variant="primary" size="md" onClick={handleClick}>
  Texto del botón
</Button>
```

**Variantes:** `primary`, `secondary`, `success`, `danger`, `outline`
**Tamaños:** `sm`, `md`, `lg`

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 📦 Dependencias Principales

**Producción:**
- `react` 19 - Librería UI
- `react-dom` 19 - React DOM
- `react-router-dom` 7 - Routing
- `framer-motion` 12 - Animaciones
- `recharts` 2 - Gráficos (opcional)

**Desarrollo:**
- `vite` 6 - Build tool
- `@vitejs/plugin-react` - Plugin de React para Vite
- `eslint` - Linter de código

---

## 🎯 Flujo de Trabajo

### **Para el Admin:**

1. **Abrir el panel:** http://localhost:5174
2. **Ver dashboard:** Métricas en tiempo real
3. **Modificar configuración global:**
   - Ir a Configuración > Accesibilidad/Navegación/Privacidad
   - Cambiar valores
   - Guardar (automático, PATCH en cada cambio)
4. **Resetear a defaults:** Botón "Resetear a Defaults" en cada sección

### **Lo que pasa en el backend:**

- Existe **UN solo registro** de configuración global (id=1)
- Todos los cambios del admin modifican ese registro
- Los usuarios nuevos **heredan** estos valores al crear su cuenta
- Los usuarios existentes pueden modificar sus configuraciones individuales (según políticas)

---

## 🔒 Características Importantes

### **Políticas Fijas vs Modificables**

En Configuración de Privacidad:

- **FIJAS (usuarios NO pueden cambiar):**
  - Política de retención de ubicaciones
  - Modo anónimo disponible

- **MODIFICABLES (usuarios SÍ pueden cambiar):**
  - Tracking en background
  - Compartir ubicación
  - Guardar historial

En Configuración de Navegación:

- **FIJAS:**
  - Paradas seguras
  - Alerta de desvío
  - Alerta de obstáculo

- **MODIFICABLES:**
  - Longitud máxima
  - Frecuencia de instrucciones
  - Tipo de instrucción

---

## 🌍 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL del backend principal | `http://localhost:8888` |

---

## 📱 Responsive Design

El panel es completamente responsive:

- **Desktop (1024px+):** Layout completo con sidebar
- **Tablet (768px-1024px):** Sidebar reducido
- **Mobile (<768px):** Sidebar colapsable

---

## 🚀 Build para Producción

```bash
# Generar build
npm run build

# Los archivos estarán en dist/
# Subir dist/ a tu servidor web
```

**Configurar servidor web:**

```nginx
server {
  listen 80;
  server_name admin.openblind.com;
  root /var/www/frontend-admin/dist;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Proxy al backend
  location /api {
    proxy_pass http://localhost:8888;
  }
}
```

---

## 📧 Contacto

**Autor:** MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
**Proyecto:** OpenBlind - Sistema de Navegación para Personas con Discapacidad Visual

---

## 📄 Licencia

MIT
