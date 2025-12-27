# 🔗 INTEGRACIÓN DEL PROYECTO

**Proyecto:** OpenBlind Admin Panel
**Equipo:**
- MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
- MALDONADO DELGADO DAVID ALEJANDRO (N°5)

---

## 📊 DIVISIÓN DE RESPONSABILIDADES

### **JOSSELYN MOPOSITA**
✅ Dashboard con métricas principales
✅ Configuración Global - Accesibilidad
✅ Configuración Global - Navegación
✅ Configuración Global - Privacidad
✅ Backend de configuración y métricas

### **DAVID MALDONADO**
✅ Gestión de Incidencias (CRUD completo)
✅ Gestión de Soporte (Read, Update, Delete)
✅ Backend de incidencias y soporte
✅ Modelos y controladores

---

## 🏗️ ARQUITECTURA UNIFICADA

### **Frontend - Feature-Sliced Design**

```
frontend-admin/src/
│
├── app/                          # ← COMPARTIDO
│   ├── App.jsx                   # Routing principal
│   ├── entrypoint/main.jsx       # Punto de entrada
│   └── styles/index.css          # Tema oscuro
│
├── features/                     # ← MÓDULOS FUNCIONALES
│   │
│   ├── dashboard/                # ← JOSSELYN
│   │   └── screens/
│   │       ├── DashboardScreen.jsx
│   │       └── DashboardScreen.css
│   │
│   ├── configuracion/            # ← JOSSELYN (3 pantallas)
│   │   └── screens/
│   │       ├── ConfigAccesibilidadScreen.jsx
│   │       ├── ConfigNavegacionScreen.jsx
│   │       └── ConfigPrivacidadScreen.jsx
│   │
│   ├── incidencias/              # ← DAVID
│   │   └── screens/
│   │       ├── IncidenciasScreen.jsx
│   │       └── IncidenciasScreen.css
│   │
│   └── soporte/                  # ← DAVID
│       └── screens/
│           └── SoporteScreen.jsx
│
├── shared/                       # ← COMPARTIDO
│   └── components/
│       ├── Card.jsx              # Tarjetas con animaciones
│       ├── Button.jsx            # Botones estilizados
│       ├── Badge.jsx             # Etiquetas de estado
│       └── Layout.jsx            # Sidebar + contenido
│
└── services/                     # ← COMPARTIDO
    └── api.js                    # Cliente HTTP centralizado
```

---

### **Backend - Arquitectura Hexagonal**

```
src/
│
├── domain/
│   └── models/sql/
│       ├── configuracionGlobal.js          # ← JOSSELYN
│       └── admin/
│           ├── incidencia.js               # ← DAVID
│           └── ticketSoporte.js            # ← DAVID
│
└── infrastructure/
    └── http/
        ├── controllers/admin/
        │   ├── configuracionGlobal.controller.js    # ← JOSSELYN
        │   ├── metricas.controller.js               # ← JOSSELYN
        │   ├── incidencias.controller.js            # ← DAVID
        │   └── soporte.controller.js                # ← DAVID
        │
        └── router/
            └── admin.router.js                       # ← COMPARTIDO
```

---

## 🔄 CÓMO SE INTEGRAN

### **1. Sidebar Compartido**

```javascript
// shared/components/Layout.jsx

<nav className="sidebar-nav">
  {/* Josselyn */}
  <NavLink to="/dashboard">Dashboard</NavLink>

  {/* David */}
  <NavLink to="/incidencias">Incidencias</NavLink>
  <NavLink to="/soporte">Soporte</NavLink>

  {/* Josselyn */}
  <NavLink to="/configuracion/accesibilidad">Accesibilidad</NavLink>
  <NavLink to="/configuracion/navegacion">Navegación</NavLink>
  <NavLink to="/configuracion/privacidad">Privacidad</NavLink>
</nav>
```

### **2. API Centralizada**

