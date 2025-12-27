# 👩‍💻 JOSSELYN MOPOSITA - Responsabilidades

**Estudiante:** MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
**Módulo:** Dashboard + Configuración Global

---

## 📋 TU PARTE DEL PROYECTO

### **1️⃣ Dashboard (Métricas Principales)**

**Ubicación Frontend:**
```
frontend-admin/src/features/dashboard/screens/
├── DashboardScreen.jsx       ← TU CÓDIGO
└── DashboardScreen.css       ← TU CÓDIGO
```

**Lo que hace:**
- Muestra 4 tarjetas con métricas principales:
  - Usuarios Activos
  - Rutas por Día
  - Incidencias (Resueltas/Reportadas)
  - Tickets Pendientes
- Gráfico de uso de módulos (navegación, tarjeta, contactos)
- Botón de actualizar para refrescar datos

**Endpoints que usa:**
- `GET /api/admin/metricas/resumen` - Obtiene todas las métricas

---

### **2️⃣ Configuración Global - Accesibilidad**

**Ubicación Frontend:**
```
frontend-admin/src/features/configuracion/screens/
└── ConfigAccesibilidadScreen.jsx    ← TU CÓDIGO
```

**Lo que hace:**
- Configuración de valores por defecto para nuevos usuarios
- **Apariencia:**
  - Tamaño de fuente (small, medium, large, extra-large)
  - Tema de contraste (normal, alto-contraste)
  - Idioma (español, inglés)
- **Síntesis de Voz:**
  - Velocidad de voz (0.5x - 2.0x)
  - Volumen (0-100%)
  - Nivel de detalle (básico, completo, experto)
  - Feedback háptico (on/off)

**Endpoints que usa:**
- `GET /api/admin/configuracion` - Obtiene configuración actual
- `PUT /api/admin/configuracion` - Guarda cambios

---

### **3️⃣ Configuración Global - Navegación**

**Ubicación Frontend:**
```
frontend-admin/src/features/configuracion/screens/
└── ConfigNavegacionScreen.jsx    ← TU CÓDIGO
```

**Lo que hace:**
- **Rutas:**
  - Longitud máxima de ruta (1-50 km)
  - Sugerir paradas seguras (sí/no)
- **Instrucciones:**
  - Frecuencia (baja, media, alta)
  - Tipo de instrucción (por distancia, por tiempo)
  - Alertas de desvío (on/off)
  - Alertas de obstáculos (on/off)

**Endpoints que usa:**
- `GET /api/admin/configuracion`
- `PUT /api/admin/configuracion`

---

### **4️⃣ Configuración Global - Privacidad**

**Ubicación Frontend:**
```
frontend-admin/src/features/configuracion/screens/
└── ConfigPrivacidadScreen.jsx    ← TU CÓDIGO
```

**Lo que hace:**
- **Ubicación y Rastreo:**
  - Retención de historial (7, 14, 30, 90 días)
  - Tracking en segundo plano (on/off)
  - Compartir ubicación con contactos (on/off)
- **Historial y Datos:**
  - Guardar historial de rutas (on/off)
  - Permitir modo anónimo (on/off)

**Endpoints que usa:**
- `GET /api/admin/configuracion`
- `PUT /api/admin/configuracion`

---

## 🎨 COMPONENTES COMPARTIDOS QUE USAS

**Ubicación:**
```
frontend-admin/src/shared/components/
├── Card.jsx       ← Tarjetas con animaciones
├── Button.jsx     ← Botones con estilos
├── Badge.jsx      ← Etiquetas de estado
└── Layout.jsx     ← Sidebar + contenido
```

**Cómo usarlos en tu código:**
```javascript
import { Card, Button, Badge } from '@shared/components';

// Ejemplo de uso:
<Card title="Mi Tarjeta">
  <p>Contenido aquí</p>
</Card>

<Button variant="primary" onClick={handleClick}>
  Guardar
</Button>

<Badge variant="success">Activo</Badge>
```

---

## ⚙️ BACKEND - TU PARTE

### **Controladores creados previamente:**

```
src/infrastructure/http/controllers/admin/
├── configuracionGlobal.controller.js    ← TU BACKEND
└── metricas.controller.js               ← TU BACKEND
```

### **Modelos creados previamente:**

```
src/domain/models/sql/
└── configuracionGlobal.js    ← Modelo de configuración
```

### **Rutas del backend:**

```javascript
// En admin.router.js

// CONFIGURACIÓN GLOBAL
GET    /api/admin/configuracion           // Obtener config
PUT    /api/admin/configuracion           // Actualizar config completa
PATCH  /api/admin/configuracion/field     // Actualizar un campo
POST   /api/admin/configuracion/reset     // Resetear a defaults
DELETE /api/admin/configuracion           // Soft delete
POST   /api/admin/configuracion/restore   // Restaurar

// MÉTRICAS
GET /api/admin/metricas/resumen          // Resumen del dashboard
GET /api/admin/metricas/usuarios         // Métricas de usuarios
GET /api/admin/metricas/rutas            // Métricas de rutas
GET /api/admin/metricas/incidencias      // Métricas de incidencias
GET /api/admin/metricas/uso-modulos      // Uso de módulos
```