```javascript
// services/api.js

// ========== JOSSELYN ==========
export const getMetricsResumen = async () => { ... }
export const getConfiguracionGlobal = async () => { ... }
export const updateConfiguracionGlobal = async (data) => { ... }

// ========== DAVID ==========
export const getIncidencias = async (filters) => { ... }
export const createIncidencia = async (data) => { ... }
export const updateIncidencia = async (id, data) => { ... }
export const deleteIncidencia = async (id) => { ... }

export const getTickets = async (filters) => { ... }
export const updateTicket = async (id, data) => { ... }
export const deleteTicket = async (id) => { ... }
```

### **3. Dashboard Unificado**

El Dashboard de Josselyn muestra métricas que incluyen datos de David:

```javascript
// DashboardScreen.jsx (Josselyn)

<MetricCard
  title="Incidencias"
  value={`${metrics?.incidenciasResueltas}/${metrics?.incidenciasReportadas}`}
  // ↑ Estas métricas vienen de las incidencias de David
/>

<MetricCard
  title="Tickets Soporte"
  value={metrics?.ticketsPendientes}
  // ↑ Estas métricas vienen de los tickets de David
/>
```

### **4. Rutas del Backend**

```javascript
// admin.router.js

// ========== JOSSELYN ==========
GET  /api/admin/configuracion
PUT  /api/admin/configuracion
GET  /api/admin/metricas/resumen
GET  /api/admin/metricas/usuarios
GET  /api/admin/metricas/rutas
GET  /api/admin/metricas/incidencias    // ← Consulta tabla de David
GET  /api/admin/metricas/uso-modulos

// ========== DAVID ==========
GET    /api/admin/incidencias
POST   /api/admin/incidencias
PUT    /api/admin/incidencias/:id
DELETE /api/admin/incidencias/:id

GET    /api/admin/soporte
PUT    /api/admin/soporte/:id
DELETE /api/admin/soporte/:id
```

---

## 📊 FLUJO DE DATOS INTEGRADO

### **Ejemplo: Ver métricas de incidencias**

```
1. Usuario abre Dashboard (Josselyn)
   ↓
2. DashboardScreen.jsx llama a getMetricsResumen()
   ↓
3. API hace GET /api/admin/metricas/resumen
   ↓
4. metricas.controller.js (Josselyn) ejecuta getResumen()
   ↓
5. Controller consulta tabla 'incidencias' (David)
   ↓
6. Cuenta incidencias resueltas vs reportadas
   ↓
7. Retorna JSON con todas las métricas
   ↓
8. Dashboard muestra "15/30 incidencias resueltas"
```

---

## 🎨 COMPONENTES COMPARTIDOS

Ambos usan los mismos componentes para mantener consistencia visual:

| Componente | Usado por Josselyn | Usado por David |
|------------|-------------------|-----------------|
| **Card** | ✅ Dashboard, Config | ✅ Tablas de Incidencias y Soporte |
| **Button** | ✅ Botones de guardar | ✅ Botones de crear/eliminar |
| **Badge** | ✅ Métricas del dashboard | ✅ Estados y prioridades |
| **Layout** | ✅ Todas las páginas | ✅ Todas las páginas |

---

## 🗂️ BASE DE DATOS COMPARTIDA

### **Tablas:**

```sql
-- Josselyn
configuracion_global (id, tamanoFuente, idioma, ...)

-- David
incidencias (id, titulo, zona, tipo, estado, ...)
tickets_soporte (id, asunto, usuario, prioridad, estado, ...)
```

### **Relaciones:**

No hay relaciones directas entre las tablas (están desacopladas), pero:
- `metricas.controller.js` consulta las tablas de David para generar estadísticas
- El Dashboard muestra datos de ambos módulos

---

## 📝 PARA LA EXPOSICIÓN CONJUNTA

### **Introducción (Juntos):**

> "Implementamos el panel de administración de OpenBlind usando arquitectura modular funcional (Feature-Sliced Design). El proyecto se divide en 2 partes principales."

### **Parte 1 - Josselyn:**

> "Yo implementé el Dashboard con 4 métricas principales y las 3 secciones de Configuración Global: Accesibilidad, Navegación y Privacidad. Estos valores son los que heredan los nuevos usuarios al registrarse."

### **Parte 2 - David:**

> "Yo implementé la Gestión de Incidencias con CRUD completo y la Gestión de Soporte con operaciones de lectura, actualización y archivado. Las incidencias son detectadas por ONGs y autoridades, mientras que los tickets vienen de los usuarios."

### **Integración (Juntos):**

> "Ambos módulos están integrados en el mismo proyecto. El Dashboard muestra métricas de las incidencias y tickets, todos comparten el mismo sistema de diseño y el mismo backend."

---

## ✅ CHECKLIST FINAL

### **Antes de la demo:**

- [ ] Backend corriendo en puerto 8888
- [ ] Frontend corriendo en puerto 5174
- [ ] MySQL corriendo
- [ ] Probar crear incidencia (David)
- [ ] Probar cambiar estado de ticket (David)
- [ ] Probar guardar configuración (Josselyn)
- [ ] Verificar que Dashboard carga métricas (Josselyn)

### **Durante la exposición:**

- [ ] Mostrar sidebar con las 6 opciones
- [ ] Demostrar Dashboard (Josselyn)
- [ ] Demostrar CRUD de Incidencias (David)
- [ ] Demostrar gestión de Soporte (David)
- [ ] Demostrar configuración de Accesibilidad (Josselyn)
- [ ] Explicar arquitectura modular funcional (Ambos)

---

## 🎯 RESPUESTAS A PREGUNTAS COMUNES

**P: ¿Cómo se divide el trabajo?**
R: "Josselyn hizo Dashboard y Configuración Global. David hizo Incidencias y Soporte. Compartimos componentes y el backend está integrado."

**P: ¿Qué arquitectura usaron?**
R: "Frontend: Feature-Sliced Design con 3 capas (app, features, shared). Backend: Arquitectura Hexagonal con Express y Sequelize."

**P: ¿Cómo se comunican frontend y backend?**
R: "Usamos un cliente HTTP centralizado en services/api.js que hace peticiones REST a /api/admin/*"

**P: ¿Por qué no eliminan registros de la base de datos?**
R: "Implementamos soft delete (borrado lógico) para mantener historial completo. Solo marcamos registros como inactivos."

**P: ¿Están conectados los módulos de Josselyn y David?**
R: "Sí, el Dashboard de Josselyn muestra métricas que vienen de las tablas de David (incidencias y tickets)."

---

## 📚 ARCHIVOS CLAVE DEL PROYECTO

### **Documentación:**
- `JOSSELYN-RESPONSABILIDADES.md` - Lo que hizo Josselyn
- `DAVID-RESPONSABILIDADES.md` - Lo que hizo David
- `INTEGRACION-PROYECTO.md` - Este archivo
- `ESTRUCTURA-FSD.md` - Explicación de la arquitectura
- `COMO-EJECUTAR.md` - Guía de ejecución

### **Frontend Principal:**
- `frontend-admin/src/app/App.jsx` - Routing
- `frontend-admin/src/services/api.js` - Cliente HTTP
- `frontend-admin/src/shared/components/Layout.jsx` - Sidebar

### **Backend Principal:**
- `src/infrastructure/http/router/admin.router.js` - Rutas
- Controladores en `src/infrastructure/http/controllers/admin/`
- Modelos en `src/domain/models/sql/` y `src/domain/models/sql/admin/`

---

**¡ÉXITO EN LA EXPOSICIÓN! 🎓💪**

**Preparado por:** Claude Code
**Equipo:** Josselyn Moposita + David Maldonado
**Fecha:** 2025-12-27