---

## 📚 QUÉ ESTUDIAR PARA LA EXPOSICIÓN

### **1. Estructura Frontend**

```
Tu parte usa Feature-Sliced Design:

app/                  ← Configuración global
features/             ← TUS MÓDULOS:
  ├── dashboard/      ← Dashboard con métricas
  └── configuracion/  ← 3 pantallas de config
shared/               ← Componentes compartidos
services/             ← API centralizada
```

### **2. Flujo de Datos**

```
Usuario hace clic en "Guardar"
         ↓
ConfigAccesibilidadScreen.jsx (frontend)
         ↓
handleSave() llama a updateConfiguracionGlobal()
         ↓
services/api.js hace PUT /api/admin/configuracion
         ↓
Backend recibe en admin.router.js
         ↓
configuracionGlobal.controller.js procesa
         ↓
Actualiza ConfiguracionGlobal en MySQL
         ↓
Retorna respuesta { success: true }
         ↓
Frontend muestra "Configuración guardada"
```

### **3. Tecnologías que usas**

**Frontend:**
- ✅ React 19 - Librería UI
- ✅ Framer Motion - Animaciones
- ✅ CSS Variables - Tema oscuro
- ✅ Fetch API - Llamadas HTTP

**Backend:**
- ✅ Express.js - Framework web
- ✅ Sequelize - ORM para MySQL
- ✅ Node.js - Runtime

---

## 🎯 PUNTOS CLAVE PARA EXPONER

### **Tu responsabilidad:**

1. ✅ **Dashboard con 4 métricas principales**
   - "Implementé el dashboard que muestra usuarios activos, rutas por día, incidencias y tickets en tarjetas animadas"

2. ✅ **3 Pantallas de Configuración Global**
   - "Creé las 3 secciones de configuración: Accesibilidad, Navegación y Privacidad"
   - "Estos valores son los que heredan los nuevos usuarios al registrarse"

3. ✅ **Arquitectura Modular Funcional**
   - "Utilicé Feature-Sliced Design con 3 capas principales"
   - "Cada feature tiene su propia carpeta con screens, components y services"

4. ✅ **Diseño Profesional**
   - "Implementé un tema oscuro moderno con paleta de colores profesional"
   - "Usé animaciones suaves con Framer Motion"

---

## 📂 ARCHIVOS QUE DEBES CONOCER

### **Frontend (LO MÁS IMPORTANTE):**

```
✅ frontend-admin/src/features/dashboard/screens/DashboardScreen.jsx
✅ frontend-admin/src/features/configuracion/screens/ConfigAccesibilidadScreen.jsx
✅ frontend-admin/src/features/configuracion/screens/ConfigNavegacionScreen.jsx
✅ frontend-admin/src/features/configuracion/screens/ConfigPrivacidadScreen.jsx
✅ frontend-admin/src/app/styles/index.css (tema oscuro)
✅ frontend-admin/src/services/api.js (cliente HTTP)
```

### **Backend (COMPLEMENTARIO):**

```
✅ src/infrastructure/http/controllers/admin/configuracionGlobal.controller.js
✅ src/infrastructure/http/controllers/admin/metricas.controller.js
✅ src/domain/models/sql/configuracionGlobal.js
✅ src/infrastructure/http/router/admin.router.js (líneas 22-67, 93-97)
```

---

## 🔗 CÓMO SE INTEGRA CON DAVID

**David hizo:**
- Gestión de Incidencias (CRUD completo)
- Gestión de Soporte (Read, Update, Delete)

**Tú hiciste:**
- Dashboard que muestra las métricas (incluyendo incidencias de David)
- Configuración Global (3 secciones)

**Juntos:**
- El Dashboard muestra las incidencias y tickets que David gestiona
- Comparten el mismo Layout (sidebar)
- Usan los mismos componentes compartidos (Card, Button, Badge)

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de la exposición, verifica que sepas explicar:

- [ ] ¿Qué hace el Dashboard?
- [ ] ¿Qué configuraciones hay en Accesibilidad?
- [ ] ¿Qué configuraciones hay en Navegación?
- [ ] ¿Qué configuraciones hay en Privacidad?
- [ ] ¿Qué es Feature-Sliced Design?
- [ ] ¿Cuáles son las 3 capas principales? (app, features, shared)
- [ ] ¿Cómo se conecta el frontend con el backend? (services/api.js)
- [ ] ¿Qué endpoints del backend usas?

---

**¡ÉXITO EN LA EXPOSICIÓN! 🎓💪**

**Preparado por:** Claude Code
**Para:** MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
**Fecha:** 2025-12-27
